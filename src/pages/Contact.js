import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { submitContactForm } from '../services/api';
import '../assets/styles/components/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Using toast.promise for better handling
    toast.promise(
      submitContactForm(formData),
      {
        loading: 'Sending your message...',
        success: () => {
          // Reset form on success
          setFormData({
            name: '',
            email: '',
            message: ''
          });
          return 'Your message has been sent successfully!';
        },
        error: (err) => `${err.message || 'Failed to send message. Please try again later.'}`
      }
    )
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-description">
          Feel free to reach out if you want to collaborate, have questions, or just want to say hello!
        </p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
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
              placeholder="Your Email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <a href="mailto:contact@oussemaamri.com">contact@oussemaamri.com</a>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>New York, NY</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;