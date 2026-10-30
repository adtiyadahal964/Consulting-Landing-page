type ConsultationRequest = {
  fullName?: unknown;
  email?: unknown;
  businessName?: unknown;
  url?: unknown;
  marketingChallenge?: unknown;
  otherChallenge?: unknown;
  businessGoal?: unknown;
  consultationTime?: unknown;
  honey?: unknown;
};

const MAX_FIELD_LENGTH = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character] ?? character);
}

function row(label: string, value: string) {
  if (!value) return '';
  return `<tr><th style="padding:10px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #e5e7eb">${escapeHtml(label)}</th><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb">${escapeHtml(value)}</td></tr>`;
}

export async function POST(request: Request) {
  let body: ConsultationRequest;

  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return Response.json({ success: false, message: 'Unsupported request format.' }, { status: 415 });
    }
    body = await request.json() as ConsultationRequest;
  } catch {
    return Response.json({ success: false, message: 'Invalid submission data.' }, { status: 400 });
  }

  const fullName = text(body.fullName, 120);
  const email = text(body.email, 254).toLowerCase();
  const businessName = text(body.businessName, 160);
  const url = text(body.url, 500);
  const marketingChallenge = text(body.marketingChallenge, 200);
  const otherChallenge = text(body.otherChallenge, 300);
  const businessGoal = text(body.businessGoal, 500);
  const consultationTime = text(body.consultationTime, 120);
  const honey = text(body.honey, 200);

  if (honey) return Response.json({ success: true });
  if (!fullName || !EMAIL_PATTERN.test(email) || !marketingChallenge || !consultationTime) {
    return Response.json({ success: false, message: 'Please complete all required fields with valid information.' }, { status: 400 });
  }
  if (marketingChallenge === 'Other' && !otherChallenge) {
    return Response.json({ success: false, message: 'Please describe the marketing challenge you want to discuss.' }, { status: 400 });
  }
  if (url) {
    try {
      const parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('Unsupported protocol');
    } catch {
      return Response.json({ success: false, message: 'Please enter a complete website address.' }, { status: 400 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONSULTATION_TO_EMAIL || 'adtiyadahal964@gmail.com';
  const sender = process.env.CONSULTATION_FROM_EMAIL;
  const emailApiUrl = process.env.RESEND_API_URL || 'https://api.resend.com/emails';

  if (!apiKey || !sender) {
    console.error('Consultation email delivery is not configured.');
    return Response.json({ success: false, message: 'The consultation service is temporarily unavailable. Please try again shortly.' }, { status: 503 });
  }

  const challenge = marketingChallenge === 'Other' ? `Other — ${otherChallenge}` : marketingChallenge;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5">
      <h1 style="font-size:22px">New consultation request</h1>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${row('Full Name', fullName)}
        ${row('Email Address', email)}
        ${row('Business Name', businessName)}
        ${row('Website or Social Media Link', url)}
        ${row('Biggest Marketing Challenge', challenge)}
        ${row('Main Business Goal', businessGoal)}
        ${row('Preferred Consultation Time', consultationTime)}
        ${row('Time Zone', 'Asia/Kathmandu')}
      </table>
    </div>`;

  try {
    const emailResponse = await fetch(emailApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `New consultation request from ${fullName}`,
        html,
      }),
    });

    if (!emailResponse.ok) {
      console.error('Consultation email provider rejected the request.', {
        status: emailResponse.status,
        providerRequestId: emailResponse.headers.get('x-request-id'),
      });
      return Response.json({ success: false, message: 'Your request could not be delivered. Please try again in a moment.' }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Consultation email delivery failed.', error instanceof Error ? error.message : 'Unknown delivery error');
    return Response.json({ success: false, message: 'Your request could not be delivered. Please try again in a moment.' }, { status: 502 });
  }
}
