import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import '../assets/styles/components/contact.css';
import { FaPaperPlane, FaMapMarkerAlt, FaGithub, FaLinkedin, FaCopy, FaCheck } from 'react-icons/fa';

const EMAILJS_SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const CONTACT_EMAIL       = process.env.REACT_APP_CONTACT_EMAIL;

const Contact = () => {
    const formRef  = useRef();
    const [sending, setSending] = useState(false);
    const [copied,  setCopied]  = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            toast.error('Contact form is not configured yet. Please use the email copy button.');
            return;
        }

        setSending(true);
        emailjs
            .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
            .then(
                () => {
                    toast.success("Message sent! I'll get back to you soon.");
                    formRef.current.reset();
                    setSending(false);
                },
                (error) => {
                    console.error('EmailJS error:', error);
                    toast.error('Something went wrong. Please try again or use the email link.');
                    setSending(false);
                }
            );
    };

    const copyEmail = () => {
        if (!CONTACT_EMAIL) {
            toast.error('Contact email is not configured yet.');
            return;
        }

        navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
            setCopied(true);
            toast.success('Email copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            // fallback for older browsers
            const ta = document.createElement('textarea');
            ta.value = CONTACT_EMAIL;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            toast.success('Email copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-layout">

                {/* ── Left: heading + contact details ── */}
                <div className="contact-info">
                    <div className="contact-intro">
                        <span className="availability-badge contact-availability-badge">
                            <span className="availability-badge-dot" aria-hidden="true" />
                            Open to work
                        </span>
                        <h2 className="contact-heading">Get In Touch</h2>
                        <p className="contact-description">
                            Feel free to reach out for opportunities, collaborations, or just to say hello.
                        </p>
                    </div>

                    <div className="contact-details">
                        <h3 className="contact-details-title">Contact Details</h3>
                        <ul className="contact-details-list">
                            <li>
                                <FaMapMarkerAlt className="detail-icon" />
                                <span><strong>Location:</strong> Munich, Germany</span>
                            </li>
                            <li>
                                <FaGithub className="detail-icon" />
                                <span>
                                    <strong>GitHub:</strong>{' '}
                                    <a
                                        href="https://github.com/Oussemamri"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Oussemamri
                                    </a>
                                </span>
                            </li>
                            <li>
                                <FaLinkedin className="detail-icon" />
                                <span>
                                    <strong>LinkedIn:</strong>{' '}
                                    <a
                                        href="https://linkedin.com/in/oussema-amri"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        oussema-amri
                                    </a>
                                </span>
                            </li>
                            <li>
                                <FaCopy className="detail-icon" />
                                <span>
                                    <strong>Email:</strong>{' '}
                                    <button
                                        type="button"
                                        className="copy-email-btn"
                                        onClick={copyEmail}
                                    >
                                        {copied ? (
                                            <><FaCheck /> Copied!</>
                                        ) : (
                                            'Copy address'
                                        )}
                                    </button>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ── Right: form card ── */}
                <div className="contact-form-panel">
                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">

                        {/* Name + Email side by side */}
                        <div className="form-row">
                            <div className="form-field">
                                <label htmlFor="from_name">Name</label>
                                <input
                                    type="text"
                                    id="from_name"
                                    name="from_name"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="from_email">Email</label>
                                <input
                                    type="email"
                                    id="from_email"
                                    name="from_email"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="What's this about?"
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Your message..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="contact-submit-btn"
                            disabled={sending}
                        >
                            {sending ? (
                                'Sending…'
                            ) : (
                                <>
                                    <FaPaperPlane className="btn-icon" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default Contact;
