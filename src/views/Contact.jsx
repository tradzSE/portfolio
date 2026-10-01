import { useEffect, useState } from 'react'
import { ValidationError, useForm } from '@formspree/react'
import RetroButton from '../components/RetroButton'

const contactEmail = 'teraldicoranier@gmail.com'
const cooldownMilliseconds = 60_000
const lastSubmissionKey = 'ranier-contact-last-submission'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [cooldownError, setCooldownError] = useState('')
  const [state, handleSubmit, reset] = useForm('myezvppa')

  useEffect(() => {
    if (state.succeeded) localStorage.setItem(lastSubmissionKey, String(Date.now()))
  }, [state.succeeded])

  const submit = (event) => {
    const lastSubmission = Number(localStorage.getItem(lastSubmissionKey) || 0)
    const remaining = cooldownMilliseconds - (Date.now() - lastSubmission)
    if (remaining > 0) {
      event.preventDefault()
      setCooldownError(`Please wait ${Math.ceil(remaining / 1000)} seconds before sending another message.`)
      return
    }
    setCooldownError('')
    handleSubmit(event)
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contactEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="view contact-view">
      <section className="contact-form-window">
        <header className="contact-form-header">
          <img src="/icons/application.png" alt="" />
          <div><h1>Contact Ranier</h1><p>Send a new message</p></div>
        </header>

        <div className="contact-form-layout">
          {state.succeeded ? (
            <section className="contact-success" role="status">
              <div className="contact-success-icon" aria-hidden="true">✓</div>
              <h2>Message sent</h2>
              <p>Thanks for reaching out. Your message was delivered to Ranier.</p>
              <RetroButton type="button" onClick={reset}>Send another message</RetroButton>
            </section>
          ) : <form onSubmit={submit}>
            <input type="hidden" name="_subject" value="New portfolio contact" />
            <div className="contact-trap" aria-hidden="true">
              <label htmlFor="contact-company-site">Leave this field empty</label>
              <input id="contact-company-site" name="_gotcha" tabIndex="-1" autoComplete="off" />
            </div>
            <div className="contact-field-row">
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" autoComplete="name" required />
              <ValidationError className="field-error" prefix="Name" field="name" errors={state.errors} />
            </div>
            <div className="contact-field-row">
              <label htmlFor="contact-email">Your email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
              <ValidationError className="field-error" prefix="Email" field="email" errors={state.errors} />
            </div>
            <div className="contact-field-row">
              <label htmlFor="contact-opportunity">Regarding</label>
              <select id="contact-opportunity" name="opportunity" defaultValue="Employment">
                <option>Employment</option>
                <option>Internship</option>
                <option>Freelance</option>
                <option>General inquiry</option>
              </select>
            </div>
            <div className="contact-field-row">
              <label htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" name="subject" defaultValue="Portfolio inquiry" autoComplete="off" required />
            </div>
            <div className="contact-field-row message-field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows="7" autoComplete="off" required />
              <ValidationError className="field-error" prefix="Message" field="message" errors={state.errors} />
            </div>
            <div className="contact-form-actions">
              <ValidationError className="form-error" errors={state.errors} />
              {cooldownError && <p className="form-error" role="alert">{cooldownError}</p>}
              <span>Sent securely through Formspree.</span>
              <RetroButton type="submit" disabled={state.submitting}>{state.submitting ? 'Sending…' : 'Send message'}</RetroButton>
            </div>
          </form>}

          <aside className="contact-sidebar">
            <section>
              <h2>Direct contact</h2>
              <p>{contactEmail}</p>
              <span className="sr-only" aria-live="polite">{copied ? 'Email address copied to clipboard.' : ''}</span>
              <RetroButton type="button" onClick={copyEmail}>{copied ? 'Copied' : 'Copy email'}</RetroButton>
            </section>
            <section>
              <h2>Elsewhere</h2>
              <a href="https://github.com/tradzSE" target="_blank" rel="noreferrer">GitHub profile ↗</a>
            </section>
            <section>
              <h2>Available for</h2>
              <p>Internship<br />Employment<br />Freelance</p>
            </section>
          </aside>
        </div>
      </section>
    </div>
  )
}
