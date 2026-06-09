import { ArrowRight, Database, Github, LayoutDashboard } from "lucide-react";
import { getDirectusItem } from "@/lib/directus";

const fallbackHome = {
  eyebrow: "Reusable website starter",
  title: "Next.js + Directus + PostgreSQL",
  description:
    "Use this template to start local CMS-driven websites quickly, then sync the finished project to GitHub.",
  cta_label: "Start Building",
  cta_href: "#contact",
};

async function getHomeContent() {
  const rows = await getDirectusItem("homepage", "?limit=1");
  return Array.isArray(rows) && rows[0] ? { ...fallbackHome, ...rows[0] } : fallbackHome;
}

export default async function HomePage() {
  const home = await getHomeContent();

  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <a className="brand" href="/">
            Starter Template
          </a>
          <div>
            <a href="#stack">Stack</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-copy">
          <span>{home.eyebrow}</span>
          <h1>{home.title}</h1>
          <p>{home.description}</p>
          <a className="button" href={home.cta_href}>
            {home.cta_label} <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="section" id="stack">
        <div className="section-heading">
          <span>Local stack</span>
          <h2>Everything needed for repeatable website builds.</h2>
        </div>
        <div className="stack-grid">
          <article>
            <LayoutDashboard size={30} aria-hidden="true" />
            <h3>Next.js</h3>
            <p>App Router frontend with server components and simple API routes.</p>
          </article>
          <article>
            <Database size={30} aria-hidden="true" />
            <h3>Directus + PostgreSQL</h3>
            <p>Docker Compose starts the CMS and database with one command.</p>
          </article>
          <article>
            <Github size={30} aria-hidden="true" />
            <h3>GitHub Ready</h3>
            <p>Copy the template, rename the project, then commit and push.</p>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <span>Inquiry example</span>
          <h2>Connect a Directus collection when the project needs forms.</h2>
          <p>
            Create a <code>contact_inquiries</code> collection in Directus, add a
            static token to <code>.env.local</code>, and this form is ready to
            store submissions.
          </p>
        </div>
        <form action="/api/inquiries" method="post">
          <input name="full_name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="company" placeholder="Company" />
          <textarea name="message" placeholder="Message" required />
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}
