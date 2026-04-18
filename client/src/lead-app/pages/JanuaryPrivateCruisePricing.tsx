import { JanuaryPrivateCruisePricingCalculator } from "@/lead-app/components/pricing/JanuaryPrivateCruisePricingCalculator";
import { XolaBookingWidget } from "@/lead-app/components/quote-builder/XolaBookingWidget";
import { StickyPricingNav } from "@/lead-app/components/pricing/StickyPricingNav";
import { ResponsivePresentationEmbed } from "@/lead-app/components/pricing/ResponsivePresentationEmbed";

const JanuaryPrivateCruisePricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyPricingNav showPresentation={true} />
      
      <div id="calculator-section" className="p-4">
        <JanuaryPrivateCruisePricingCalculator />
      </div>
      
      <div id="presentation-section">
        <ResponsivePresentationEmbed 
          embedUrl="https://gamma.app/embed/f9rb5w54osk1kro"
          linkUrl="https://gamma.app/docs/f9rb5w54osk1kro"
          title="ATX Private Cruise Options Presentation"
        />
      </div>
      
      <div id="booking-section" className="p-4 max-w-4xl mx-auto">
        <XolaBookingWidget />
      </div>
    </div>
  );
};

export default JanuaryPrivateCruisePricing;