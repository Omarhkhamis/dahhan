"use client";

import { useState } from "react";

export default function ConsultForm({
  buttonLabel,
  placeholderName,
  placeholderEmail,
  placeholderPhone
}: {
  buttonLabel: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderPhone: string;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || "")
    };
    try {
      const res = await fetch("/api/public/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="form-row">
        <input className="input" name="name" required placeholder={placeholderName} />
        <input className="input" name="email" type="email" placeholder={placeholderEmail} />
        <input className="input" name="phone" required placeholder={placeholderPhone} />
        <button className="button" disabled={loading}>
          {loading ? "..." : buttonLabel}
        </button>
      </div>
      {status === "ok" && <p style={{ color: "#0c7f8a", marginTop: 10 }}>تم إرسال طلبك بنجاح.</p>}
      {status === "error" && <p style={{ color: "#b42318", marginTop: 10 }}>حدث خطأ، حاول لاحقًا.</p>}
    </form>
  );
}
