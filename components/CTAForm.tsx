'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

const submissionEndpoint = 'https://formsubmit.co/ajax/adtiyadahal964@gmail.com';
const requiredFields = ['fullName', 'email', 'marketingChallenge', 'consultationTime'] as const;

type RequiredFieldName = (typeof requiredFields)[number];
type FieldName = RequiredFieldName | 'businessName' | 'url' | 'whatsapp' | 'businessGoal' | 'consultationDate';
type Errors = Partial<Record<FieldName | 'form', string>>;
type RequiredValues = Record<RequiredFieldName, string>;

const initialRequiredValues: RequiredValues = {
  fullName: '', email: '', marketingChallenge: '', consultationTime: '',
};

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
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const nextErrors: Errors = {};
    const fullName = String(formData.get('fullName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const challenge = String(formData.get('marketingChallenge') ?? '').trim();
    const time = String(formData.get('consultationTime') ?? '').trim();
    const phone = String(formData.get('whatsapp') ?? '').trim();
    const url = String(formData.get('url') ?? '').trim();

    if (!fullName) nextErrors.fullName = 'Full Name is required.';
    if (!email) nextErrors.email = 'Email Address is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email address.';
    if (!challenge) nextErrors.marketingChallenge = 'Choose your biggest marketing challenge.';
    if (!time) nextErrors.consultationTime = 'Choose a preferred consultation time.';
    if (phone) {
      const digitCount = phone.replace(/\D/g, '').length;
      if (digitCount < 7 || digitCount > 15) nextErrors.whatsapp = 'Enter a valid phone or WhatsApp number.';
    }
    if (url) {
      try { new URL(url); } catch { nextErrors.url = 'Enter a complete URL beginning with http:// or https://.'; }
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
      'Phone / WhatsApp Number': phone ? `+977 ${phone}` : '',
      'Biggest Marketing Challenge': challenge,
      'Main Business Goal': String(formData.get('businessGoal') ?? '').trim(),
      'Preferred Consultation Date': String(formData.get('consultationDate') ?? '').trim(),
      'Preferred Consultation Time': time,
      'Time Zone': 'Asia/Katmandu',
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
      if (!response.ok || result?.success === false || result?.success === 'false') {
        throw new Error(result?.message || 'Submission failed');
      }
      window.location.assign('/thank-you');
    } catch {
      setErrors({ form: 'We could not submit your request. Please check your connection and try again.' });
      setSubmitting(false);
    }
  }

  return (
    <form action="https://formsubmit.co/adtiyadahal964@gmail.com" method="POST" onSubmit={handleSubmit} noValidate className="mt-9">
      <p className="text-sm text-[var(--muted)]">Fields marked <span className="text-red-500">*</span> are required.</p>
      <p className="mt-4 text-sm font-semibold text-[var(--muted)]" aria-live="polite">{completedRequiredFields} of {requiredFields.length} required fields complete.</p>

      <div className="consultation-steps mt-7 space-y-8">
        <div className="form-step grid gap-5 sm:grid-cols-2">
          <label className="min-w-0">
            <span className="mb-2 block text-sm font-semibold">Full Name <span className="text-red-500">*</span></span>
            <input className="field min-h-14" name="fullName" type="text" autoComplete="name" placeholder="Enter your full name" required onChange={handleFieldChange} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
            <FieldError name="fullName" message={errors.fullName} />
          </label>
          <label className="min-w-0">
            <span className="mb-2 block text-sm font-semibold">Email Address <span className="text-red-500">*</span></span>
            <input className="field min-h-14" name="email" type="email" autoComplete="email" placeholder="you@example.com" required onChange={handleFieldChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            <FieldError name="email" message={errors.email} />
          </label>
        </div>

        <div className="form-step grid gap-5 sm:grid-cols-2">
          <label className="min-w-0">
            <span className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">Business Name <OptionalBadge /></span>
            <input className="field min-h-14" name="businessName" type="text" autoComplete="organization" placeholder="Enter your business name" onChange={handleFieldChange} />
          </label>
          <label className="min-w-0">
            <span className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">Website or Social Media Link <OptionalBadge /></span>
            <input className="field min-h-14" name="url" type="url" inputMode="url" placeholder="https://your-website-or-profile.com" onChange={handleFieldChange} aria-invalid={Boolean(errors.url)} aria-describedby={errors.url ? 'url-help url-error' : 'url-help'} />
            <span id="url-help" className="mt-1.5 block text-xs leading-5 text-[var(--muted)]">Optional — add a website or social media address.</span>
            <FieldError name="url" message={errors.url} />
          </label>
        </div>

        <div className="form-step">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">Phone / WhatsApp Number <OptionalBadge /></div>
          <div className="grid gap-3 sm:grid-cols-[.8fr_1.2fr]">
            <label><span className="sr-only">Country calling code</span><select className="field min-h-14" name="phoneCountryCode" defaultValue="+977" aria-label="Country calling code"><option value="+977">Nepal (+977)</option></select></label>
            <label><span className="sr-only">Phone or WhatsApp number</span><input className="field min-h-14" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Enter your phone or WhatsApp number" onChange={handleFieldChange} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? 'phone-help whatsapp-error' : 'phone-help'} /></label>
          </div>
          <span id="phone-help" className="mt-1.5 block text-xs leading-5 text-[var(--muted)]">Optional — Nepal (+977) is selected by default.</span>
          <FieldError name="whatsapp" message={errors.whatsapp} />
        </div>

        <div className="form-step">
          <label>
            <span className="mb-2 block text-sm font-semibold">Biggest Marketing Challenge <span className="text-red-500">*</span></span>
            <select className="field min-h-14" name="marketingChallenge" required defaultValue="" onChange={handleFieldChange} aria-invalid={Boolean(errors.marketingChallenge)} aria-describedby={errors.marketingChallenge ? 'marketingChallenge-error' : undefined}>
              <option value="" disabled>Select your biggest challenge</option>
              <option value="Not generating enough qualified leads">Not generating enough qualified leads</option>
              <option value="Getting attention but not enough sales">Getting attention but not enough sales</option>
              <option value="Unsure which marketing channels to prioritize">Unsure which marketing channels to prioritize</option>
              <option value="No clear marketing plan">No clear marketing plan</option>
              <option value="Other">Other</option>
            </select>
            <FieldError name="marketingChallenge" message={errors.marketingChallenge} />
          </label>
        </div>

        <div className="form-step">
          <label>
            <span className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">Main Business Goal <OptionalBadge /></span>
            <input className="field min-h-14" name="businessGoal" type="text" placeholder="What would you like to improve or achieve?" onChange={handleFieldChange} />
          </label>
        </div>

        <div className="form-step grid gap-5 sm:grid-cols-2">
          <label className="min-w-0">
            <span className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold">Preferred Consultation Date <OptionalBadge /></span>
            <input className="field min-h-14" name="consultationDate" type="date" min={todayInKathmandu} onChange={handleFieldChange} />
          </label>
          <label className="min-w-0">
            <span className="mb-2 block text-sm font-semibold">Preferred Consultation Time <span className="text-red-500">*</span></span>
            <select className="field min-h-14" name="consultationTime" required defaultValue="" onChange={handleFieldChange} aria-invalid={Boolean(errors.consultationTime)} aria-describedby={errors.consultationTime ? 'time-help consultationTime-error' : 'time-help'}>
              <option value="" disabled>Choose a suitable time</option>
              <option value="Morning — 9:00 AM to 12:00 PM">Morning — 9:00 AM to 12:00 PM</option>
              <option value="Afternoon — 12:00 PM to 4:00 PM">Afternoon — 12:00 PM to 4:00 PM</option>
              <option value="Evening — 4:00 PM to 7:00 PM">Evening — 4:00 PM to 7:00 PM</option>
              <option value="Flexible">Flexible</option>
            </select>
            <span id="time-help" className="mt-1.5 block text-xs leading-5 text-[var(--muted)]">Time zone: Asia/Katmandu</span>
            <FieldError name="consultationTime" message={errors.consultationTime} />
          </label>
        </div>
      </div>

      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {errors.form && <p role="alert" className="mt-7 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">{errors.form}</p>}
      <div className="mt-8 sm:pl-8">
        <button type="submit" disabled={submitting} className="primary-button min-h-14 w-full break-words px-7 py-3 sm:w-auto disabled:cursor-wait disabled:opacity-60">{submitting ? 'Submitting your request…' : 'Book a Free Consultation'}</button>
        <p className="mt-3 text-sm text-[var(--muted)]">We respect your privacy. No spam.</p>
      </div>
    </form>
  );
}
