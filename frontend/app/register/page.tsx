"use client";

import { useState } from "react";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await registerUser(form);
      setMessage("Registration successful");
    } catch {
      setMessage("Registration failed");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-3 rounded-2xl border border-neutral-200 bg-surface p-6 text-foreground dark:border-neutral-800">
      <h1 className="text-2xl font-bold text-foreground">Create account</h1>
      <input value={form.name} onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))} placeholder="Full name" className="w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
      <input value={form.email} onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))} placeholder="Email" className="w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
      <input type="password" value={form.password} onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))} placeholder="Password" className="w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
      <button className="rounded-xl bg-[#ff6a00] px-4 py-2 text-white transition hover:bg-[#e95f00]">Create account</button>
      {message && <p className="text-sm text-neutral-500 dark:text-neutral-400">{message}</p>}
    </form>
  );
}
