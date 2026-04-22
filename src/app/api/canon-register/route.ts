import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

interface CanonRegistrationPayload {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  modelNumber: string;
  serialNumber: string;
  purchaseDate: string;
  machineStatus: 'working' | 'not_working';
}

export async function POST(request: NextRequest) {
  try {
    const body: CanonRegistrationPayload = await request.json();
    const {
      fullName,
      phone,
      email,
      location,
      modelNumber,
      serialNumber,
      purchaseDate,
      machineStatus,
    } = body;

    // Basic validation
    if (!fullName || !phone || !email || !modelNumber || !serialNumber) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const recipients = [
      process.env.MAIL_RECIPIENT_1,
      process.env.MAIL_RECIPIENT_2,
    ]
      .filter(Boolean)
      .join(', ');

    const statusLabel = machineStatus === 'working' ? '✅ Working' : '❌ Not Working';

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #CC0000, #8B0000); padding: 28px 32px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">
            🖨️ New Canon Product Registration
          </h1>
          <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 13px;">
            Received from viabtech.co.tz/canon-register — ${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Dar_es_Salaam' })}
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; width: 140px; vertical-align: top;">Full Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Mobile Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
                <a href="tel:${phone.replace(/\s/g, '')}" style="color: #CC0000; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Email Address</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">
                <a href="mailto:${email}" style="color: #CC0000; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Location</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">${location || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Model Number</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">${modelNumber}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Serial Number</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827; font-weight: 600;">${serialNumber}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #6b7280; vertical-align: top;">Date of Purchase</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #111827;">${purchaseDate || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Machine Status</td>
              <td style="padding: 12px 0; font-size: 14px; color: #111827; font-weight: 600;">${statusLabel}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="padding: 16px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 11px; color: #9ca3af; text-align: center;">
            This email was sent automatically from the Canon Product Registration page on viabtech.co.tz
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Canon Registration – VIAB TECH" <${process.env.MAIL_USER}>`,
      to: recipients,
      replyTo: email,
      subject: `🖨️ Canon Registration: ${modelNumber} — ${fullName}`,
      html: htmlBody,
    });

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully.',
    });
  } catch (error) {
    console.error('Canon registration email error:', error);
    return NextResponse.json(
      { error: 'Failed to submit registration. Please try again later.' },
      { status: 500 }
    );
  }
}
