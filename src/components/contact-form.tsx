"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

declare global {
  interface Window {
    grecaptcha?: {
      getResponse: () => string;
      reset: () => void;
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
  const [error, setError] = useState("");

  useEffect(() => {
    loadedAt.current = Date.now();
    if (loadedAtInput.current) {
      loadedAtInput.current.value = String(loadedAt.current);
    }
    if (jsCheckInput.current) {
      jsCheckInput.current.value = "yes";
    }
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    setError("");

    const now = Date.now();
    const secondsElapsed = (now - loadedAt.current) / 1000;
    const companyName =
      (form.elements.namedItem("company_name") as HTMLInputElement | null)
        ?.value || "";
    const botVortex =
      (form.elements.namedItem("bot_vortex") as HTMLInputElement | null)
        ?.value || "";

    if (companyName.trim() || botVortex.trim()) {
      event.preventDefault();
      setError("Submission blocked.");
      return;
    }

    if (secondsElapsed < MIN_SECONDS_TO_SUBMIT) {
      event.preventDefault();
      setError("Please take a moment to complete the form before submitting.");
      return;
    }

    const message =
      (form.elements.namedItem("message") as HTMLTextAreaElement | null)
        ?.value || "";
    const trimmed = message.trim();

    if (trimmed.length < 10) {
      event.preventDefault();
      setError("Please include a bit more detail in your message.");
      return;
    }

    const urlCount = (trimmed.match(/https?:\/\//gi) || []).length;
    if (urlCount > 2) {
      event.preventDefault();
      setError("Please remove extra links from your message and try again.");
      return;
    }

    if (/(.)\1{9,}/.test(trimmed)) {
      event.preventDefault();
      setError("Please revise your message and try again.");
      return;
    }

    const recaptchaResponse = window.grecaptcha?.getResponse?.() || "";
    if (!recaptchaResponse.trim()) {
      event.preventDefault();
      setError("Please complete the reCAPTCHA challenge before sending.");
      return;
    }

    try {
      const lastSubmitAt = Number(
        window.localStorage.getItem(LAST_SUBMIT_KEY) || "0"
      );
      if (
        lastSubmitAt &&
        now - lastSubmitAt < MIN_SECONDS_BETWEEN_SUBMITS * 1000
      ) {
        event.preventDefault();
        setError("Please wait a short moment before sending another message.");
        return;
      }
      window.localStorage.setItem(LAST_SUBMIT_KEY, String(now));
    } catch {
      // Continue without client-side cooldown if storage is unavailable.
    }
  }

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="afterInteractive"
      />
      <form
        id="invisible-recaptcha-form"
        acceptCharset="UTF-8"
        action={site.basinEndpoint}
        method="POST"
        onSubmit={onSubmit}
        className="space-y-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              minLength={2}
              maxLength={100}
              required
              className="h-11 bg-navy-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              maxLength={160}
              required
              className="h-11 bg-navy-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            minLength={10}
            maxLength={3000}
            required
            className="min-h-40 bg-navy-2"
          />
        </div>

        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor="company_name">Company</label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
          <label htmlFor="bot_vortex">Leave blank</label>
          <input id="bot_vortex" name="bot_vortex" type="text" tabIndex={-1} />
        </div>

        <input
          ref={loadedAtInput}
          type="hidden"
          name="form_loaded_at"
          defaultValue=""
        />
        <input ref={jsCheckInput} type="hidden" name="js_check" defaultValue="no" />

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <div
          className="g-recaptcha"
          data-sitekey={site.recaptchaSiteKey}
          data-theme="dark"
        />

        <Button type="submit" className="h-11 w-full rounded-full sm:w-auto sm:px-10">
          Send
        </Button>
      </form>
    </>
  );
}
