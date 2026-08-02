import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/smtp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.zoho.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || 'support@freshlocksealer.com';
const SMTP_PASS = process.env.SMTP_PASS;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'support@freshlocksealer.com';
const FROM_EMAIL_NAME = 'FreshLock Newsletter';
const FROM_EMAIL_ADDRESS = SMTP_USER;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const email: string = (body.email || '').toString().trim();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const fromHeader = `${FROM_EMAIL_NAME} <${FROM_EMAIL_ADDRESS}>`;

    // Notify support team
    const notifyHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; color: #222;">
        <h2 style="color:#0f4c3a; border-bottom:2px solid #0f4c3a; padding-bottom:8px;">New Newsletter Subscription</h2>
        <p>A new visitor has subscribed to the FreshLock newsletter:</p>
        <p style="font-size:18px; font-weight:bold;"><a href="mailto:${email}">${email}</a></p>
        <p style="color:#888; font-size:12px;">Source: Footer signup form on www.freshlocksealer.com</p>
      </div>
    `;

    await sendEmail({
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      pass: SMTP_PASS,
      from: fromHeader,
      to: [TO_EMAIL],
      subject: `[FreshLock] New Newsletter Subscriber: ${email}`,
      html: notifyHtml,
    });

    // Send welcome email to subscriber
    const welcomeHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #222;">
        <div style="background:#0f4c3a; padding:24px; text-align:center;">
          <h1 style="color:#fff; margin:0; font-size:28px;">Welcome to FreshLock! 🎉</h1>
        </div>
        <div style="padding:24px;">
          <p style="font-size:16px;">Thanks for subscribing!</p>
          <p>You're now on the list for exclusive tips on food preservation, vacuum sealing hacks, special offers, and new product updates.</p>
          <p>Here's a quick tip to get you started: <strong>Vacuum sealing can extend food freshness up to 5× longer</strong> compared to regular storage methods.</p>
          
          <div style="background:#f0f7f4; border:1px solid #0f4c3a; border-radius:8px; padding:16px; margin:16px 0;">
            <p style="margin:0 0 8px; font-size:14px; font-weight:bold; color:#0f4c3a;">Why FreshLock owners say it's worth way more than they paid:</p>
            <ul style="margin:0; padding-left:18px; font-size:13px; color:#333;">
              <li style="margin-bottom:4px;">💰 The average US household wastes <strong>$1,866/year</strong> in spoiled food — FreshLock pays for itself in weeks</li>
              <li style="margin-bottom:4px;">📉 Traditional countertop vacuum sealers cost <strong>$200–$400</strong> — FreshLock does the same job for a fraction</li>
              <li style="margin-bottom:4px;">🔋 No batteries, no power cord — USB-C rechargeable, 80–100 seals per charge</li>
              <li style="margin-bottom:4px;">📦 Works with <strong>any embossed valve bags</strong> — never locked into overpriced refills</li>
              <li>🛡️ <strong>2-year warranty</strong> + 60-day returns = zero risk to try</li>
            </ul>
          </div>
          <div style="background:#f0f7f4; border-left:4px solid #0f4c3a; padding:16px; margin:20px 0;">
            <p style="margin:0; font-size:14px;">Ready to stop freezer burn and reduce food waste?</p>
            <p style="margin:8px 0 0;"><a href="https://www.freshlocksealer.com/products" style="color:#0f4c3a; font-weight:bold;">Shop FreshLock →</a></p>
          </div>
          <p style="color:#888; font-size:12px; margin-top:32px;">FreshLock · Shenzhen, China<br>support@freshlocksealer.com<br>You received this email because you subscribed at freshlocksealer.com</p>
        </div>
      </div>
    `;

    await sendEmail({
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
      pass: SMTP_PASS,
      from: fromHeader,
      to: [email],
      subject: 'Welcome to FreshLock! 🎉',
      html: welcomeHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Newsletter API error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again later.' }, { status: 500 });
  }
}
