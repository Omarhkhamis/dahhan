import nodemailer from "nodemailer";

export async function sendConsultationEmail({
  to,
  name,
  email,
  phone
}: {
  to: string;
  name: string;
  email: string;
  phone: string;
}) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return;

  const transporter = nodemailer.createTransport({
    host,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: false,
    auth: { user, pass }
  });

  const from = process.env.SMTP_FROM || user;

  await transporter.sendMail({
    from,
    to,
    subject: `طلب استشارة من: ${name}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <p><strong>الاسم:</strong> ${name}</p>
        <p><strong>البريد الإلكتروني:</strong> ${email || "-"}</p>
        <p><strong>رقم الهاتف:</strong> ${phone}</p>
      </div>
    `
  });
}
