"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        container: HTMLElement,
        parameters: { sitekey: string; theme: "dark"; size?: "compact" }
      ) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
  }
}

const MIN_SECONDS_TO_SUBMIT = 4;
const MIN_SECONDS_BETWEEN_SUBMITS = 45;
const LAST_SUBMIT_KEY = "contact_form_last_submit_at";

export function ContactForm() {
  const loadedAt = useRef(0);
  const loadedAtInput = useRef<HTMLInputElement>(null);
  const jsCheckInput = useRef<HTMLInputElement>(null);
  const recaptchaContainer = useRef<HTMLDivElement>(null);
  const recaptchaWidget = useRef<number | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [pending, setPending] = useState(false);

  const initializeRecaptcha = useCallback(() => {
    const grecaptcha = window.grecaptcha;
    const container = recaptchaContainer.current;
    if (!grecaptcha || !container || recaptchaWidget.current !== null) return;

    grecaptcha.ready(() => {
      if (!recaptchaContainer.current || recaptchaWidget.current !== null) return;
      try {
        recaptchaWidget.current = grecaptcha.render(
          recaptchaContainer.current,
          {
            sitekey: site.recaptchaSiteKey,
            theme: "dark",
            ...(window.matchMedia("(max-width: 360px)").matches
              ? { size: "compact" as const }
              : {}),
          }
        );
        setRecaptchaReady(true);
      } catch {
        setError("reCAPTCHA could not load. Please refresh and try again.");
      }
    });
  }, []);

  useEffect(() => {
    loadedAt.current = Date.now();
    if (loadedAtInput.current) loadedAtInput.current.value = String(loadedAt.current);
    if (jsCheckInput.current) jsCheckInput.current.value = "yes";
    // The API may have loaded on an earlier route before this form mounted.
    initializeRecaptcha();
  }, [initializeRecaptcha]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setError("");
    setStatus("");

    const now = Date.now();
    const secondsElapsed = (now - loadedAt.current) / 1000;
    const companyName = (form.elements.namedItem("company_name") as HTMLInputElement | null)?.value || "";
    const botVortex = (form.elements.namedItem("bot_vortex") as HTMLInputElement | null)?.value || "";

    if (companyName.trim() || botVortex.trim()) {
      setError("Submission blocked.");
      return;
    }

    if (secondsElapsed < MIN_SECONDS_TO_SUBMIT) {
      setError("Please take a moment to complete the form before submitting.");
      return;
    }

    const message = (form.elements.namedItem("message") as HTMLTextAreaElement | null)?.value || "";
    const trimmed = message.trim();
    if (trimmed.length < 10) {
      setError("Please include a bit more detail in your message.");
      return;
    }

    if ((trimmed.match(/https?:\/\//gi) || []).length > 2) {
      setError("Please remove extra links from your message and try again.");
      return;
    }

    if (/(.)\1{9,}/.test(trimmed)) {
      setError("Please revise your message and try again.");
      return;
    }

    const recaptchaResponse = window.grecaptcha?.getResponse(recaptchaWidget.current ?? undefined) || "";
    if (!recaptchaResponse.trim()) {
      setError(recaptchaReady
        ? "Please complete the reCAPTCHA challenge before sending."
        : "reCAPTCHA is still loading. Please wait a moment and try again.");
      return;
    }

    try {
      const lastSubmitAt = Number(window.localStorage.getItem(LAST_SUBMIT_KEY) || "0");
      if (lastSubmitAt && now - lastSubmitAt < MIN_SECONDS_BETWEEN_SUBMITS * 1000) {
        setError("Please wait a short moment before sending another message.");
        return;
      }
    } catch {
      // Continue without a client-side cooldown when storage is unavailable.
    }

    setPending(true);
    try {
      const response = await fetch(site.basinEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(30_000),
      });

      // Basin documents HTTP success/failure for custom JavaScript requests but
      // does not publish a JSON response schema for form-data submissions.
      if (!response.ok) throw new Error("Basin submission failed");

      try {
        window.localStorage.setItem(LAST_SUBMIT_KEY, String(now));
      } catch {
        // Submission succeeded; storage is only an additional client-side safeguard.
      }
      form.reset();
      loadedAt.current = Date.now();
      if (loadedAtInput.current) loadedAtInput.current.value = String(loadedAt.current);
      if (jsCheckInput.current) jsCheckInput.current.value = "yes";
      window.grecaptcha?.reset(recaptchaWidget.current ?? undefined);
      setStatus("Thanks for your message. I’ll be in touch soon.");
    } catch {
      setError("We couldn’t confirm your message was sent. Please try again or email me directly.");
      window.grecaptcha?.reset(recaptchaWidget.current ?? undefined);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={initializeRecaptcha}
        onError={() => setError("reCAPTCHA could not load. Please refresh and try again.")}
      />
      <form
        id="invisible-recaptcha-form"
        acceptCharset="UTF-8"
        action={site.basinEndpoint}
        method="POST"
        onSubmit={onSubmit}
        className="contact-form"
        aria-busy={pending}
      >
        <p id="contact-required-hint" className="form-hint">
          All fields are required. Messages can be up to 3,000 characters.
        </p>
        <div className="contact-fields">
          <div className="contact-field">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" minLength={2} maxLength={100} autoComplete="name" aria-describedby="contact-required-hint" disabled={pending} required />
          </div>
          <div className="contact-field">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" maxLength={160} autoComplete="email" aria-describedby="contact-required-hint" disabled={pending} required />
          </div>
        </div>

        <div className="contact-field">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" rows={6} minLength={10} maxLength={3000} aria-describedby="contact-required-hint contact-message-hint" disabled={pending} required />
          <p id="contact-message-hint" className="form-hint">Please include at least 10 characters.</p>
        </div>

        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor="company_name">Company</label>
          <input id="company_name" name="company_name" type="text" tabIndex={-1} autoComplete="off" />
          <label htmlFor="bot_vortex">Leave blank</label>
          <input id="bot_vortex" name="bot_vortex" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <input ref={loadedAtInput} type="hidden" name="form_loaded_at" defaultValue="" />
        <input ref={jsCheckInput} type="hidden" name="js_check" defaultValue="no" />

        <div ref={recaptchaContainer} className="recaptcha-container" role="group" aria-label="reCAPTCHA verification" />

        {error ? <p className="form-message form-error" role="alert">{error}</p> : null}
        {status ? <p className="form-message form-success" role="status">{status}</p> : null}

        <Button type="submit" disabled={pending || !recaptchaReady} className="contact-submit">
          {pending ? "Sending…" : "Send message"}
        </Button>
        {!recaptchaReady && !error ? <p className="form-hint" role="status">Loading spam protection…</p> : null}
        <noscript>
          <p className="form-hint">
            JavaScript is needed for spam protection. You can contact me at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </noscript>
      </form>
    </>
  );
}
