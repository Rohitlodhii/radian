"use client";

import { FormEvent, useState } from "react";

type Status = {
  type: "idle" | "submitting" | "success" | "error";
  message?: string;
};

export default function QwertyAdminPage() {
  const [version, setVersion] = useState("");
  const [note, setNote] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setStatus({ type: "submitting" });

    try {
      const res = await fetch("/api/admin-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version,
          note,
          link,
          title,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to save data");
      }

      setStatus({ type: "success", message: "Saved successfully." });
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error?.message ?? "Something went wrong.",
      });
    }
  }

  const isSubmitting = status.type === "submitting";

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4 py-10">
      <div className="w-full max-w-xl border border-zinc-800 rounded-2xl bg-zinc-950/70 p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-6">
          Qwerty Admin – Update Info
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="version">
              Version
            </label>
            <input
              id="version"
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="e.g. 1.0.3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Short title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="link">
              Link
            </label>
            <input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="https://example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="note">
              Note
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
              rows={4}
              placeholder="Release notes or any extra information..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-zinc-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>

        {status.type === "success" && (
          <p className="mt-4 text-sm text-emerald-400">{status.message}</p>
        )}
        {status.type === "error" && (
          <p className="mt-4 text-sm text-red-400">{status.message}</p>
        )}
      </div>
    </main>
  );
}

