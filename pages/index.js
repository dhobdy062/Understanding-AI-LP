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
          // Optionally, handle error state here
        }}
      />

      {/* Render modular sections instead of inline markup */}
      <HeroSection scrollToPricing={scrollToPricing} />
      <TargetAudienceSection />
      <CourseBreakdownSection />
      <IncludedItemsSection />
      <WhyLearnSection />
      <PricingSection
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        error={error}
        submitting={submitting}
        isPayPalReady={isPayPalReady}
        fullPaymentFormRef={fullPaymentFormRef}
        handleFullPaymentSubmit={handleFullPaymentSubmit}
      />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}