import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/RegisterModal.css';

const RegisterModal = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    branch: '',
    reason: ''
  });
  
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Please fill out this field.';
      if (!formData.email.trim()) {
        newErrors.email = 'Please fill out this field.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Please fill out this field.';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number.';
      }
    } else if (stepNumber === 2) {
      if (!formData.college.trim()) newErrors.college = 'Please fill out this field.';
      if (!formData.year) newErrors.year = 'Please select your year of study.';
      if (!formData.branch.trim()) newErrors.branch = 'Please fill out this field.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(step)) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1500);
    }
  };

  const handleModalClick = (e) => {
    // Only close if clicking the overlay, not the modal content
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleModalClick}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>Register for {event?.title}</h2>
          {!submitted && (
            <div className="step-indicator">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
              <div className="step-line"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
              <div className="step-line"></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
            </div>
          )}
        </div>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
                
                <div className="form-buttons">
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="college">College Name</label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className={errors.college ? 'error' : ''}
                  />
                  {errors.college && <div className="error-message">{errors.college}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="year">Year of Study</label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className={errors.year ? 'error' : ''}
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.year && <div className="error-message">{errors.year}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="branch">Branch</label>
                  <input
                    type="text"
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className={errors.branch ? 'error' : ''}
                  />
                  {errors.branch && <div className="error-message">{errors.branch}</div>}
                </div>
                
                <div className="form-buttons">
                  <button type="button" className="btn btn-outline" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="reason">Why do you want to join this event?</label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="5"
                    value={formData.reason}
                    onChange={handleChange}
                    className={errors.reason ? 'error' : ''}
                  ></textarea>
                  {errors.reason && <div className="error-message">{errors.reason}</div>}
                </div>
                
                <div className="event-details-summary">
                  <h3>Event Details</h3>
                  <p><strong>Date:</strong> {event?.date}</p>
                  <p><strong>Time:</strong> {event?.time}</p>
                  <p><strong>Location:</strong> {event?.location}</p>
                </div>
                
                <div className="form-buttons">
                  <button type="button" className="btn btn-outline" onClick={prevStep}>
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className={`btn btn-primary ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h3>Registration Successful!</h3>
            <p>Thank you for registering for {event?.title}. We've sent a confirmation email to {formData.email} with all the details.</p>
            <p>We look forward to seeing you at the event!</p>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterModal;