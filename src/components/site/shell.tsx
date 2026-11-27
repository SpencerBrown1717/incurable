import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { nav } from "@/lib/site";

function isActive(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`);
}

function Wordmark() {
  return (
    <span className="wordmark">
      <span className="wordmark-symbol" aria-hidden="true" />
      <span>
        Incurable<span className="wordmark-accent">?</span>
      </span>
    </span>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-svh bg-obsidian text-ash">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header sticky top-0 z-40 border-b border-hairline bg-obsidian">
        <div className="frame site-nav-frame flex items-center justify-between gap-6">
          <Link to="/" onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>
          <nav
            className="hidden items-center gap-5 xl:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="nav-link"
                data-active={isActive(path, item.href) ? "true" : "false"}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="site-nav-cta btn btn-primary">
              Talk to us
            </Link>
          </nav>
          <button
            type="button"
            className="site-menu-toggle btn btn-ghost xl:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      {open ? (
        <div
          id="site-menu"
          className="fixed inset-x-0 bottom-0 top-[var(--spacing-nav)] z-30 overflow-y-auto bg-obsidian xl:hidden"
        >
          <nav className="frame flex flex-col py-6" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="border-t border-hairline py-5"
              >
                <span className="idx block">{item.label}</span>
                <span className="mt-1 block text-sm text-pumice">
                  {item.note}
                </span>
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary mt-6 w-full">
              Talk to us
            </Link>
          </nav>
        </div>
      ) : null}
      <main id="main">{children}</main>
      <footer className="rule">
        <div className="frame section grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p>
              <Wordmark />
            </p>
            <p className="mt-4 max-w-sm text-pumice">
              CRISPR and mRNA, fully automated, at the scale of Meta’s largest
              campus — 173.6 halls. The long mission is the incurable list.
              Alzheimer’s is on it. It is not a promise to be first.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="kicker">Pages</p>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className="nav-link">
                  Talk to us
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="kicker">The hall</p>
            <dl className="mt-4 space-y-3">
              <div className="flex justify-between gap-4 border-t border-hairline pt-3">
                <dt className="kicker">Scale</dt>
                <dd className="kicker text-ash">173.6 halls</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-hairline pt-3">
                <dt className="kicker">Duty</dt>
                <dd className="kicker text-ash">24/7/365</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-hairline pt-3">
                <dt className="kicker">Loop</dt>
                <dd className="kicker text-ash">CRISPR · mRNA</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="frame flex flex-col gap-2 border-t border-hairline py-6 text-sm text-pumice sm:flex-row sm:justify-between">
          <p>© 2026 Incurable? · incurable.ai</p>
          <p>Not a clinic. Not an offer of treatment.</p>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  dek,
  italic,
}: {
  kicker: string;
  title: string;
  dek: string;
  italic?: string;
}) {
  return (
    <header className="frame section pb-0">
      <p className="kicker">{kicker}</p>
      <h1 className="title mt-5">
        {title}
        {italic ? <span className="italic"> {italic}</span> : null}
      </h1>
      <p className="dek mt-6">{dek}</p>
    </header>
  );
}

export function IndexList({
  items,
}: {
  items: readonly { n: string; title: string; body: string }[];
}) {
  return (
    <ol>
      {items.map((item) => (
        <li
          key={item.n}
          className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-hairline py-6"
        >
          <span className="font-mono text-xs text-pumice">{item.n}</span>
          <div>
            <h3 className="idx">{item.title}</h3>
            <p className="mt-2 text-pumice">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
