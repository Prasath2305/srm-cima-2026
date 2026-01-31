import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PIN,
  },
});

export async function sendPasswordResetEmail(email: string, token: string, host: string) {
  const resetUrl = `https://${host}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: `"CIMA'26 Conference" <${process.env.EMAIL_ID}>`,
    to: email,
    subject: 'Password Reset Request - CIMA\'26',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAFAF8;">
        <div style="background-color: #1E2A2A; color: #FAFAF8; padding: 30px; text-align: center; border-radius: 16px 16px 0 0;">
          <h1 style="margin: 0; font-weight: 300; font-size: 24px;">Password Reset</h1>
        </div>
        <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 16px 16px; border: 1px solid #E5E7EB; border-top: none;">
          <p style="color: #1E2A2A; font-size: 16px; line-height: 1.5;">
            You requested a password reset for your CIMA'26 account. Click the button below to reset your password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #1E2A2A; color: #FAFAF8; padding: 14px 32px; text-decoration: none; border-radius: 9999px; display: inline-block; font-weight: 500;">
              Reset Password
            </a>
          </div>
          <p style="color: #607274; font-size: 14px; line-height: 1.5;">
            Or copy and paste this link into your browser:<br>
            <span style="color: #1E2A2A; word-break: break-all;">${resetUrl}</span>
          </p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          <p style="color: #9CA3AF; font-size: 12px; text-align: center;">
            This link expires in 1 hour. If you didn't request this, please ignore this email.
          </p>
        </div>
      </div>
    `,
  };
  
  await transporter.sendMail(mailOptions);
}