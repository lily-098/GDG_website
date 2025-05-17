import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { Mail, MessageSquare, Send, Users, MapPin, Check } from "lucide-react";
import styled, { keyframes } from "styled-components";

// Keyframes for spinner animation
const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

// Container
export const Contact = styled.section`
  padding: 5rem 1rem;
  background-color: white;
  color: #111;
  overflow: hidden;
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

// Header
export const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .underline {
    width: 80px;
    height: 4px;
    background-color: #3b82f6;
    margin: 0.75rem auto 1.5rem;
    border-radius: 2px;
  }

  p {
    font-size: 1.125rem;
    color: #4b5563;
    max-width: 600px;
    margin: 0 auto;
  }
`;

// Grid
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Contact Info
export const ContactInfo = styled.div`
  .info-card {
    background-color: #f9fafb;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    height: 100%;
  }

  h3 {
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #111827;
  }

  .info-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    color: #374151;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover h4 {
      color: #3b82f6;
    }

    .icon-bg {
      margin-top: 0.25rem;
      padding: 0.5rem;
      background-color: #bfdbfe;
      border-radius: 0.75rem;
      color: #3b82f6;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: #3b82f6;
        color: white;
      }
    }

    h4 {
      margin: 0;
      font-weight: 600;
      color: #111827;
      transition: color 0.3s ease;
    }

    p {
      margin: 0.25rem 0 0;
      color: #6b7280;
    }
  }
`;

// Quick Response
export const QuickResponse = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #dbeafe;
  border-radius: 0.75rem;
  border: 1px solid #bfdbfe;
  color: #1e40af;

  h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    font-size: 0.875rem;
    color: #374151;
  }
`;

// Contact Form
export const ContactForm = styled.div`
  form {
    background-color: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;

    h3 {
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #111827;
    }
  }
`;

// Form Inputs
export const Row = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #4b5563;
  }

  input,
  textarea {
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid #d1d5db;
    font-size: 1rem;
    color: #111827;
    background-color: white;
    resize: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }

    &:disabled {
      background-color: #f3f4f6;
      cursor: not-allowed;
      color: #9ca3af;
    }
  }
`;

// Form Footer
export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  .btn-submit {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 1rem;
    border: none;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s ease, transform 0.15s ease;

    &:hover:not(.disabled) {
      background-color: #2563eb;
    }

    &:active:not(.disabled) {
      transform: scale(0.95);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

// Spinner
export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
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
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      content: "gdg.mmmut@gmail.com",
      link: "mailto:gdg.mmmut@gmail.com",
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      content: "MMMUT, Gorakhpur, Uttar Pradesh, India",
      link: "https://maps.google.com/?q=MMMUT+Gorakhpur",
    },
    {
      icon: <Users size={24} />,
      title: "Join Community",
      content: "Google Developers Group",
      link: "https://gdg.community.dev/",
    },
  ];

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Contact id="contact" ref={sectionRef}>
      <Container>
        {/* Header */}
        <Header>
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
            Have questions about GDG MMMUT or interested in collaborating? We'd
            love to hear from you! Reach out to us through any of the channels
            below.
          </motion.p>
        </Header>

        {/* Grid */}
        <Grid>
          {/* Contact Info */}
          <ContactInfo>
            <div className="info-card">
              <h3>Contact Information</h3>
              <div className="info-list">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-item"
                  >
                    <div className="icon-bg">{item.icon}</div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                    </div>
                  </a>
                ))}
              </div>
              <QuickResponse>
                <h4>
                  <MessageSquare size={18} /> Quick Response
                </h4>
                <p>
                  We typically respond to inquiries within 24-48 hours. For
                  urgent matters, please contact us directly via email.
                </p>
              </QuickResponse>
            </div>
          </ContactInfo>

          {/* Contact Form */}
          <ContactForm>
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3>Send Us a Message</h3>
              <Row>
                <InputGroup>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    disabled={formStatus === "submitting"}
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    disabled={formStatus === "submitting"}
                  />
                </InputGroup>
              </Row>
              <Row>
                <InputGroup>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    placeholder="Your Subject"
                    disabled={formStatus === "submitting"}
                  />
                </InputGroup>
              </Row>
              <InputGroup>
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  disabled={formStatus === "submitting"}
                ></textarea>
              </InputGroup>
              <FormFooter>
                <button
                  type="submit"
                  className={`btn-submit ${
                    formStatus === "submitting" ? "disabled" : ""
                  }`}
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting" && <Spinner />}
                  {formStatus === "success" ? (
                    <>
                      <Check size={18} /> Sent!
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </FormFooter>
            </motion.form>
          </ContactForm>
        </Grid>
      </Container>
    </Contact>
  );
};

export default ContactSection;
