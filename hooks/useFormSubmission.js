import { useState } from 'react';

/**
 * Custom hook to handle form submission to Airtable
 * @returns {Object} Form submission state and handlers
 */
export const useFormSubmission = () => {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  /**
   * Submit form data to Airtable
   * @param {string} name - User's full name
   * @param {string} email - User's email address
   * @param {string} paymentType - Type of payment ('full' or 'subscription')
   * @returns {Promise<boolean>} Success status of the submission
   */
  const handleAirtableSubmit = async (name, email, paymentType) => {
    // Validate inputs
    if (!name || !email) {
      setError('Please enter both your name and email.');
      return false;
    }
    
    setError('');
    setSubmitting(true);
    
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, paymentType }),
      });

      if (res.ok) {
        // Don't set submitting false for full payment, let PayPal redirect handle it
        if (paymentType !== 'full') {
          setSubmitting(false);
        }
        return true;
      } else {
        const errorData = await res.json();
        setError(`Submission failed: ${errorData.error || 'Please try again.'}`);
        setSubmitting(false);
        return false;
      }
    } catch (err) {
      console.error('Airtable submission error:', err);
      setError('An error occurred submitting to Airtable. Please try again.');
      setSubmitting(false);
      return false;
    }
  };

  return {
    error,
    setError,
    submitting,
    setSubmitting,
    handleAirtableSubmit
  };
};
