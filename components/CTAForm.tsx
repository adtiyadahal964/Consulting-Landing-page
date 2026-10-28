'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

const submissionEndpoint = 'https://formsubmit.co/ajax/adtiyadahal964@gmail.com';
const requiredFields = ['fullName', 'email', 'marketingChallenge', 'consultationTime'] as const;
const countryCodes = [
  '+977 — Nepal', '+91 — India', '+880 — Bangladesh', '+92 — Pakistan', '+94 — Sri Lanka',
  '+971 — United Arab Emirates', '+974 — Qatar', '+966 — Saudi Arabia', '+44 — United Kingdom',
  '+1 — United States / Canada', '+61 — Australia', '+64 — New Zealand', '+65 — Singapore',
  '+60 — Malaysia', '+81 — Japan', '+82 — South Korea', '+49 — Germany', '+33 — France',
];

type RequiredFieldName = (typeof requiredFields)[number];
type FieldName = RequiredFieldName | 'businessName' | 'url' | 'whatsapp' | 'businessGoal' | 'consultationDate' | 'otherChallenge';
type Errors = Partial<Record<FieldName | 'form', string>>;
type RequiredValues = Record<RequiredFieldName, string>;

const initialRequiredValues: RequiredValues = { fullName: '', email: '', marketingChallenge: '', consultationTime: '' };

function OptionalBadge() {
  return <span className="optional-badge">Optional</span>;
}

function FieldError({ name, message }: { name: FieldName; message?: string }) {
  if (!message) return null;
  return <span id={`${name}-error`} role="alert" className="mt-1.5 block text-sm text-red-600 dark:text-red-400">{message}</span>;
}

