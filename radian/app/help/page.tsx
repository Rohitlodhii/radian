"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/core/Navbar";
import FooterTwo from "@/components/core/newfooter";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function HelpPage() {
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage("");

    if (!email.trim() || !issue.trim()) {
      setErrorMessage("Email and issue details are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "supportRequests"), {
        email: email.trim(),
        issue: issue.trim(),
        createdAt: serverTimestamp(),
        source: "help-page",
      });

      setSubmitted(true);
      setEmail("");
      setIssue("");
    } catch (error) {
      console.error("Error saving support request:", error);
      setErrorMessage("Unable to submit your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-350 mx-auto min-h-screen w-full overflow-hidden border-r border-l border-primary/40">
      <Navbar />

      <main className="relative px-4 py-12 sm:px-6 lg:px-10">
        <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-primary/8 via-primary/4 to-transparent" />

        <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Help and Support
            </span>

            <div className="space-y-4">
              <h1 className="font-cal text-5xl leading-none sm:text-6xl">Need help with Radian?</h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Radian is a local text-to-speech converter powered by the Kokoro TTS model. If audio generation is failing,
                voices are missing, or setup is unclear, send the issue here and describe what happened.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur">
                <p className="text-sm font-medium text-foreground">What to include</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Mention the voice, text length, platform, and the exact error if one appeared.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur">
                <p className="text-sm font-medium text-foreground">Best for support</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Use the email you actively check so follow-up questions about your TTS setup can reach you.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="mb-6 space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Contact support</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                Share your email and describe the problem. This basic form is ready for backend wiring later.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="issue" className="text-sm font-medium">
                  Issue
                </label>
                <textarea
                  id="issue"
                  required
                  rows={6}
                  value={issue}
                  onChange={(event) => setIssue(event.target.value)}
                  placeholder="Describe the issue you are facing with Radian."
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>

            {errorMessage && (
              <p className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-foreground">
                {errorMessage}
              </p>
            )}

            {submitted && (
              <p className="mt-4 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                Support request submitted successfully. Our Team will connect you as soon as possible
              </p>
            )}
          </div>
        </section>
      </main>

      <FooterTwo />
    </div>
  );
}
