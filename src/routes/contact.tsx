import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Shell } from "@/components/site/shell";
import { interests, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta(
      "Prepare an inquiry — Incurable?",
      "Draft a note about assay data, lab construction, or press. Drafts stay in the current browser tab.",
    ),
  component: Contact,
});

type InterestId = (typeof interests)[number]["id"];

const topicLabels: Record<InterestId, string> = {
  data: "Assay data",
  build: "Lab construction",
  press: "Press",
  family: "Families",
};

function focusHeading(heading: HTMLHeadingElement | null) {
  heading?.focus();
}

function Contact() {
  const [interest, setInterest] = useState<InterestId>("data");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Enter a name with at least two characters.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (interest !== "family" && message.trim().length < 20) {
      setError("Write a note of at least 20 characters.");
      return;
    }

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
      setError("This browser tab couldn’t save the draft.");
      return;
    }
    setError("");
    setSaved(true);
  }

  return (
    <Shell>
      <PageHero
        kicker="Contact"
        title="Prepare an inquiry."
        dek="Draft a note about assay data, lab construction, or press. Drafts stay in this browser tab."
      />
      <section className="frame section pt-10 sm:pt-14">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:gap-14">
          <aside
            className="max-w-md border-t border-hairline pt-5"
            aria-labelledby="families-heading"
          >
            <h2 id="families-heading" className="idx">
              For families
            </h2>
            <p className="mt-3 text-pumice">
              Hall 01 is a research concept. Incurable currently offers no
              treatment, clinical trials, or waiting list.
            </p>
          </aside>
          <div className="rounded-xl border border-hairline bg-graphite/50 p-5 sm:p-8">
            {saved ? (
              <>
                <h2 className="idx" tabIndex={-1} ref={focusHeading}>
                  Draft saved.
                </h2>
                <p className="mt-3 text-pumice">
                  Saved for this browser session.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost mt-6"
                  onClick={() => {
                    setSaved(false);
                    setMessage("");
                  }}
                >
                  Write another
                </button>
              </>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5">
                <fieldset>
                  <legend className="text-base font-medium">Topic</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {interests.map(({ id }) => (
                      <label
                        key={id}
                        className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-hairline px-3 py-2 text-sm has-checked:border-iris-violet has-checked:bg-iris-violet/10"
                      >
                        <input
                          type="radio"
                          name="interest"
                          value={id}
                          checked={interest === id}
                          onChange={() => setInterest(id)}
                          className="shrink-0 accent-iris-violet"
                        />
                        {topicLabels[id]}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {interest === "family" ? (
                  <p id="family-note" className="text-pumice">
                    Please leave medical details out of your draft.
                  </p>
                ) : null}
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Name</span>
                    <input
                      className="field"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">
                      Organization{" "}
                      <span className="text-pumice">(optional)</span>
                    </span>
                    <input
                      className="field"
                      value={org}
                      onChange={(event) => setOrg(event.target.value)}
                      autoComplete="organization"
                    />
                  </label>
                </div>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    className="field"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">
                    Note{" "}
                    {interest === "family" ? (
                      <span className="text-pumice">(optional)</span>
                    ) : null}
                  </span>
                  <textarea
                    className="field resize-y"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    aria-describedby={
                      interest === "family" ? "family-note" : undefined
                    }
                    required={interest !== "family"}
                  />
                </label>
                {error ? (
                  <p className="text-sm text-trace" role="alert">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto sm:justify-self-start"
                >
                  Save draft
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
