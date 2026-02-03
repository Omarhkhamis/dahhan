"use client";

export default function WhatsAppFloat({ phone, label }: { phone: string; label: string }) {
  const url = `https://api.whatsapp.com/send?phone=9${phone.replace(/\s+/g, "")}`;
  return (
    <a className="whatsapp-float" href={url} target="_blank" rel="noreferrer">
      <img src="/images/home/whatsapp.png" alt="whatsapp" width="28" height="28" />
      <span>{label}</span>
    </a>
  );
}
