import { useState, useEffect } from 'react';

/**
 * Custom hook to handle PayPal integration
 * @param {Object} props - Hook properties
 * @param {string} props.name - User's full name
 * @param {string} props.email - User's email address
 * @param {Object} props.fullPaymentFormRef - Reference to the full payment form
 * @param {Function} props.handleAirtableSubmit - Function to submit data to Airtable
 * @param {string} props.planId - PayPal subscription plan ID
 * @returns {Object} PayPal integration state and handlers
 */
export const usePayPalIntegration = ({ 
  name, 
  email, 
  fullPaymentFormRef, 
  handleAirtableSubmit,
  planId 
}) => {
  const [isPayPalReady, setIsPayPalReady] = useState(false);
  
  // Extract first/last name for PayPal
  const getNameParts = () => {
    const nameParts = name.trim().split(' ');
    return {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '' // Handle names with multiple parts
    };
  };

  /**
   * Handle full payment submission
   */
  const handleFullPaymentSubmit = async () => {
    const airtableSuccess = await handleAirtableSubmit(name, email, 'full');
    if (airtableSuccess && fullPaymentFormRef.current) {
      // Programmatically submit the hidden PayPal form
      fullPaymentFormRef.current.submit();
    }
  };

  /**
   * Render the PayPal subscription button
   */
  useEffect(() => {
    // Ensure PayPal object exists
    if (!window.paypal) {
      console.log("PayPal SDK not loaded yet.");
      return;
    }

    // Clear previous button instance if name/email changes or SDK reloads
    const buttonContainer = document.getElementById(`paypal-button-container-${planId}`);
    if (buttonContainer) {
      buttonContainer.innerHTML = ''; // Clear previous button
    }

    // Only render if SDK is ready AND name/email are filled
    if (isPayPalReady && name && email) {
      const { firstName, lastName } = getNameParts();
      
      try {
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'blue',
            layout: 'horizontal',
            label: 'subscribe',
            tagline: false
          },
          createSubscription: function(data, actions) {
            console.log("Creating subscription for:", email);
            return actions.subscription.create({
              plan_id: planId,
              subscriber: {
                name: {
                  given_name: firstName,
                  surname: lastName
                },
                email_address: email
              },
              application_context: {
                shipping_preference: 'NO_SHIPPING'
              }
            });
          },
          onApprove: async function(data, actions) {
            console.log("Subscription approved:", data.subscriptionID);
            // Submit to Airtable after PayPal approval
            const airtableSuccess = await handleAirtableSubmit(name, email, 'subscription');

            if (airtableSuccess) {
              alert(`Subscription successful! Your Subscription ID is: ${data.subscriptionID}`);
              // Optional: Redirect to a thank you page
              // window.location.href = '/thank-you';
            } else {
              // Handle Airtable submission failure after successful PayPal payment
              alert('Your PayPal subscription was successful, but there was an issue recording your details. Please contact support with Subscription ID: ' + data.subscriptionID);
            }
          },
          onError: function(err) {
            console.error('PayPal Subscription Error:', err);
          },
          onCancel: function(data) {
            console.log('PayPal Subscription Cancelled:', data);
          }
        }).render(`#paypal-button-container-${planId}`)
          .catch((err) => {
            console.error("Failed to render PayPal button:", err);
          });
      } catch (error) {
        console.error("Error initializing PayPal button:", error);
      }
    }
  }, [isPayPalReady, name, email, planId, handleAirtableSubmit]);

  return {
    isPayPalReady,
    setIsPayPalReady,
    handleFullPaymentSubmit
  };
};
