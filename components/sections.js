import React from 'react';

/**
 * Hero section component
 * @param {Object} props - Component props
 * @param {Function} props.scrollToPricing - Function to scroll to pricing section
 */
export const HeroSection = ({ scrollToPricing }) => (
  <header className="py-16 bg-gradient-to-r from-blue-100 to-indigo-100">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Understanding AI: Empower Your Business & Life With Practical Tools</h1>
        <p className="text-xl mb-6">3 Live Sessions to Master Prompting, Automation, and the Next Era of AI—No Coding Required.</p>
        <button
          onClick={scrollToPricing}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
          Reserve My Spot
        </button>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img src="/aiteachingdrawiing.png" alt="AI teaching drawing" className="w-64 h-64 object-cover rounded-lg shadow-md" />
      </div>
    </div>
  </header>
);

/**
 * Target audience section component
 */
export const TargetAudienceSection = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Who Is This Course For?</h2>
      <p className="text-lg mb-8 max-w-3xl mx-auto text-center">
        This course is designed for solopreneurs, small business owners, and individuals eager to harness AI's power—without needing deep technical expertise. If you want to save time, generate fresh ideas, and gain a competitive edge, you're in the right place.
      </p>
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Benefits:</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Instantly create on-brand content with minimal effort</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Automate repetitive tasks and reclaim hours each week</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Build landing pages, dashboards, and more—no coding needed</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Stay ahead in the new era of AI agents</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

/**
 * Course session component
 * @param {Object} props - Component props
 * @param {string} props.title - Session title
 * @param {Array} props.learningPoints - Array of learning points
 */
