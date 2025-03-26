import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import Button from './common/Button';
import '../assets/styles/components/contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ submitted: false, error: null });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await submitContactForm(formData);
            setStatus({ submitted: true, error: null });
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            setStatus({ submitted: false, error: error.message || 'Something went wrong' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <h2>Contact Me</h2>
            
            <div className="contact-container">
                <div className="contact-info">
                    <h3>Get In Touch</h3>
                    <p>I'm currently looking for Software Developer opportunities. Feel free to reach out!</p>
                    
                    <div className="contact-details">
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:o.amri@stud.fh-sm.de">o.amri@stud.fh-sm.de</a>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <a href="tel:+4915510357723">(+49) 15510 357723</a>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Meiningen, Germany</span>
                        </div>
                        <div className="social-links">
                            <a href="https://github.com/Oussemamri" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://linkedin.com/in/oussema-amri" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="contact-form">
                    {status.submitted ? (
                        <div className="success-message">
                            Thank you for your message! I'll get back to you soon.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn primary" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                            {status.error && <div className="error-message">{status.error}</div>}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;