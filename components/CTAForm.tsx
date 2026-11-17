'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';

const flodeskFormId = '6afc66a255c0e21c9329e9e0';
const flodeskSubmissionUrl = `https://form.flodesk.com/forms/${flodeskFormId}/submit`;
const flodeskConfig = 'eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJyZWRpcmVjdCIsIm1lc3NhZ2UiOiIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vaW5xdWlyeS5hYWRpdHlhZGFoYWwxLmNvbS5ucC90aGFuay15b3UvIn0sImNvaSI6dHJ1ZSwic2hvd0ZvclJldHVyblZpc2l0b3JzIjp0cnVlLCJub3RpZmljYXRpb24iOnRydWUsImdkcHIiOnsiYWNjZXB0c01hcmtldGluZyI6ZmFsc2UsInByaXZhY3lQb2xpY3kiOnsiZW5hYmxlZCI6ZmFsc2UsIm1hbmRhdG9yeSI6ZmFsc2V9fSwidHJhY2tpbmdDb25maWciOnsibWV0YVBpeGVsSWQiOiIiLCJjb29raWVCYW5uZXJFbmFibGVkIjpmYWxzZSwiZ29vZ2xlQW5hbHl0aWNzSWQiOiIifX0=';
const requiredFields = ['fullName', 'businessName', 'email', 'phoneNumber'] as const;

type RequiredFieldName = (typeof requiredFields)[number];
type FieldName = RequiredFieldName | 'url' | 'businessChallenge';
type Errors = Partial<Record<FieldName | 'form', string>>;
type RequiredValues = Record<RequiredFieldName, string>;
type FlodeskHandler = ((event: string, options: Record<string, string>) => void) & { q?: Array<[string, Record<string, string>]> };

declare global {
  interface Window {
    fd?: FlodeskHandler;
    FlodeskObject?: string;
  }
}

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
  const completedRequiredFields = useMemo(
    () => requiredFields.filter((field) => requiredValues[field].trim()).length,
    [requiredValues],
  );

  useEffect(() => {
    if (!window.fd) {
      window.FlodeskObject = 'fd';
      const queue = ((event: string, options: Record<string, string>) => {
        queue.q = queue.q || [];
        queue.q.push([event, options]);
      }) as FlodeskHandler;
      window.fd = queue;

      const moduleScript = document.createElement('script');
      moduleScript.async = true;
      moduleScript.type = 'module';
      moduleScript.src = 'https://assets.flodesk.com/universal.mjs';
      document.head.appendChild(moduleScript);

      const fallbackScript = document.createElement('script');
      fallbackScript.async = true;
      fallbackScript.noModule = true;
      fallbackScript.src = 'https://assets.flodesk.com/universal.js';
      document.head.appendChild(fallbackScript);
    }

    window.fd?.('form:handle', {
      formId: flodeskFormId,
      rootEl: `.ff-${flodeskFormId}`,
    });
  }, []);

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
    const fieldName = event.currentTarget.dataset.field as FieldName;
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
    const fullName = String(formData.get('firstName') ?? '').trim();
    const businessName = String(formData.get('fields.businessName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phoneNumber = String(formData.get('fields.phoneWhatsappNumber') ?? '').trim();
    const url = String(formData.get('fields.websiteOrSocialMediaLink') ?? '').trim();

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
      event.preventDefault();
      window.requestAnimationFrame(() => {
        const invalidField = formElement.querySelector<HTMLElement>(`[data-field="${firstInvalidField}"]`);
        invalidField?.focus();
      });
      return;
    }

    setSubmitting(true);
  }

  return (
    <div className={`ff-${flodeskFormId}`} data-ff-el="root">
      <div data-ff-el="config" data-ff-config={flodeskConfig} className="hidden" />
    <form action={flodeskSubmissionUrl} method="post" data-ff-el="form" onSubmit={handleSubmit} noValidate className="landing-consultation-form" aria-busy={submitting}>
      <div className="form-progress" data-ff-el="content">
        <p>Fields marked <span className="text-red-500">*</span> are required.</p>
        <p aria-live="polite">{completedRequiredFields} of {requiredFields.length} required fields complete</p>
      </div>

      <div className="consultation-field-grid" data-ff-el="fields">
        <label className="consultation-field consultation-field-half">
          <span className="field-label">Full Name <span className="text-red-500">*</span></span>
          <input className="field" name="firstName" data-field="fullName" type="text" autoComplete="name" minLength={2} placeholder="Enter your full name" required onChange={handleFieldChange} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
          <FieldError name="fullName" message={errors.fullName} />
        </label>

        <label className="consultation-field consultation-field-half">
          <span className="field-label">Business Name <span className="text-red-500">*</span></span>
          <input className="field" name="fields.businessName" data-field="businessName" type="text" autoComplete="organization" minLength={2} placeholder="Enter your business name" required onChange={handleFieldChange} aria-invalid={Boolean(errors.businessName)} aria-describedby={errors.businessName ? 'businessName-error' : undefined} />
          <FieldError name="businessName" message={errors.businessName} />
        </label>

        <label className="consultation-field">
          <span className="field-label">Email Address <span className="text-red-500">*</span></span>
          <input className="field" name="email" data-field="email" type="email" autoComplete="email" placeholder="you@example.com" required onChange={handleFieldChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
          <FieldError name="email" message={errors.email} />
        </label>

        <label className="consultation-field">
          <span className="field-label">Phone / WhatsApp Number <span className="text-red-500">*</span></span>
          <input className="field" name="fields.phoneWhatsappNumber" data-field="phoneNumber" type="tel" autoComplete="tel" inputMode="tel" placeholder="+977 98XXXXXXXX" required onChange={handleFieldChange} aria-invalid={Boolean(errors.phoneNumber)} aria-describedby={errors.phoneNumber ? 'phoneNumber-help phoneNumber-error' : 'phoneNumber-help'} />
          <span id="phoneNumber-help" className="field-help">Include your country code.</span>
          <FieldError name="phoneNumber" message={errors.phoneNumber} />
        </label>

        <label className="consultation-field">
          <span className="field-label flex-wrap gap-2">Website or Social Media Link <OptionalBadge /></span>
          <input className="field" name="fields.websiteOrSocialMediaLink" data-field="url" type="url" inputMode="url" placeholder="https://yourwebsite.com" onChange={handleFieldChange} aria-invalid={Boolean(errors.url)} aria-describedby={errors.url ? 'url-help url-error' : 'url-help'} />
          <span id="url-help" className="field-help">Share a website or social profile if available.</span>
          <FieldError name="url" message={errors.url} />
        </label>

        <label className="consultation-field">
          <span className="field-label flex-wrap gap-2">Briefly Describe Your Main Business Challenge <OptionalBadge /></span>
          <textarea className="field field-textarea" name="fields.anythingYouWantToSay" data-field="businessChallenge" rows={3} maxLength={1000} placeholder="Tell me briefly what is getting in the way of your business growth" onChange={handleFieldChange} aria-describedby="businessChallenge-help" />
          <span id="businessChallenge-help" className="field-help">A short overview is enough—we can discuss the details during the call.</span>
        </label>
      </div>

      <input type="text" name="confirm_email_address" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {errors.form && <p role="alert" className="form-error-message">{errors.form}</p>}

      <button type="submit" data-ff-el="submit" disabled={submitting} className="primary-button consultation-submit">
        {submitting ? 'Sending Your Request…' : 'Book My Free Consultation'}
      </button>
      <p className="form-privacy-note">Your information will only be used to respond to your consultation request.</p>
    </form>
    </div>
  );
}
