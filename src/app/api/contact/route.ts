import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create reusable transporter using Gmail SMTP + App Password
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    // Required in some environments where the certificate chain isn't fully trusted
    rejectUnauthorized: false,
  },
});

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  subject?: string;
  subSubject?: string;
  message?: string;
  source: 'contact_page' | 'inquiry_modal';
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, phone, company, service, subject, subSubject, message, source } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const recipients = [
      process.env.MAIL_RECIPIENT_1,
      process.env.MAIL_RECIPIENT_2,
    ].filter(Boolean).join(', ');

    // Build a professional HTML email
    const isModal = source === 'inquiry_modal';
    const emailSubject = isModal
      ? `🔔 New Service Inquiry: ${subject || 'General'}`
      : `📩 New Contact Form Submission from ${name}`;

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0057B8, #003399); padding: 28px 32px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">
            ${isModal ? '🔔 Service Inquiry' : '📩 Contact Form Submission'}
          </h1>
          <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 13px;">
            Received from viabtech.co.tz — ${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Dar_es_Salaam' })}
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; width: 130px; vertical-align: top;">Full Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
                <a href="mailto:${email}" style="color: #0057B8; text-decoration: none;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
                <a href="tel:${phone.replace(/\s/g, '')}" style="color: #0057B8; text-decoration: none;">${phone}</a>
              </td>
            </tr>` : ''}
            ${company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Company</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">${company}</td>
            </tr>` : ''}
            ${subject ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Subject</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">${subject}</td>
            </tr>` : ''}
            ${subSubject ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Sub-Subject</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">${subSubject}</td>
            </tr>` : ''}
            ${service ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Inquiry Type</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">${service}</td>
            </tr>` : ''}
          </table>

          ${message ? `
          <div style="margin-top: 20px; padding: 16px; background: #f8fbff; border-radius: 8px; border-left: 4px solid #0057B8;">
            <p style="margin: 0 0 6px; font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
            <p style="margin: 0; font-size: 14px; color: #111827; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>` : ''}
        </div>

        <!-- Footer -->
        <div style="padding: 16px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 11px; color: #9ca3af; text-align: center;">
            This email was sent automatically from the VIAB TECH website contact system.
          </p>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"VIAB TECH Website" <${process.env.MAIL_USER}>`,
      to: recipients,
      replyTo: email,
      subject: emailSubject,
      html: htmlBody,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
