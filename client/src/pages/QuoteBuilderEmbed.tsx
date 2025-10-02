import { Helmet } from 'react-helmet-async';

export default function QuoteBuilderEmbed() {
  return (
    <>
      <Helmet>
        <title>Get a Quote - Premier Party Cruises</title>
        <meta name="description" content="Get an instant quote for your private party cruise or disco cruise on Lake Travis. Book Day Tripper, Meeseeks, The Irony, Clever Girl, or ATX Disco boats." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Get Your Quote in Minutes
            </h1>
            <p className="text-lg text-blue-100">
              Select your date, boat, and party details to receive an instant quote for your Lake Travis adventure
            </p>
          </div>
        </div>

        {/* Full-Width Iframe Container */}
        <div className="flex-1 w-full">
          <iframe 
            src="https://ca5498b2-d709-4ed6-b336-83205a3bd76f.lovableproject.com/quote-widget" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{ 
              border: 'none', 
              minHeight: '1200px',
              display: 'block'
            }}
            title="Quote Builder"
            data-testid="iframe-quote-builder"
          />
        </div>
      </div>
    </>
  );
}
