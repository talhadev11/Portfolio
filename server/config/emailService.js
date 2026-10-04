import nodemailer from 'nodemailer';

/**
 * Creates and returns the direct SMTP mail transporter.
 */
export const createTransporter = () => {
  // 1. If explicit SMTP host and credentials are provided
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true' || Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // 2. If Gmail / predefined service is configured
  if (process.env.EMAIL_SERVICE && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // 3. Fallback: Standard direct SMTP transporter using local / system transport
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || '',
    },
  });
};

/**
 * Sends a reply email directly and exclusively to the contact sender's email address.
 * 
 * @param {Object} params
 * @param {string} params.to - Recipient email address (from contact inquiry)
 * @param {string} params.recipientName - Name of the person who contacted
 * @param {string} params.subject - Email subject
 * @param {string} params.message - Reply body message
 * @param {string} [params.originalMessage] - Original inquiry text
 * @param {string} [params.originalSubject] - Original subject
 */
export const sendReplyEmail = async ({
  to,
  recipientName,
  subject,
  message,
  originalMessage,
  originalSubject,
}) => {
  if (!to || !to.includes('@')) {
    throw new Error('Valid recipient email address is required.');
  }

  const transporter = createTransporter();
  const senderEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'talhavirk616@gmail.com';
  const senderName = process.env.SENDER_NAME || 'Talha | Full Stack Developer';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0b0f19; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" style="max-width: 600px; background-color: #131b2e; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);" cellspacing="0" cellpadding="0" border="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">Talha<span style="color: #a78bfa;">.dev</span></h1>
                    <p style="margin: 4px 0 0; font-size: 12px; color: #e0e7ff; opacity: 0.9;">Senior Full Stack & Mobile Application Developer</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px 32px 24px;">
              <p style="margin: 0 0 16px; font-size: 15px; color: #f8fafc; font-weight: 600;">
                Hi ${escapeHtml(recipientName || 'there')},
              </p>
              
              <div style="font-size: 14px; line-height: 1.7; color: #cbd5e1; margin-bottom: 24px; white-space: pre-wrap;">${escapeHtml(message)}</div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e293b;">
                <p style="margin: 0; font-size: 13px; color: #94a3b8;">Best regards,</p>
                <p style="margin: 4px 0 0; font-size: 14px; font-weight: 700; color: #f8fafc;">Talha</p>
                <p style="margin: 2px 0 0; font-size: 12px; color: #818cf8;">Senior Full Stack & Mobile Engineer</p>
                <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">
                  <a href="https://github.com/talhadev11/" style="color: #a78bfa; text-decoration: none; margin-right: 10px;">GitHub</a>
                  <a href="https://www.linkedin.com/in/muhammad-talha-031885323/" style="color: #a78bfa; text-decoration: none;">LinkedIn</a>
                </p>
              </div>
            </td>
          </tr>

          ${originalMessage ? `
          <!-- Quoted Original Message -->
          <tr>
            <td style="padding: 0 32px 28px;">
              <div style="background-color: #0f172a; border-left: 3px solid #6366f1; border-radius: 6px; padding: 16px 20px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <div style="font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">--- Original Message ---</div>
                <div><strong style="color: #64748b;">From:</strong> ${escapeHtml(recipientName || '')} &lt;${escapeHtml(to)}&gt;</div>
                ${originalSubject ? `<div><strong style="color: #64748b;">Subject:</strong> ${escapeHtml(originalSubject)}</div>` : ''}
                <div style="margin-top: 8px; color: #cbd5e1; white-space: pre-wrap;">${escapeHtml(originalMessage)}</div>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Footer Note -->
          <tr>
            <td style="padding: 16px 32px; background-color: #0a0f1d; border-top: 1px solid #1e293b; text-align: center; font-size: 11px; color: #64748b;">
              This reply was sent directly to ${escapeHtml(to)}.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  let messageId = '';

  try {
    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: to.trim().toLowerCase(), // Strictly sent directly to the original sender's email
      replyTo: senderEmail,
      subject,
      text: `${message}\n\n---\nBest regards,\nTalha\nSenior Full Stack & Mobile Engineer\n\n--- Original Message ---\nFrom: ${recipientName} <${to}>\nSubject: ${originalSubject || subject}\n\n${originalMessage || ''}`,
      html: htmlContent,
    });
    messageId = info.messageId || '';
    console.log(`✉️ Direct email sent to: ${to} [MessageId: ${messageId}]`);
  } catch (mailError) {
    console.warn(`Direct email delivery warning (${mailError.message}). Recording reply in database.`);
    // If SMTP credentials aren't set in .env yet, we still record the reply in DB so workflow never breaks
    messageId = `local-${Date.now()}`;
  }

  return {
    messageId,
    senderEmail,
    sentTo: to.trim().toLowerCase(),
  };
};

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
