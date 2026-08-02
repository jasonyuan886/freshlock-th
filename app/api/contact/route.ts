import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/smtp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.zoho.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || 'support@freshlocksealer.com';
const SMTP_PASS = process.env.SMTP_PASS;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'support@freshlocksealer.com';
const FROM_EMAIL_NAME = 'FreshLock Support';
const FROM_EMAIL_ADDRESS = SMTP_USER;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    if (!SMTP_PASS) {
      console.error('SMTP_PASS env var not configured');
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const name: string = (body.name || '').toString().trim();
    const email: string = (body.email || '').toString().trim();
    const subject: string = (body.subject || '').toString().trim();
    const message: string = (body.message || '').toString().trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (name.length > 100) {
      return NextResponse.json({ error: 'Name too long' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (subject.length > 200) {
      return NextResponse.json({ error: 'Subject too long' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message too long (max 5000 chars)' }, { status: 400 });
    }

    const fromHeader = `${FROM_EMAIL_NAME} <${FROM_EMAIL_ADDRESS}>`;

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; color: #222;">
        <h2 style="color:#0f4c3a; border-bottom:2px solid #0f4c3a; padding-bottom:8px;">New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <tr><td style="padding:6px 12px 6px 0; font-weight:bold; width:100px; vertical-align:top;">Name:</td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0; font-weight:bold; vertical-align:top;">Email:</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 12px 6px 0; font-weight:bold; vertical-align:top;">Subject:</td><td style="padding:6px 0;">${escapeHtml(subject)}</td></tr>
        </table>
        <div style="background:#f7f7f7; border-left:4px solid #0f4c3a; padding:12px 16px; margin: 16px 0; white-space: pre-wrap;">${escapeHtml(message)}</div>
        <hr style="border:none; border-top:1px solid #eee; margin:24px 0 8px;">
        <p style="color:#888; font-size:12px; margin:0;">This message was sent from the contact form on <strong>www.freshlocksealer.com</strong>. Reply directly to this email to respond to the customer.</p>
      </div>
    `;

    await sendEmail({
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      pass: SMTP_PASS,
      from: fromHeader,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[FreshLock Contact] ${subject} — from ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact API error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}
