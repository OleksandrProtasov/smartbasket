"use client";

import { useState } from "react";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await loginUser({ email, password });
      localStorage.setItem("smartbasket-token", result.token);
      setMessage("Login successful");
    } catch {
      setMessage("Login failed");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-3 rounded-2xl border border-neutral-200 bg-surface p-6 text-foreground dark:border-neutral-800">
      <h1 className="text-2xl font-bold text-foreground">Sign in</h1>
      <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-400" />
      <button className="rounded-xl bg-[#ff6a00] px-4 py-2 text-white transition hover:bg-[#e95f00]">Sign in</button>
      {message && <p className="text-sm text-neutral-500 dark:text-neutral-400">{message}</p>}
    </form>
  );
}
