type VerifyEmail = {
  subject: string
  html: string
  text: string
}

export function buildVerifyEmail(confirmUrl: string): VerifyEmail {
  const subject = 'Verify your Project Exodus account'
  const text = [
    'Please verify your Project Exodus account.',
    '',
    `Verify here: ${confirmUrl}`,
    '',
    'If you did not create this account, you can ignore this email.'
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Verify your email</h2>
      <p>Thanks for joining Project Exodus. Please confirm your email address.</p>
      <p>
        <a href="${confirmUrl}" style="display:inline-block;padding:10px 16px;background:#2f6b3c;color:#fff;text-decoration:none;border-radius:6px;">
          Verify email
        </a>
      </p>
      <p style="font-size:12px;color:#555;">
        If you did not create this account, you can ignore this email.
      </p>
    </div>
  `

  return { subject, html, text }
}