const CourseSession = ({ title, learningPoints }) => (
  <div className="max-w-4xl mx-auto mb-12 bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-bold mb-4 text-blue-600">{title}</h3>
    <p className="text-lg mb-4">What You'll Learn:</p>
    <ul className="space-y-2 mb-4">
      {learningPoints.map((point, index) => (
        <li key={index} className="flex items-start">
          <svg className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Course breakdown section component
 */
export const CourseBreakdownSection = () => {
  const sessions = [
    {
      title: 'Session 1: "Speak AI—Mastering the Art of Prompt Engineering"',
      learningPoints: [
        'The fundamentals of prompt engineering across various AI models',
        'A simple yet powerful Prompting Framework for creating images, long-form content, short viral posts, and even AI-driven applications',
        'Insider hacks to get the best results from tools like ChatGPT, Midjourney, and more'
      ]
    },
    {
      title: 'Session 2: "AI Time Savers—Automations That Multiply Your Productivity"',
      learningPoints: [
        'How to use AI-enabled tools to free up hours in your week',
        'Step-by-step automations for sharing content using Make',
        'Building webpages, landing pages, and dashboards with low-code/no-code platforms',
        'Integrating AI in VS Code and other dev environments—no coding skills required'
      ]
    },
    {
      title: 'Session 3: "The Agentic Era—Harnessing the Power of AI Agents"',
      learningPoints: [
        'What AI agents are and why they're transforming the future of work',
        'How to leverage AI assistants for advanced tasks and decision-making',
        'Real-world use cases to apply agent-based AI in your business or personal projects'
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Course Breakdown</h2>
        {sessions.map((session, index) => (
          <CourseSession 
            key={index}
            title={session.title}
            learningPoints={session.learningPoints}
          />
        ))}
      </div>
    </section>
  );
};

/**
 * Included items feature component
 * @param {Object} props - Component props
 * @param {string} props.title - Feature title
 * @param {string} props.icon - SVG icon path
 * @param {Array} props.items - Array of feature items
 */
const IncludedFeature = ({ title, icon, items }) => (
  <div className="bg-blue-50 p-6 rounded-lg">
    <h3 className="text-xl font-bold mb-4 flex items-center">
      <svg className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}></path>
      </svg>
      {title}
    </h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

/**
 * Included items section component
 */
export const IncludedItemsSection = () => {
  const features = [
    {
      title: 'Live Sessions + Recordings',
      icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      items: [
        '3 Live, 1-Hour Sessions (interactive with Q&A)',
        'Lifetime Access to Recordings'
      ]
    },
    {
      title: 'Downloadable Prompt Frameworks',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      items: [
        'Templates for long-form articles, short viral posts, and image prompts',
        'How-to guides for setting up NotebookLM, Custom GPTs, and OpenAI Assistants',
        'Ready-to-use system rules for AI Cone Assistants'
      ]
    },
    {
      title: 'Access to Free AI Tools',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37',
      items: [
        'A curated list of free AI resources',
        'Step-by-step guides on implementation'
      ]
    },
    {
      title: 'Community Support',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      items: [
        'Access to a private group',
        'Ask questions, share successes, and collaborate'
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">What's Included</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <IncludedFeature 
              key={index}
              title={feature.title}
              icon={feature.icon}
              items={feature.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Reason component for Why Learn section
 * @param {Object} props - Component props
 * @param {string} props.title - Reason title
 * @param {string} props.description - Reason description
 * @param {string} props.icon - SVG icon path
 */
const Reason = ({ title, description, icon }) => (
  <div className="flex">
    <div className="mr-4 text-blue-500 flex-shrink-0">
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}></path>
      </svg>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

/**
 * Why Learn section component
 */
export const WhyLearnSection = () => {
  const reasons = [
    {
      title: 'Expert-Led',
      description: 'You're getting hands-on guidance from an AI & Automation Agency that helps real clients implement AI solutions.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    },
    {
      title: 'Action-Oriented',
      description: 'Everything you learn can be applied immediately to streamline tasks and enhance productivity.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    {
      title: 'Proven Frameworks',
      description: 'You'll get the exact prompts, templates, and workflows normally reserved for high-level clients.',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
    },
    {
      title: 'Friendly & Approachable',
      description: 'No confusing tech jargon—just simple, practical steps anyone can follow.',
      icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Learn from Building Happy People with AI?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <Reason 
              key={index}
              title={reason.title}
              description={reason.description}
              icon={reason.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Pricing section component
 * @param {Object} props - Component props
 * @param {string} props.name - User's name
 * @param {string} props.email - User's email
 * @param {Function} props.setName - Function to update name
 * @param {Function} props.setEmail - Function to update email
 * @param {string} props.error - Error message
 * @param {boolean} props.submitting - Submission status
 * @param {boolean} props.isPayPalReady - PayPal ready status
 * @param {Function} props.handleFullPaymentSubmit - Function to handle full payment
 * @param {Object} props.fullPaymentFormRef - Reference to full payment form
 * @param {string} props.planId - PayPal plan ID
 */
export const PricingSection = ({ 
  name, 
  email, 
  setName, 
  setEmail, 
  error, 
  submitting, 
  isPayPalReady, 
  handleFullPaymentSubmit,
  fullPaymentFormRef,
  planId
}) => (
  <section id="pricing-section" className="py-16 bg-blue-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h2>

      {/* Name and Email Inputs */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
        {/* Payment Plan Option (Subscription) */}
        <div className="bg-white rounded-lg shadow-lg p-8 flex-1 border-2 border-blue-200 flex flex-col">
          <h3 className="text-2xl font-bold text-center mb-2">Payment Plan</h3>
          <p className="text-gray-600 text-center mb-6">Spread your investment</p>

          <div className="text-center mb-6">
            <span className="text-4xl font-bold">$75</span>
            <span className="text-gray-600">/month</span>
          </div>

          <ul className="mb-8 space-y-4">
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>3 monthly payments</span>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Same great benefits</span>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Easier on your budget</span>
            </li>
          </ul>

          {/* Subscription Button Container */}
          <div id={`paypal-button-container-${planId}`} className="mt-auto min-h-[50px]">
            {/* Button renders here via JS SDK */}
            {(!name || !email) && <p className="text-center text-gray-500 text-sm mt-2">Please enter name and email above.</p>}
            {(name && email && !isPayPalReady) && <p className="text-center text-gray-500 text-sm mt-2">Loading PayPal...</p>}
            {(name && email && isPayPalReady && submitting) && <p className="text-center text-gray-500 text-sm mt-2">Processing...</p>}
          </div>
        </div>

        {/* One-Time Payment Option */}
        <div className="bg-white rounded-lg shadow-lg p-8 flex-1 border-2 border-blue-500 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-4 transform rotate-45 translate-x-8 translate-y-4 md:translate-x-10">
            <span className="text-sm font-bold">BEST VALUE</span>
          </div>

          <h3 className="text-2xl font-bold text-center mb-2">One-Time Payment</h3>
          <p className="text-gray-600 text-center mb-6">Save $25 with full payment</p>

          <div className="text-center mb-6">
            <span className="text-4xl font-bold">$200</span>
          </div>

          <ul className="mb-8 space-y-4">
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>One-time payment</span>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Save $25 (11% discount)</span>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Hassle-free single payment</span>
            </li>
          </ul>

          {/* Pay in Full Button (Hidden Form Trigger) */}
          <form
            ref={fullPaymentFormRef}
            action="https://www.paypal.com/ncp/payment/S9YYCL6MYJED4"
            method="post"
            target="_blank"
            className="mt-auto"
          >
            <input type="hidden" name="custom" value={JSON.stringify({ name, email })} />
            <button
              type="button"
              onClick={handleFullPaymentSubmit}
              disabled={submitting || !name || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting && name && email && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Enroll Now - One Payment
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600">100% Satisfaction Guarantee - If you're not happy after the first session, we'll refund your money.</p>
      </div>
    </div>
  </section>
);

/**
 * Testimonial component
 * @param {Object} props - Component props
 * @param {string} props.text - Testimonial text
 * @param {string} props.author - Testimonial author
 */
/**
 * Renders a settings icon SVG path
 */
const SettingsIconPath = () => (
  <>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </>
);

/**
 * Testimonial component
 * @param {Object} props - Component props
 * @param {string} props.text - Testimonial text
 * @param {string} props.author - Testimonial author
 */
const Testimonial = ({ text, author }) => (
  <div className="bg-gray-50 rounded-lg p-5 my-2.5 shadow">
    <div className="flex items-center mb-4">
      <div className="text-yellow-400 flex">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
    <p className="mb-4 italic">"{text}"</p>
    <div className="font-semibold">{author}</div>
  </div>
);

/**
 * Testimonials section component
 */
export const TestimonialsSection = () => {
  const testimonials = [
    {
      text: 'Immediately I was able to use the prompting techniques and build an app.',
      author: '– Alex Johnson, Tech Enthusiast'
    },
    {
      text: 'I saved 10 hours a week using the automation tips I learned here!',
      author: '– John Doe, Small Business Owner'
    },
    {
      text: 'I went from zero AI knowledge to confidently building landing pages with AI.',
      author: '– Jane Smith, Solopreneur'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Students Say</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              text={testimonial.text}
              author={testimonial.author}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Footer component
 */
export const Footer = () => (
  <footer className="text-center py-8 mt-8 border-t border-gray-200">
    <p className="text-gray-600">© {new Date().getFullYear()} Building Happy People with AI</p>
  </footer>
);
