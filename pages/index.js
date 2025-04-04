import { useState, useRef, useCallback } from 'react';
import Script from 'next/script';
import {
  HeroSection,
  TargetAudienceSection,
  CourseBreakdownSection,
  IncludedItemsSection,
  WhyLearnSection,
  PricingSection,
  TestimonialsSection,
  Footer
} from '../components/sections';
import { usePayPalIntegration } from '../hooks/usePayPalIntegration';
import { useFormSubmission } from '../hooks/useFormSubmission';

// Constants
const PAYPAL_PLAN_ID = 'P-1KV150647P276913SM7SBDSI';
const PAYPAL_CLIENT_ID =
  'AfW266PsMRU8XV1q-iOfErkQ5jk12kP2Nc53MsWkNTeKo-RHbtASzUN-EgQYXg4wAs-TXC0xwinZRIYb';

export default function Home() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const fullPaymentFormRef = useRef(null);

  // Custom hooks for form and payment handling
  const { error, submitting, handleAirtableSubmit } = useFormSubmission();

  const {
    isPayPalReady,
    setIsPayPalReady,
    handleFullPaymentSubmit
  } = usePayPalIntegration({
    name,
    email,
    fullPaymentFormRef,
    handleAirtableSubmit,
    planId: PAYPAL_PLAN_ID
  });

  // Optimized scroll function using useCallback
  const scrollToPricing = useCallback(() => {
    document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* PayPal SDK Script */}
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`}
        data-sdk-integration-source="button-factory"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('PayPal SDK Loaded');
          setIsPayPalReady(true);
        }}
        onError={(e) => {
          console.error('PayPal SDK failed to load:', e);
          // Optionally, handle error state here\n        }}\n      />\n\n      {/* Render modular sections instead of inline markup */}\n      <HeroSection scrollToPricing={scrollToPricing} />\n      <TargetAudienceSection />\n      <CourseBreakdownSection />\n      <IncludedItemsSection />\n      <WhyLearnSection />\n      <PricingSection\n        name={name}\n        email={email}\n        setName={setName}\n        setEmail={setEmail}\n        error={error}\n        submitting={submitting}\n        isPayPalReady={isPayPalReady}\n        fullPaymentFormRef={fullPaymentFormRef}\n        handleFullPaymentSubmit={handleFullPaymentSubmit}\n      />\n      <TestimonialsSection />\n      <Footer />\n    </div>\n  );\n}\n```\n\n### Key Updates\n\n1. **Modular Components:** Instead of embedding all the HTML directly in this file, the landing page is now composed of modular components (like `HeroSection`, `TargetAudienceSection`, etc.) which are imported from your components folder. This improves readability and maintainability.\n\n2. **Optimized Scroll Function:** The `scrollToPricing` function is now wrapped in `useCallback` to prevent unnecessary re-creations during re-renders.\n\n3. **Retained Integrations:** Both Airtable and PayPal integrations are still active. The code continues to use the `useFormSubmission` and `usePayPalIntegration` hooks as before, ensuring that your data submission and payment handling logic remain intact.\n\nFeel free to modify the modular components if you need further customization."