import React, { useState } from 'react';
import Button from './common/Button';
import '../assets/styles/components/contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({
            name: '',
            email: '',
            message: ''
        });
        alert('Thank you for your message! I will get back to you soon.');
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
                        <button type="submit" className="btn primary">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;