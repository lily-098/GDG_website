import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Mail, MessageSquare, Send, Users, MapPin, Check } from 'lucide-react';
import './ContactSection.css'; // Assuming you put the styles here

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle');

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView && formRef.current) {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [isInView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      content: "gdg.mmmut@gmail.com",
      link: "mailto:gdg.mmmut@gmail.com"
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      content: "MMMUT, Gorakhpur, Uttar Pradesh, India",
      link: "https://maps.google.com/?q=MMMUT+Gorakhpur"
    },
    {
      icon: <Users size={24} />,
      title: "Join Community",
      content: "Google Developers Group",
      link: "https://gdg.community.dev/"
    }
  ];

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="container">
        <div className="header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h2>
          <div className="underline"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have questions about GDG MMMUT or interested in collaborating? We'd love to hear from you! Reach out to us through any of the channels below.
          </motion.p>
        </div>

        <div className="grid">
          <motion.div 
            className="contact-info"
            variants={infoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="info-card">
              <h3>Contact Information</h3>
              <div className="info-list">
                {contactInfo.map(item => (
                  <motion.a
                    key={item.title}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-item"
                    variants={itemVariants}
                  >
                    <div className="icon-bg">
                      {item.icon}
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="quick-response">
                <h4><MessageSquare size={18} /> Quick Response</h4>
                <p>We typically respond to inquiries within 24-48 hours. For urgent matters, please contact us directly via email.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form ref={formRef} onSubmit={handleSubmit}>
              <h3>Send Us a Message</h3>
              <div className="row">
                <div className="input-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    disabled={formStatus === 'submitting'}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    disabled={formStatus === 'submitting'}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  disabled={formStatus === 'submitting'}
                />
              </div>

              <div className="input-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us how we can assist you..."
                  disabled={formStatus === 'submitting'}
                ></textarea>
              </div>

              <div className="form-footer">
                <motion.button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  whileHover={formStatus !== 'submitting' ? { scale: 1.05 } : {}}
                  whileTap={formStatus !== 'submitting' ? { scale: 0.95 } : {}}
                  className={`btn-submit ${formStatus === 'submitting' ? 'disabled' : ''}`}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg
                        className="spinner"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="spinner-bg"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="spinner-fg"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <Check size={20} className="icon" />
                      Sent
                    </>
                  ) : (
                    <>
                      <Send size={20} className="icon" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
