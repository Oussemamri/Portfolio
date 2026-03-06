// EmailJS Setup Instructions:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an Email Service (connect your Gmail: amriouseema@gmail.com)
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, and YOUR_PUBLIC_KEY below

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import '../assets/styles/components/contact.css';
import { FaPaperPlane, FaMapMarkerAlt, FaGithub, FaLinkedin, FaCopy, FaCheck } from 'react-icons/fa';

const EMAILJS_SERVICE_ID = 'service_yd3hybi';
const EMAILJS_TEMPLATE_ID = 'template_9abm7ws';
const EMAILJS_PUBLIC_KEY = 'ZJwWwntwhlQCxKBJd';

const Contact = () => {
    const formRef = useRef();
    const [sending, setSending] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);

        emailjs
            .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
            .then(
                () => {
                    toast.success('Message sent! I\'ll get back to you soon.');
                    formRef.current.reset();
                    setSending(false);
                },
                (error) => {
                    console.error('EmailJS error:', error);
                    toast.error('Something went wrong. Please try again or use the email link below.');
                    setSending(false);
                }
            );
    };

    const copyEmail = () => {
        navigator.clipboard.writeText('amriouseema@gmail.com').then(() => {
            setCopied(true);
            toast.success('Email copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = 'amriouseema@gmail.com';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            toast.success('Email copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-description">
                    Feel free to reach out for opportunities, collaborations, or just to say hello.
                </p>

                <div className="contact-card">
                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="from_name">Name</label>
                            <input
                                type="text"
                                id="from_name"
                                name="from_name"
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="from_email">Email</label>
                            <input
                                type="email"
                                id="from_email"
                                name="from_email"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Your message..."
                                required
                            />
                        </div>

                        <button type="submit" className="contact-submit-btn" disabled={sending}>
                            {sending ? (
                                'Sending...'
                            ) : (
                                <>
                                    <FaPaperPlane className="btn-icon" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>

                    <div className="contact-divider">
                        <span>or</span>
                    </div>

                    <button
                        type="button"
                        className="contact-email-btn"
                        onClick={copyEmail}
                    >
                        {copied ? (
                            <>
                                <FaCheck className="btn-icon" />
                                Email Copied!
                            </>
                        ) : (
                            <>
                                <FaCopy className="btn-icon" />
                                Copy Email Address
                            </>
                        )}
                    </button>

                    <div className="contact-meta">
                        <span className="contact-location">
                            <FaMapMarkerAlt className="meta-icon" />
                            Munich, Germany
                        </span>
                    </div>

                    <div className="contact-socials">
                        <a
                            href="https://github.com/Oussemamri"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="social-link"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://linkedin.com/in/oussema-amri"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="social-link"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;