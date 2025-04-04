import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isPayPalReady, setIsPayPalReady] = useState(false);
  const fullPaymentFormRef = useRef(null);

  // Extract first/last name (simple split)
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || ''; // Handle names with multiple parts

  // --- Airtable Submission Logic ---
  const handleAirtableSubmit = async (paymentType) => {
    if (!name || !email) {
      setError('Please enter both your name and email.');
      return false; // Indicate failure
    }
    setError('');
    setSubmitting(true); // Indicate submission start
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, paymentType }),
      });

      if (res.ok) {
        // Don't set submitting false here for full payment, let PayPal redirect handle it
        if (paymentType !== 'full') {
            setSubmitting(false);
        }
        return true; // Indicate success
      } else {
        const errorData = await res.json();
        setError(`Submission failed: ${errorData.error || 'Please try again.'}`);
        setSubmitting(false);
        return false; // Indicate failure
      }
    } catch (err) {
      console.error('Airtable submission error:', err);
      setError('An error occurred submitting to Airtable. Please try again.');
      setSubmitting(false);
      return false; // Indicate failure
    }
  };

  // --- PayPal Full Payment Logic ---
  const handleFullPaymentSubmit = async () => {
    const airtableSuccess = await handleAirtableSubmit('full');
    if (airtableSuccess && fullPaymentFormRef.current) {
      // Programmatically submit the hidden PayPal form
      // No need to setSubmitting(false) here as the form submission navigates away
      fullPaymentFormRef.current.submit();
    } else {
        // If Airtable fails, ensure submitting state is reset
        setSubmitting(false);
    }
  };

  // --- PayPal Subscription Button Rendering ---
  useEffect(() => {
    // Ensure PayPal object exists
    if (!window.paypal) {
        console.log("PayPal SDK not loaded yet.");
        return;
    }

    // Clear previous button instance if name/email changes or SDK reloads
    const buttonContainer = document.getElementById('paypal-button-container-P-1KV150647P276913SM7SBDSI');
    if (buttonContainer) {
        buttonContainer.innerHTML = ''; // Clear previous button
    }

    // Only render if SDK is ready AND name/email are filled
    if (isPayPalReady && name && email) {
      setSubmitting(true); // Indicate loading state for PayPal button render
      try {
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'blue',
            layout: 'horizontal',
            label: 'subscribe', // Changed label to 'subscribe'
            tagline: false // Keep UI clean
          },
          createSubscription: function(data, actions) {
            // Airtable submission now happens in onApprove
            console.log("Creating subscription for:", email);
            return actions.subscription.create({
              plan_id: 'P-1KV150647P276913SM7SBDSI',
              subscriber: {
                name: {
                  given_name: firstName,
                  surname: lastName
                },
                email_address: email
              },
              application_context: {
                shipping_preference: 'NO_SHIPPING' // Important for digital goods
              }
            });
          },
          onApprove: async function(data, actions) {
            console.log("Subscription approved:", data.subscriptionID);
            // IMPORTANT: Submit to Airtable *after* PayPal approval
            setSubmitting(true); // Show submitting state during Airtable call
            const airtableSuccess = await handleAirtableSubmit('subscription'); // Use 'subscription' type

            if (airtableSuccess) {
              alert(`Subscription successful! Your Subscription ID is: ${data.subscriptionID}`);
              // Optional: Redirect to a thank you page
              // window.location.href = '/thank-you';
            } else {
              // Handle Airtable submission failure after successful PayPal payment
              alert('Your PayPal subscription was successful, but there was an issue recording your details. Please contact support with Subscription ID: ' + data.subscriptionID);
            }
            setSubmitting(false); // Reset submitting state after everything
          },
          onError: function(err) {
            console.error('PayPal Subscription Error:', err);
            setError('An error occurred with the PayPal subscription. Please try again or contact support.');
            setSubmitting(false); // Reset submitting state on error
          },
          onCancel: function(data) {
            console.log('PayPal Subscription Cancelled:', data);
            setError(''); // Clear any previous errors
            setSubmitting(false); // Reset submitting state on cancel
          }
        }).render('#paypal-button-container-P-1KV150647P276913SM7SBDSI')
          .then(() => {
            setSubmitting(false); // PayPal button finished rendering
          })
          .catch((err) => {
            console.error("Failed to render PayPal button:", err);
            setError("Failed to load PayPal button. Please refresh the page.");
            setSubmitting(false);
          });
      } catch (error) {
          console.error("Error initializing PayPal button:", error);
          setError("Failed to initialize PayPal button. Please refresh the page.");
          setSubmitting(false);
      }
    } else {
        // If name/email are cleared, ensure submitting state is false
        setSubmitting(false);
    }
  // Rerun effect if PayPal SDK loads OR name/email changes
  }, [isPayPalReady, name, email, firstName, lastName]); // Add dependencies


  return (
    <div className="container">
       {/* PayPal SDK Script */}
       <Script
        src="https://www.paypal.com/sdk/js?client-id=AfW266PsMRU8XV1q-iOfErkQ5jk12kP2Nc53MsWkNTeKo-RHbtASzUN-EgQYXg4wAs-TXC0xwinZRIYb&vault=true&intent=subscription"
        data-sdk-integration-source="button-factory"
        strategy="beforeInteractive" // Load SDK sooner
        onLoad={() => {
            console.log("PayPal SDK Loaded");
            setIsPayPalReady(true);
        }}
        onError={(e) => {
            console.error("PayPal SDK failed to load:", e);
            setError("Failed to load PayPal checkout. Please refresh the page.");
        }}
      />

      {/* Hero Section */}
      <header className="hero">
        <img src="/logo.png" alt="Building Happy People with AI" className="logo" />
        <h1>Understanding AI: Empower Your Business & Life</h1>
        <p>
          3 Live Sessions to Master AI Prompting, Automation, and the Agentic Era—No Coding Required.
        </p>
      </header>

      {/* Who Is This Course For */}
      <section className="info">
        <h2>Who is this course for?</h2>
        <p>
          Designed for solopreneurs and individuals just getting started with AI, this course delivers practical tips and hacks you can use immediately.
        </p>
      </section>

      {/* Course Breakdown */}
      <section className="sessions">
        <h2>Course Breakdown</h2>
        <div className="session">
          <h3>Session 1: Speak AI—Mastering the Art of Prompt Engineering</h3>
          <p>
            Learn the fundamentals of prompt engineering and a powerful framework to create long-form content, viral posts, image prompts, and even AI-driven applications.
          </p>
        </div>
        <div className="session">
          <h3>Session 2: AI Time Savers—Automations That Multiply Your Productivity</h3>
          <p>
            Discover how to use AI-enabled tools to reclaim your time by automating content sharing, building webpages, dashboards, and integrating AI in your development environment.
          </p>
        </div>
        <div className="session">
          <h3>Session 3: The Agentic Era—Harnessing the Power of AI Agents</h3>
          <p>
            Understand the transformative power of AI agents and learn how to build an AI for your business or as a personal assistant. Get hands-on techniques for leveraging AI assistants for advanced tasks and decision-making.
          </p>
        </div>
      </section>

      {/* Sign Up / Payment Section */}
      <section className="signup">
        <h2>Sign Up for the Course</h2>
        {/* Form only collects data, submission handled by PayPal buttons */}
        <div> {/* Changed form to div to avoid nested forms */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting} // Disable input while submitting
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting} // Disable input while submitting
          />
          {error && <p className="error">{error}</p>}
          <div className="buttons">
            {/* Pay in Full Button (Hidden Form) */}
            <form
              ref={fullPaymentFormRef}
              action="https://www.paypal.com/ncp/payment/S9YYCL6MYJED4" // Use the correct link for full payment
              method="post"
              target="_blank"
              style={{ display: 'inline-block', flex: 1 }} // Keep form inline but button controls layout
            >
              {/* Hidden fields for PayPal */}
              {/* Note: PayPal standard buttons might not support pre-filling name this way. */}
              {/* The subscription button handles pre-filling via the JS SDK. */}
              {/* Passing name/email via custom field for potential tracking */}
              <input type="hidden" name="custom" value={JSON.stringify({ name, email })} />

              {/* This button triggers the Airtable submission first */}
              <button
                type="button"
                onClick={handleFullPaymentSubmit}
                disabled={submitting || !name || !email} // Disable if submitting or fields empty
                className="paypal-button-style" // Add a class for styling
              >
                {submitting && name && email && <span className="spinner"></span>} {/* Basic Spinner only when relevant */}
                Pay in Full (Discounted)
              </button>
            </form>

            {/* Subscription Button Container */}
            <div id="paypal-button-container-P-1KV150647P276913SM7SBDSI" style={{ flex: 1, minWidth: '200px', textAlign: 'center' }}>
              {/* Button renders here via JS SDK */}
              {/* Show placeholder/message */}
              {(!name || !email) && <p className="placeholder-text">Please enter name and email to pay.</p>}
              {(name && email && !isPayPalReady) && <p className="placeholder-text">Loading PayPal...</p>}
              {(name && email && isPayPalReady && submitting) && <p className="placeholder-text">Processing...</p>}
              {/* The PayPal button itself will render here if conditions met */}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Building Happy People with AI</p>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .container {
          max-width: 960px;
          margin: 0 auto;
          padding: 20px;
          font-family: sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .hero {
          text-align: center;
          padding: 50px 20px;
          background: #f0f4f8;
          border-radius: 8px;
        }
        .logo {
          max-width: 120px;
          margin-bottom: 20px;
        }
        .info, .sessions, .signup {
          margin: 40px 0;
        }
        .session {
          margin-bottom: 20px;
          padding: 20px;
          background: #fafafa;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        input {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box; /* Include padding and border in element's total width and height */
        }
        .buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
          align-items: start; /* Align items to the top */
          min-height: 50px; /* Ensure container has height for placeholders */
        }
        /* Style for the custom 'Pay in Full' button */
        .paypal-button-style {
          flex: 1; /* Allow button to grow */
          padding: 12px;
          border: none;
          border-radius: 4px;
          background: #0070f3; /* Example color */
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
          width: 100%; /* Make button take full width of its container */
          min-height: 44px; /* Match typical PayPal button height */
          box-sizing: border-box;
        }
        .paypal-button-style:hover:not(:disabled) {
          background: #005bb5;
        }
        .paypal-button-style:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .error {
          color: red;
          margin-top: 10px;
          text-align: center;
        }
        .placeholder-text {
            text-align: center;
            margin-top: 10px;
            color: #555;
            font-size: 0.9em;
            min-height: 44px; /* Match button height */
            display: flex;
            align-items: center;
            justify-content: center;
        }
        footer {
          text-align: center;
          margin-top: 40px;
          color: #666;
        }
        /* Basic Spinner */
        .spinner {
          border: 2px solid #f3f3f3; /* Light grey */
          border-top: 2px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 1em;
          height: 1em;
          animation: spin 1s linear infinite;
          display: inline-block;
          margin-right: 5px;
          vertical-align: middle;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .buttons {
            flex-direction: column;
          }
          .paypal-button-style {
             min-width: unset; /* Allow button to shrink */
          }
          #paypal-button-container-P-1KV150647P276913SM7SBDSI {
             min-width: unset;
          }
        }
      `}</style>
    </div>
  );
}
