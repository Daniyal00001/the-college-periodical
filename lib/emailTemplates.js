export function getSubmissionConfirmationEmail(name, title, trackingNumber) {
  return {
    subject: "Article Submission Confirmed - The College Periodical",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .tracking-box { background: white; border: 2px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
          .tracking-number { font-size: 24px; font-weight: bold; color: #2563eb; letter-spacing: 2px; }
          .button { display: inline-block; background: #dbdfe9ff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Article Submission Confirmed!</h1>
          </div>
          <div class="content">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for submitting your article "<strong>${title}</strong>" to The College Periodical.</p>
            
            <div class="tracking-box">
              <p style="margin: 0 0 10px 0;">Your Tracking Number:</p>
              <div class="tracking-number">${trackingNumber}</div>
            </div>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our editorial team will review your submission within 2-4 weeks</li>
              <li>You can check your submission status anytime using your tracking number</li>
              <li>We'll notify you once a decision has been made</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/track/${trackingNumber}" class="button">
                Track Your Submission
              </a>
            </p>
            
            <p><strong>Important:</strong> Please save this tracking number. You'll need it to check your submission status.</p>
          </div>
          <div class="footer">
            <p>The College Periodical<br>
            If you have any questions, please contact us.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Dear ${name},

Thank you for submitting your article "${title}" to The College Periodical.

Your Tracking Number: ${trackingNumber}

Please save this number. You can use it to check your submission status at any time.

What happens next?
- Our editorial team will review your submission within 2-4 weeks
- We'll notify you once a decision has been made

Track your submission: ${process.env.NEXT_PUBLIC_APP_URL}/track/${trackingNumber}

Best regards,
The College Periodical
    `
  }
}