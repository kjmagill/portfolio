import { Container } from "@/components/container";
const capabilities = [
  { number: "01", title: "Interfaces that feel right.", text: "Responsive websites and mobile experiences with a focus on clarity, performance, and the people using them.", stack: ["React", "Next.js", "React Native", "TypeScript"] },
  { number: "02", title: "Solid beneath the surface.", text: "APIs, databases, and smart contracts that turn a polished interface into a useful, working product.", stack: ["Node.js", "Python", "SQL", "Solidity", "Rust"] },
  { number: "03", title: "Ownership from day one.", text: "A hands-on partner from idea to launch, aligning technical decisions with the goals of your business.", stack: ["Product thinking", "Technical leadership", "Collaboration"] },
];
export function Practice() { return <section id="expertise" className="section expertise-section"><Container><div className="section-heading"><div><p className="section-label">03 / What I bring</p><h2>Built with the whole picture in mind.</h2></div></div><div className="capabilities">{capabilities.map(item => <article key={item.number}><span className="capability-number">/{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><ul>{item.stack.map(tech => <li key={tech}>{tech}</li>)}</ul></article>)}</div></Container></section>; }
