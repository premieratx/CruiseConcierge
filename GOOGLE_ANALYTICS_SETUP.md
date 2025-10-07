# Google Analytics 4 (GA4) Setup Guide

## Critical Issue from Manus SEO Audit
The website currently has **NO analytics tracking installed**. This means:
- ❌ Cannot measure website traffic
- ❌ Cannot track conversions or bookings
- ❌ Cannot identify traffic sources
- ❌ Cannot measure ROI on marketing
- ❌ Flying blind on all business metrics

## Quick Setup Instructions

### Step 1: Create Google Analytics 4 Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring" or "Admin" → "Create Account"
3. Set up account name: "Premier Party Cruises"
4. Create property: "premierpartycruises.com"
5. Choose "Web" as platform
6. You'll receive a **Measurement ID** like `G-XXXXXXXXXX`

### Step 2: Add GA4 to Website

**Option A: Using Replit Secrets (Recommended)**
1. In your Replit project, go to "Tools" → "Secrets"
2. Add a new secret:
   - Key: `VITE_GA4_MEASUREMENT_ID`
   - Value: Your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`)

**Option B: Direct Environment Variable**
1. Add to `.env` file:
   ```
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Step 3: Implementation Code

The following code should be added to `client/src/components/GoogleAnalytics.tsx`:

```typescript
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function GoogleAnalytics() {
  const [location] = useLocation();
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics not configured - add VITE_GA4_MEASUREMENT_ID to environment');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [GA_MEASUREMENT_ID]);

  // Track page views on route change
  useEffect(() => {
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location,
      });
    }
  }, [location, GA_MEASUREMENT_ID]);

  return null;
}

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
```

### Step 4: Add to App.tsx

Add the GoogleAnalytics component to your main App.tsx:

```typescript
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BookingCacheProvider>
          <EditModeProvider>
            <HelmetProvider>
              <TooltipProvider>
                <GoogleAnalytics />  {/* Add this line */}
                <Toaster />
                <Router />
              </TooltipProvider>
            </HelmetProvider>
          </EditModeProvider>
        </BookingCacheProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
```

## Advanced Tracking (Recommended)

### Track Booking Form Submissions
```typescript
// In your booking form submit handler
window.gtag?.('event', 'booking_form_submit', {
  event_category: 'engagement',
  event_label: 'Quote Builder',
  value: totalPrice
});
```

### Track Phone Clicks
```typescript
// In navigation phone number link
onClick={() => {
  window.gtag?.('event', 'phone_click', {
    event_category: 'engagement',
    event_label: '(512) 488-5892'
  });
}}
```

### Track CTA Button Clicks
```typescript
// In "Book Now" buttons
onClick={() => {
  window.gtag?.('event', 'cta_click', {
    event_category: 'engagement',
    event_label: 'Book Now Button - Homepage'
  });
}}
```

## Additional Tracking to Implement

### 1. Google Search Console
- Verify ownership: [Google Search Console](https://search.google.com/search-console)
- Add verification meta tag to SEOHead component
- Submit sitemap.xml (already exists at /sitemap.xml)

### 2. Facebook Pixel (for retargeting)
```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### 3. Conversion Tracking
Set up goals in GA4 for:
- Quote form completions
- Phone number clicks
- Email clicks
- "Book Now" button clicks
- Checkout completions

### 4. Event Tracking
Track key user interactions:
- Video plays
- Gallery image views
- FAQ expansions
- Price calculator usage
- Social media clicks

## Verification

After setup:
1. Visit your website
2. Check GA4 real-time reports: Analytics → Reports → Realtime
3. You should see your visit within 30 seconds
4. Verify page views are being tracked

## Troubleshooting

**Not seeing data?**
- Check browser console for errors
- Verify VITE_GA4_MEASUREMENT_ID is set correctly
- Ensure you're not blocking analytics (ad blockers, privacy extensions)
- Wait 24-48 hours for historical data to populate

**Privacy Compliance:**
- Add cookie consent banner for GDPR/CCPA compliance
- Update privacy policy to mention Google Analytics
- Consider IP anonymization: `gtag('config', 'GA_ID', { 'anonymize_ip': true });`

## Next Steps
1. ✅ Get GA4 Measurement ID
2. ✅ Add to Replit Secrets
3. ✅ Create GoogleAnalytics component
4. ✅ Add to App.tsx
5. ✅ Verify in GA4 real-time reports
6. ✅ Set up conversion goals
7. ✅ Add event tracking to key interactions