export default function CTAForm() {
  const [requiredValues, setRequiredValues] = useState<RequiredValues>(initialRequiredValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const completedRequiredFields = useMemo(() => requiredFields.filter((field) => requiredValues[field].trim()).length, [requiredValues]);
  const todayInKathmandu = useMemo(() => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kathmandu' }), []);
  const showOtherChallenge = requiredValues.marketingChallenge === 'Other';

  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const fieldName = event.currentTarget.name as FieldName;
    const value = event.currentTarget.value;
    if (requiredFields.includes(fieldName as RequiredFieldName)) {
      setRequiredValues((current) => ({ ...current, [fieldName]: value }));
    }
    setErrors((current) => {
      if (!current[fieldName] && !current.form) return current;
      const next = { ...current };
      delete next[fieldName];
      delete next.form;
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const nextErrors: Errors = {};
    const fullName = String(formData.get('fullName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const challenge = String(formData.get('marketingChallenge') ?? '').trim();
    const otherChallenge = String(formData.get('otherChallenge') ?? '').trim();
    const time = String(formData.get('consultationTime') ?? '').trim();
    const phone = String(formData.get('whatsapp') ?? '').trim();
    const countryCode = String(formData.get('phoneCountryCode') ?? '+977 — Nepal').trim();
    const url = String(formData.get('url') ?? '').trim();

    if (!fullName) nextErrors.fullName = 'Enter your full name.';
    if (!email) nextErrors.email = 'Enter your email address.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email address.';
    if (!challenge) nextErrors.marketingChallenge = 'Choose your biggest marketing challenge.';
    if (challenge === 'Other' && !otherChallenge) nextErrors.otherChallenge = 'Briefly describe the challenge you want to discuss.';
    if (!time) nextErrors.consultationTime = 'Choose a preferred consultation time.';
    if (phone) {
      const digitCount = phone.replace(/\D/g, '').length;
      if (digitCount < 7 || digitCount > 15) nextErrors.whatsapp = 'Enter a valid phone or WhatsApp number.';
    }
    if (url) {
      try { new URL(url); } catch { nextErrors.url = 'Use a complete address beginning with http:// or https://.'; }
    }

    setErrors(nextErrors);
    const firstInvalidField = Object.keys(nextErrors)[0] as FieldName | undefined;
    if (firstInvalidField) {
      window.requestAnimationFrame(() => {
        const invalidField = formElement.elements.namedItem(firstInvalidField) as HTMLElement | null;
        invalidField?.focus();
      });
      return;
    }

    setSubmitting(true);
    const payload = {
      'Full Name': fullName,
      'Email Address': email,
      'Business Name': String(formData.get('businessName') ?? '').trim(),
      'Website or Social Media Link': url,
      'Phone / WhatsApp Number': phone ? `${countryCode.split('—')[0].trim()} ${phone}` : '',
      'Biggest Marketing Challenge': challenge === 'Other' ? `Other — ${otherChallenge}` : challenge,
      'Main Business Goal': String(formData.get('businessGoal') ?? '').trim(),
      'Preferred Consultation Date': String(formData.get('consultationDate') ?? '').trim(),
      'Preferred Consultation Time': time,
      'Time Zone': 'Asia/Kathmandu',
      _replyto: email,
      _subject: 'New Free Marketing Consultation Request',
      _template: 'table',
      _captcha: 'false',
      _honey: String(formData.get('_honey') ?? ''),
    };

    try {
      const response = await fetch(submissionEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean | string; message?: string } | null;
      if (!response.ok || result?.success === false || result?.success === 'false') throw new Error(result?.message || 'Submission failed');
      window.location.assign('/thank-you');
    } catch {
      setErrors({ form: 'Your request could not be sent. Check your connection and try again—your entered details are still here.' });
      setSubmitting(false);
    }
  }

  return (
    <form action="https://formsubmit.co/adtiyadahal964@gmail.com" method="POST" onSubmit={handleSubmit} noValidate className="mt-9" aria-busy={submitting}>
      <div className="flex flex-col gap-2 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--muted)]">Fields marked <span className="text-red-500">*</span> are required.</p>
        <p className="text-sm font-semibold text-[var(--muted)]" aria-live="polite">{completedRequiredFields} of {requiredFields.length} required fields complete</p>
      </div>

      <div className="consultation-steps mt-7 space-y-8">
        <div className="form-step grid gap-5 md:grid-cols-2">
          <label className="min-w-0"><span className="field-label">Full Name <span className="text-red-500">*</span></span><input className="field" name="fullName" type="text" autoComplete="name" placeholder="Enter your full name" required onChange={handleFieldChange} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} /><FieldError name="fullName" message={errors.fullName} /></label>
          <label className="min-w-0"><span className="field-label">Email Address <span className="text-red-500">*</span></span><input className="field" name="email" type="email" autoComplete="email" placeholder="you@example.com" required onChange={handleFieldChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} /><FieldError name="email" message={errors.email} /></label>
        </div>

        <div className="form-step grid gap-5 md:grid-cols-2">
          <label className="min-w-0"><span className="field-label flex-wrap gap-2">Business Name <OptionalBadge /></span><input className="field" name="businessName" type="text" autoComplete="organization" placeholder="Enter your business name" onChange={handleFieldChange} /></label>
          <label className="min-w-0"><span className="field-label flex-wrap gap-2">Website or Social Media Link <OptionalBadge /></span><input className="field" name="url" type="url" inputMode="url" placeholder="https://your-website.com" onChange={handleFieldChange} aria-invalid={Boolean(errors.url)} aria-describedby={errors.url ? 'url-help url-error' : 'url-help'} /><span id="url-help" className="field-help">A website or social profile helps provide context.</span><FieldError name="url" message={errors.url} /></label>
        </div>

        <div className="form-step">
          <div className="field-label flex-wrap gap-2">Phone / WhatsApp Number <OptionalBadge /></div>
          <div className="grid gap-3 md:grid-cols-[minmax(12rem,.8fr)_minmax(0,1.2fr)]">
            <label><span className="sr-only">Search or enter country calling code</span><input className="field" name="phoneCountryCode" list="country-codes" defaultValue="+977 — Nepal" aria-label="Search or enter country calling code" /><datalist id="country-codes">{countryCodes.map((country) => <option key={country} value={country} />)}</datalist></label>
            <label><span className="sr-only">Phone or WhatsApp number</span><input className="field" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Enter your phone or WhatsApp number" onChange={handleFieldChange} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? 'phone-help whatsapp-error' : 'phone-help'} /></label>
          </div>
          <span id="phone-help" className="field-help">Optional — Nepal (+977) is selected by default. Type to search another country.</span><FieldError name="whatsapp" message={errors.whatsapp} />
        </div>

        <div className="form-step">
          <label><span className="field-label">Biggest Marketing Challenge <span className="text-red-500">*</span></span><select className="field" name="marketingChallenge" required defaultValue="" onChange={handleFieldChange} aria-invalid={Boolean(errors.marketingChallenge)} aria-describedby={errors.marketingChallenge ? 'marketingChallenge-error' : undefined}><option value="" disabled>Select your biggest challenge</option><option>Getting more customers</option><option>Generating leads</option><option>Improving paid advertising</option><option>Content and social media</option><option>Email marketing and lead generation</option><option>Website or landing page</option><option>SEO</option><option>Using AI in marketing</option><option>Other</option></select><FieldError name="marketingChallenge" message={errors.marketingChallenge} /></label>
        </div>

        {showOtherChallenge && <div className="form-step"><label><span className="field-label">Describe Your Marketing Challenge <span className="text-red-500">*</span></span><input className="field" name="otherChallenge" type="text" placeholder="What would you like to discuss?" required onChange={handleFieldChange} aria-invalid={Boolean(errors.otherChallenge)} aria-describedby={errors.otherChallenge ? 'otherChallenge-error' : undefined} /><FieldError name="otherChallenge" message={errors.otherChallenge} /></label></div>}

        <div className="form-step"><label><span className="field-label flex-wrap gap-2">Main Business Goal <OptionalBadge /></span><input className="field" name="businessGoal" type="text" placeholder="What would you like to improve or achieve?" onChange={handleFieldChange} /></label></div>

        <div className="form-step grid gap-5 md:grid-cols-2">
          <label className="min-w-0"><span className="field-label flex-wrap gap-2">Preferred Consultation Date <OptionalBadge /></span><input className="field" name="consultationDate" type="date" min={todayInKathmandu} onChange={handleFieldChange} /></label>
          <label className="min-w-0"><span className="field-label">Preferred Consultation Time <span className="text-red-500">*</span></span><select className="field" name="consultationTime" required defaultValue="" onChange={handleFieldChange} aria-invalid={Boolean(errors.consultationTime)} aria-describedby={errors.consultationTime ? 'time-help consultationTime-error' : 'time-help'}><option value="" disabled>Choose a suitable time</option><option value="Morning — 9:00 AM to 12:00 PM">Morning — 9:00 AM to 12:00 PM</option><option value="Afternoon — 12:00 PM to 4:00 PM">Afternoon — 12:00 PM to 4:00 PM</option><option value="Evening — 4:00 PM to 7:00 PM">Evening — 4:00 PM to 7:00 PM</option><option value="Flexible">Flexible</option></select><span id="time-help" className="field-help">Time zone: Asia/Kathmandu</span><FieldError name="consultationTime" message={errors.consultationTime} /></label>
        </div>
      </div>

      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {errors.form && <p role="alert" className="mt-7 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">{errors.form}</p>}
      <div className="mt-8 sm:pl-8"><button type="submit" disabled={submitting} className="primary-button min-h-14 w-full break-words px-7 py-3 sm:w-auto disabled:cursor-wait disabled:opacity-60">{submitting ? 'Sending your request…' : 'Book a Free Consultation'}</button><p className="mt-3 text-sm text-[var(--muted)]">Your request is only confirmed after it is successfully sent. No spam.</p></div>
    </form>
  );
}
