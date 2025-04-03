import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import { showSuccessToast, showErrorToast, showLoadingToast, updateToast } from '../utils/toast';
import '../assets/styles/components/contact.css';
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
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
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            showErrorToast('Please fill out all fields');
            return;
        }
        
        setLoading(true);
        
        // Show a loading toast and get its ID
        const toastId = showLoadingToast('Sending your message...');
        
        try {
            await submitContactForm(formData);
            console.log('Form submitted successfully');
            // Update the toast to success
            updateToast(toastId, {
                render: 'Message sent successfully!',
                type: 'success',
                isLoading: false,
                autoClose: 5000
            });
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            // Update the toast to error
            updateToast(toastId, {
                render: error.message || 'Failed to send message',
                type: 'error',
                isLoading: false,
                autoClose: 5000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-description">
                    I'm always open to new opportunities and collaborations. Feel free to reach out!
                </p>
                
                <div className="contact-container">
                    <div className="contact-info">
                        <h3>Let's Talk</h3>
                        <p>I'm currently available for freelance work and full-time positions. If you have a project that needs coding or a position to fill, contact me!</p>
                        
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
                                <a href="https://twitter.com/OussemaAmri" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
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
                                    placeholder="Your email address"
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
                                    placeholder="Your message"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn primary" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'} <FaPaperPlane style={{ marginLeft: '8px' }} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;