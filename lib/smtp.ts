import net from 'net';
import tls from 'tls';
import { Buffer } from 'buffer';

export type SmtpSendOptions = {
  host: string;
  port?: number;
  user: string;
  pass: string;
  from: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
};

function base64(str: string): string {
  return Buffer.from(str).toString('base64');
}

function smtpSend(socket: net.Socket | tls.TLSSocket, cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let buf = '';
    const onData = (d: Buffer) => {
      buf += d.toString();
      const lines = buf.split('\r\n').filter((l) => l.length > 0);
      const last = lines[lines.length - 1];
      if (last && /^\d{3}\s/.test(last)) {
        socket.removeListener('data', onData);
        if (/^[45]\d{2}\s/.test(last)) {
          reject(new Error(`SMTP error: ${last} | cmd=${cmd}`));
        } else {
          resolve(buf);
        }
      }
    };
    socket.on('data', onData);
    socket.on('error', reject);
    socket.write(cmd + '\r\n');
  });
}

function waitGreeting(socket: net.Socket): Promise<string> {
  return new Promise((resolve, reject) => {
    let buf = '';
    const onData = (d: Buffer) => {
      buf += d.toString();
      const lines = buf.split('\r\n').filter((l) => l.length > 0);
      const last = lines[lines.length - 1];
      if (last && /^\d{3}\s/.test(last)) {
        socket.removeListener('data', onData);
        resolve(buf);
      }
    };
    socket.on('data', onData);
    socket.on('error', reject);
  });
}

function buildMimeId(): string {
  return `<${Date.now()}.${Math.random().toString(36).slice(2)}@freshlocksealer.com>`;
}

function encodeHeader(s: string): string {
  return '=?utf-8?B?' + base64(s) + '?=';
}

export async function sendEmail(opts: SmtpSendOptions): Promise<string> {
  const port = opts.port || 587;
  const recipients = Array.isArray(opts.to) ? opts.to : [opts.to];
  const boundary = '----=_Part_' + Math.random().toString(36).slice(2) + Date.now();

  const socket = net.connect({ host: opts.host, port });
  await new Promise<void>((res, rej) => {
    socket.once('connect', () => res());
    socket.once('error', rej);
  });
  await waitGreeting(socket);
  await smtpSend(socket, `EHLO freshlocksealer.com`);
  await smtpSend(socket, 'STARTTLS');

  const tlsSocket = tls.connect({
    socket: socket as net.Socket,
    servername: opts.host,
    rejectUnauthorized: true,
  });
  await new Promise<void>((res, rej) => {
    tlsSocket.once('secureConnect', () => res());
    tlsSocket.once('error', rej);
  });

  const send = (c: string) => smtpSend(tlsSocket as unknown as net.Socket, c);

  await send(`EHLO freshlocksealer.com`);
  // AUTH PLAIN: \0user\0pass
  const authToken = base64('\0' + opts.user + '\0' + opts.pass);
  await send(`AUTH PLAIN ${authToken}`);
  await send(`MAIL FROM:<${opts.user}>`);
  for (const r of recipients) {
    await send(`RCPT TO:<${r}>`);
  }
  await send(`DATA`);

  const textBody = opts.text || stripHtml(opts.html);
  const mimeId = buildMimeId();
  const msgLines: string[] = [
    `From: ${opts.from}`,
    `To: ${recipients.join(', ')}`,
  ];
  if (opts.replyTo) {
    msgLines.push(`Reply-To: <${opts.replyTo}>`);
  }
  msgLines.push(
    `Subject: ${encodeHeader(opts.subject)}`,
    `MIME-Version: 1.0`,
    `Message-ID: ${mimeId}`,
    `Date: ${new Date().toUTCString()}`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    `Content-Type: text/plain; charset=utf-8`,
    `Content-Transfer-Encoding: base64`,
    '',
    base64(textBody),
    '',
    `--${boundary}`,
    `Content-Type: text/html; charset=utf-8`,
    `Content-Transfer-Encoding: base64`,
    '',
    base64(opts.html),
    '',
    `--${boundary}--`,
    '.',
    ''
  );

  const data = msgLines.join('\r\n');
  await send(data);
  await send('QUIT').catch(() => {});
  tlsSocket.end();
  return mimeId;
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>(\r?\n)?/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_m, d) => String.fromCharCode(Number(d)))
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
