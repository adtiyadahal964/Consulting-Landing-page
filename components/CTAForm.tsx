'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

const submissionEndpoint = '/api/consultation/';
const requiredFields = ['fullName', 'businessName', 'email', 'phoneNumber'] as const;

type RequiredFieldName = (typeof requiredFields)[number];
type FieldName = RequiredFieldName | 'url' | 'businessChallenge';
type Errors = Partial<Record<FieldName | 'form', string>>;
type RequiredValues = Record<RequiredFieldName, string>;
type SubmissionResponse = { success?: boolean; message?: string };

const initialRequiredValues: RequiredValues = {
  fullName: '',
  businessName: '',
  email: '',
  phoneNumber: '',
};

function OptionalBadge() {
  return <span className="optional-badge">Optional</span>;
}

function FieldError({ name, message }: { name: FieldName; message?: string }) {
  if (!message) return null;
  return <span id={`${name}-error`} role="alert" className="field-error">{message}</span>;
}

export default function CTAForm() {
  const [requiredValues, setRequiredValues] = useState<RequiredValues>(initialRequiredValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const completedRequiredFields = useMemo(
    () => requiredFields.filter((field) => requiredValues[field].trim()).length,
    [requiredValues],
  );

  function clearFieldError(fieldName: FieldName) {
    setErrors((current) => {
      if (!current[fieldName] && !current.form) return current;
      const next = { ...current };
      delete next[fieldName];
      delete next.form;
      return next;
    });
  }

  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const fieldName = event.currentTarget.name as FieldName;
    const value = event.currentTarget.value;
    if (requiredFields.includes(fieldName as RequiredFieldName)) {
      setRequiredValues((current) => ({ ...current, [fieldName]: value }));
    }
    clearFieldError(fieldName);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const nextErrors: Errors = {};
    const fullName = String(formData.get('fullName') ?? '').trim();
    const businessName = String(formData.get('businessName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phoneNumber = String(formData.get('phoneNumber') ?? '').trim();
    const url = String(formData.get('url') ?? '').trim();
    const businessChallenge = String(formData.get('businessChallenge') ?? '').trim();

    if (fullName.length < 2) nextErrors.fullName = 'Enter your full name.';
    if (businessName.length < 2) nextErrors.businessName = 'Enter your business name.';
    if (!email) nextErrors.email = 'Enter your email address.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email address.';

    const phoneDigits = phoneNumber.replace(/\D/g, '');
    if (!phoneNumber) nextErrors.phoneNumber = 'Enter your phone or WhatsApp number.';
    else if (phoneDigits.length < 7 || phoneDigits.length > 15) nextErrors.phoneNumber = 'Enter a valid number with your country code.';

    if (url) {
      try {
        const parsedUrl = new URL(url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('Unsupported protocol');
      } catch {
        nextErrors.url = 'Use a complete address beginning with http:// or https://.';
      }
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
    try {
      const response = await fetch(submissionEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          businessName,
          email,
          phoneNumber,
          url,
          businessChallenge,
          honey: String(formData.get('_honey') ?? ''),
        }),
      });
      const result = (await response.json().catch(() => null)) as SubmissionResponse | null;
      if (!response.ok || !result?.success) throw new Error(result?.message || 'Submission failed');
      setSubmitted(true);
      window.setTimeout(() => window.location.assign('/thank-you/'), 500);
    } catch {
      setErrors({ form: 'Your request could not be sent. Please try again in a moment—your entered details are still here.' });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="landing-consultation-form" aria-busy={submitting}>
      <div className="form-progress">
        <p>Fields marked <span className="text-red-500">*</span> are required.</p>
        <p aria-live="polite">{completedRequiredFields} of {requiredFields.length} required fields complete</p>
      </div>

      <div className="consultation-field-grid">
        <label className="consultation-field consultation-field-half">
          <span className="field-label">Full Name <span className="text-red-500">*</span></span>
          <input className="field" name="fullName" type="text" autoComplete="name" minLength={2} placeholder="Enter your full name" required onChange={handleFieldChange} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
          <FieldError name="fullName" message={errors.fullName} />
        </label>

        <label className="consultation-field consultation-field-half">
          <span className="field-label">Business Name <span className="text-red-500">*</span></span>
          <input className="field" name="businessName" type="text" autoComplete="organization" minLength={2} placeholder="Enter your business name" required onChange={handleFieldChange} aria-invalid={Boolean(errors.businessName)} aria-describedby={errors.businessName ? 'businessName-error' : undefined} />
          <FieldError name="businessName" message={errors.businessName} />
        </label>

        <label className="consultation-field">
          <span className="field-label">Email Address <span className="text-red-500">*</span></span>
          <input className="field" name="email" type="email" autoComplete="email" placeholder="you@example.com" required onChange={handleFieldChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
          <FieldError name="email" message={errors.email} />
        </label>

        <label className="consultation-field">
          <span className="field-label">Phone / WhatsApp Number <span className="text-red-500">*</span></span>
          <input className="field" name="phoneNumber" type="tel" autoComplete="tel" inputMode="tel" placeholder="+977 98XXXXXXXX" required onChange={handleFieldChange} aria-invalid={Boolean(errors.phoneNumber)} aria-describedby={errors.phoneNumber ? 'phoneNumber-help phoneNumber-error' : 'phoneNumber-help'} />
          <span id="phoneNumber-help" className="field-help">Include your country code.</span>
          <FieldError name="phoneNumber" message={errors.phoneNumber} />
        </label>

        <label className="consultation-field">
          <span className="field-label flex-wrap gap-2">Website or Social Media Link <OptionalBadge /></span>
          <input className="field" name="url" type="url" inputMode="url" placeholder="https://yourwebsite.com" onChange={handleFieldChange} aria-invalid={Boolean(errors.url)} aria-describedby={errors.url ? 'url-help url-error' : 'url-help'} />
          <span id="url-help" className="field-help">Share a website or social profile if available.</span>
          <FieldError name="url" message={errors.url} />
        </label>

        <label className="consultation-field">
          <span className="field-label flex-wrap gap-2">Briefly Describe Your Main Business Challenge <OptionalBadge /></span>
          <textarea className="field field-textarea" name="businessChallenge" rows={3} maxLength={1000} placeholder="Tell me briefly what is getting in the way of your business growth" onChange={handleFieldChange} aria-describedby="businessChallenge-help" />
          <span id="businessChallenge-help" className="field-help">A short overview is enough—we can discuss the details during the call.</span>
        </label>
      </div>

      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {submitted && <p role="status" className="form-success-message">Your request was sent successfully. Taking you to the next steps…</p>}
      {errors.form && <p role="alert" className="form-error-message">{errors.form}</p>}

      <button type="submit" disabled={submitting} className="primary-button consultation-submit">
        {submitted ? 'Request Sent' : submitting ? 'Sending Your Request…' : 'Book My Free Consultation'}
      </button>
      <p className="form-privacy-note">Your information will only be used to respond to your consultation request.</p>
    </form>
  );
}
