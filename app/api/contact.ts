import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL;
const contactFromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || '[Portfolio]';

const resend = resendApiKey ? new Resend(resendApiKey) : null;

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function getClientIp(req: any): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }

  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return false;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!resend || !contactToEmail) {
    return res.status(500).json({ message: 'Email service is not configured on the server' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  const { name, email, message, company }: ContactPayload = req.body || {};

  // Honeypot field. Real users never fill this.
  if (company && company.trim().length > 0) {
    return res.status(200).json({ message: 'Message queued' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length < 2 || trimmedName.length > 120) {
    return res.status(400).json({ message: 'Name must be between 2 and 120 characters' });
  }

  if (!isValidEmail(trimmedEmail) || trimmedEmail.length > 200) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }

  if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
    return res.status(400).json({ message: 'Message must be between 10 and 5000 characters' });
  }

  try {
    await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: trimmedEmail,
      subject: `${subjectPrefix} New message from ${trimmedName}`,
      text: [
        'New portfolio contact form submission',
        '',
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        '',
        'Message:',
        trimmedMessage,
      ].join('\n'),
    });

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form send failed:', error);
    return res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
}