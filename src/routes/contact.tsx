import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { interests, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta(
      "Talk to us — Incurable?",
      "Data partnerships, the build, and press. Families looking for treatment will be told we cannot offer one.",
    ),
  component: Contact,
});

type InterestId = (typeof interests)[number]["id"];

function Contact() {
  const [interest, setInterest] = useState<InterestId>("data");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [held, setHeld] = useState<{ name: string; interest: string } | null>(null);
  const selected = interests.find((item) => item.id === interest) ?? interests[0];

  function submit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Name the person.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email will not work.");
      return;
    }
    if (interest !== "family" && message.trim().length < 20) {
      setError("Say what you actually want. A sentence is not enough.");
      return;
    }
    setError("");
    const payload = {
      name: name.trim(),
      org: org.trim(),
      email: email.trim(),
      interest,
      message: message.trim(),
      at: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem("incurables-note", JSON.stringify(payload));
    } catch {
      /* private mode */
    }
    setHeld({ name: payload.name, interest: selected.label });
  }

  return (
    <Shell>
      <PageHero
        kicker="The desk"
        title="Talk to us."
        dek="Data, the build, or press. Write as if a person who has read the site is on the other side — because the point of the site is that we will not inflate the claim."
      />
      <section className="frame section">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="prose">
            <p>
              If you buy for a frontier lab, say which one and what a record must contain before you would
              trust it. If you build factories, say what you have taken dark before. If you write, ask for
              the sentence we would defend.
            </p>
            <p>
              If you are a family looking for a treatment: we cannot offer one, a trial, or a timeline.
              Hall 01 is not online. There is no waiting list to join, and we will not keep your hope on
              file as a lead. The Alzheimer’s page is the long mission, not a treatment and not a promise to
              be first.
            </p>
          </div>
          <div>
            {held ? (
              <div className="border border-hairline p-6 sm:p-8">
                <p className="kicker">Received</p>
                <h2 className="idx mt-4">Held for {held.name}.</h2>
                <p className="mt-4 text-pumice">
                  Marked as {held.interest}. This desk keeps the note in the browser only — it does not
                  send mail from here. A working company would answer from a person, in the register you
                  wrote in.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost mt-6"
                  onClick={() => {
                    setHeld(null);
                    setMessage("");
                  }}
                >
                  Write another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5">
                <fieldset>
                  <legend className="kicker">You are writing as</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {interests.map((item) => (
                      <label
                        key={item.id}
                        className={`block min-h-11 cursor-pointer border px-3 py-3 ${
                          interest === item.id ? "border-ash text-ash" : "border-hairline text-pumice"
                        }`}
                      >
                        <input
                          type="radio"
                          name="interest"
                          value={item.id}
                          checked={interest === item.id}
                          onChange={() => setInterest(item.id)}
                          className="sr-only"
                        />
                        <span className="block text-ash">{item.label}</span>
                        <span className="mt-1 block text-sm">{item.note}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {interest === "family" ? (
                  <p className="border border-hairline px-4 py-4 text-sm text-pumice">
                    You can still leave a note. Please do not include medical details. We cannot act on
                    them, and this page should not be holding them.
                  </p>
                ) : null}
                <label className="grid gap-2">
                  <span className="kicker">Name</span>
                  <input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </label>
                <label className="grid gap-2">
                  <span className="kicker">Organization</span>
                  <input className="field" value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" />
                </label>
                <label className="grid gap-2">
                  <span className="kicker">Email</span>
                  <input
                    className="field"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="kicker">Note</span>
                  <textarea className="field" value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>
                {error ? (
                  <p className="text-sm text-trace" role="alert">
                    {error}
                  </p>
                ) : null}
                <button type="submit" className="btn btn-primary w-full sm:w-auto">
                  {interest === "family" ? "Leave the note" : "Send to the desk"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
