type NewsletterEmail = {
  subject: string
  html: string
  text: string
}

export function buildNewsletterConfirmEmail(confirmUrl: string): NewsletterEmail {
  const subject = 'Confirm your Project Exodus newsletter subscription'
  const text = [
    'Confirm your subscription to Project Exodus.',
    '',
    `Confirm here: ${confirmUrl}`,
    '',
    'If you did not request this, you can ignore this email.'
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Confirm your subscription</h2>
      <p>Thanks for signing up for Project Exodus updates.</p>
      <p>
        <a href="${confirmUrl}" style="display:inline-block;padding:10px 16px;background:#2f6b3c;color:#fff;text-decoration:none;border-radius:6px;">
          Confirm subscription
        </a>
      </p>
      <p style="font-size:12px;color:#555;">
        If you did not request this, you can ignore this email.
      </p>
    </div>
  `

  return { subject, html, text }
}
