"use client";

import { useState } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!res.ok) {
        setError("كلمة المرور غير صحيحة");
      } else {
        window.location.href = "/admin";
      }
    } catch {
      setError("حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page" style={{ justifyContent: "center", alignItems: "center" }}>
      <div className="card" style={{ maxWidth: 420, width: "90%" }}>
        <h2 style={{ marginTop: 0 }}>تسجيل الدخول</h2>
        <form onSubmit={onSubmit}>
          <input
            className="input"
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 12 }}
          />
          <button className="button" style={{ width: "100%" }} disabled={loading}>
            {loading ? "..." : "دخول"}
          </button>
          {error && <p style={{ color: "#b42318", marginTop: 10 }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
