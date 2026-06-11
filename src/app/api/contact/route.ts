import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

// Nodemailer uses Node's net/tls — force the Node.js runtime (the default,
// set explicitly so it never gets bundled for the edge runtime).
export const runtime = "nodejs";

// POST route handlers are not cached in Next.js 16.

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  inquiryType?: string;
  subject?: string;
  message?: string;
  // Careers form
  position?: string;
  experience?: string;
  // Honeypot — bots fill this; humans never see it.
  website?: string;
  // Where the submission came from, set by the client.
  source?: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Reuse one transporter across invocations (module scope survives warm starts).
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  transporter = nodemailer.createTransport({
    host,
    port,
    // Port 465 = implicit TLS; 587 = STARTTLS.
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: silently accept (so bots don't retry) but don't send.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  // Minimal validation — name and email are required across all forms.
  // Message is optional (e.g. the careers application blurb).
  if (!data.name?.trim() || !data.email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  const tx = getTransporter();
  const from = process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email.general;

  if (!tx || !from) {
    // Misconfigured server — log for the operator, generic message to the user.
    console.error(
      "Contact form not configured: set SMTP_HOST, SMTP_USER, SMTP_PASS, and CONTACT_FROM_EMAIL.",
    );
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 503 },
    );
  }

  const rows = (
    [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Company", data.company],
      ["Position", data.position],
      ["Experience", data.experience],
      ["Inquiry Type", data.inquiryType],
      ["Subject", data.subject],
      ["Source", data.source],
    ] as const
  )
    .filter(([, value]) => value && String(value).trim())
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600">${label}</td><td style="padding:4px 0">${escapeHtml(String(value))}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#1a1a1a">
      <h2 style="margin:0 0 12px">New enquiry from ${escapeHtml(site.name)} website</h2>
      <table style="border-collapse:collapse;font-size:14px">${rows}</table>
      <h3 style="margin:20px 0 6px">Message</h3>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6">${data.message?.trim() ? escapeHtml(data.message) : "<em>(no message provided)</em>"}</p>
    </div>
  `;

  try {
    await tx.sendMail({
      from,
      to,
      replyTo: data.email,
      subject: data.subject?.trim()
        ? `[Website] ${data.subject.trim()}`
        : `[Website] New enquiry from ${data.name}`,
      html,
    });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
