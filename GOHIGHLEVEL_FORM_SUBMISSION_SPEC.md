# GoHighLevel Form Submission Technical Specification

**Form ID:** `w33cn0pBz1fFbTC0Hrnh`  
**Form Name:** "Golden Ticket Form to Friends"  
**Form URL:** https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh

---

## Table of Contents
1. [Overview](#overview)
2. [Form Details](#form-details)
3. [Submission Endpoint](#submission-endpoint)
4. [Request Format](#request-format)
5. [Required Fields](#required-fields)
6. [reCAPTCHA Challenge](#recaptcha-challenge)
7. [CORS Considerations](#cors-considerations)
8. [Implementation Approaches](#implementation-approaches)
9. [Code Examples](#code-examples)
10. [Recommendations](#recommendations)

---

## Overview

This document provides a technical specification for programmatically submitting data to a GoHighLevel form from a custom UI. The form is currently embedded as an iframe but we want to replace it with a custom form that submits directly to GoHighLevel.

**Key Challenge:** GoHighLevel does not provide official documentation for direct form submission. The endpoint was discovered through reverse engineering browser network requests.

---

## Form Details

### Basic Information
- **Form ID:** `w33cn0pBz1fFbTC0Hrnh`
- **Form Name:** "Golden Ticket Form to Friends"
- **Embed URL:** https://events.premierpartycruises.com/widget/form/w33cn0pBz1fFbTC0Hrnh
- **Embed Script:** https://events.premierpartycruises.com/js/form_embed.js

### Visible Form Fields
1. **Full Name** - Text input (required based on form structure)
2. **Phone** - Phone input (marked with * as required)
3. **Email** - Email input (marked with * as required)

### Security Features
- **reCAPTCHA v2** - Checkbox-based CAPTCHA protection enabled
- Privacy Policy and Terms of Service links included

---

## Submission Endpoint

### Discovered Endpoint (Undocumented)
```
POST https://backend.leadconnectorhq.com/forms/submit
```

**Important Notes:**
- This endpoint is **NOT officially documented** by GoHighLevel
- Discovered through browser network inspection of form submissions
- May change without notice (no official support)
- No version number in URL (could break in future updates)

### Official API Alternative
```
POST https://services.leadconnectorhq.com/contacts/
```

**Official Documentation:** https://marketplace.gohighlevel.com/docs/

**Requirements:**
- OAuth 2.0 Bearer token authentication
- Does NOT create form submission record (creates contact instead)
- No attribution/tracking data captured
- Rate limits apply: 100 requests/10 seconds, 200k requests/day

---

## Request Format

### Undocumented Form Endpoint Format

The endpoint requires a **specific data structure**:

1. Create a JavaScript object with form data
2. Stringify the object to JSON
3. Append the JSON string to a FormData object under key `"formData"`
4. Send as POST request

**Data Structure:**
```javascript
{
  "formId": "w33cn0pBz1fFbTC0Hrnh",  // Required
  "name": "John Doe",                  // Full name field
  "email": "john@example.com",         // Email field
  "phone": "+1234567890"               // Phone field
}
```

**HTTP Request:**
```
POST https://backend.leadconnectorhq.com/forms/submit
Content-Type: multipart/form-data

FormData:
  formData: '{"formId":"w33cn0pBz1fFbTC0Hrnh","name":"John Doe","email":"john@example.com","phone":"+1234567890"}'
```

---

## Required Fields

### Standard Fields
These field keys are consistent across GoHighLevel forms:

| Field | Key | Type | Required | Notes |
|-------|-----|------|----------|-------|
| Full Name | `name` | string | Yes | Combined first/last name |
| Email | `email` | string | Yes | Valid email format |
| Phone | `phone` | string | Yes | Can include country code |
| Form ID | `formId` | string | Yes | Must match target form |

### Alternative Field Names
GoHighLevel may also accept:
- `firstName` and `lastName` instead of `name`
- `phone_number` or `phoneNumber` variations

### Custom Fields
If the form has custom fields, they use random string IDs like:
- `"IvYfCvMkhGap6sTe1Uql"`
- Must be discovered by inspecting actual form submissions

**How to Find Custom Field IDs:**
1. Open form in browser
2. Open DevTools → Network tab
3. Submit test data
4. Inspect payload sent to `backend.leadconnectorhq.com/forms/submit`
5. Look for additional field keys in the formData JSON

---

## reCAPTCHA Challenge

### Current Implementation
- **Type:** reCAPTCHA v2 (checkbox-based)
- **Visibility:** Visible on form
- **Site Key:** Would need to be extracted from form HTML

### The Problem
The undocumented submission endpoint likely validates reCAPTCHA tokens, but:
- No documentation on how to include token in request
- May reject requests without valid reCAPTCHA
- Testing required to confirm behavior

### Potential Solutions

#### Option 1: Include reCAPTCHA in Custom Form
```javascript
// Get reCAPTCHA token
const recaptchaToken = await grecaptcha.execute(siteKey, { action: 'submit' });

// Include in submission (untested)
const formData = {
  formId: "w33cn0pBz1fFbTC0Hrnh",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  "g-recaptcha-response": recaptchaToken  // May or may not work
};
```

#### Option 2: Verify Server-Side, Skip Form Endpoint
```javascript
// 1. Verify reCAPTCHA on your server
const recaptchaValid = await verifyRecaptcha(token);

// 2. If valid, use official Contact API instead
if (recaptchaValid) {
  await createContactViaAPI(formData);
}
```

#### Option 3: Use Backend Proxy (Recommended)
Submit through your own backend which:
1. Validates reCAPTCHA server-side
2. If valid, proxies request to GoHighLevel
3. Handles CORS and security

---

## CORS Considerations

### The CORS Problem
**Direct browser requests to `backend.leadconnectorhq.com` will fail due to CORS policy.**

Browser error:
```
Access to fetch at 'https://backend.leadconnectorhq.com/forms/submit' 
from origin 'https://premierpartycruises.com' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

### Why CORS Fails
- GoHighLevel's form endpoint doesn't include CORS headers for external domains
- Browser blocks cross-origin requests for security
- Only same-origin or allowed origins can make requests

### Solution: Backend Proxy Required

**You MUST use a backend proxy** to submit forms programmatically.

**Architecture:**
```
Custom Form (Browser)
    ↓ POST
Your Backend Proxy (Node.js/Express)
    ↓ POST (server-to-server, no CORS)
backend.leadconnectorhq.com/forms/submit
```

---

## Implementation Approaches

### Approach 1: Backend Proxy to Undocumented Endpoint

**Pros:**
- Creates actual form submission record in GoHighLevel
- Preserves attribution/tracking data
- Works with existing form configuration

**Cons:**
- Undocumented endpoint (may break)
- reCAPTCHA handling unclear
- No official support

**When to Use:**
- Need form submission tracking
- Want to preserve current workflow triggers
- Can handle potential breaking changes

---

### Approach 2: Official Contact API

**Pros:**
- Officially documented and supported
- Authenticated (secure)
- Rate limits but generous
- Won't break unexpectedly

**Cons:**
- Doesn't create form submission record
- No attribution data captured
- Requires API key/OAuth setup
- Different data appears in GoHighLevel

**When to Use:**
- Just need to create/update contacts
- Don't need form submission tracking
- Want long-term stability
- Have API credentials

---

### Approach 3: Webhook Trigger

**Pros:**
- Official feature in GoHighLevel
- Can trigger workflows
- Fully supported

**Cons:**
- Requires workflow setup in GoHighLevel
- More complex initial configuration
- Webhook URL must be secured

**When to Use:**
- Want to trigger automation
- Need workflow integration
- Prefer no-code/low-code solution

---

## Code Examples

### Example 1: Frontend Custom Form (React/Next.js)

```tsx
'use client';

import { useState } from 'react';

export default function CustomGHLForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to YOUR backend proxy
      const response = await fetch('/api/ghl-form-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formId: 'w33cn0pBz1fFbTC0Hrnh',
          ...formData
        })
      });

      if (response.ok) {
        alert('Thank you! Your information has been submitted.');
        setFormData({ name: '', email: '', phone: '' });
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="phone">Phone *</label>
        <input
          type="tel"
          id="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

---

### Example 2: Backend Proxy (Node.js/Express)

```javascript
// server/routes.ts or separate API route
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/api/ghl-form-proxy', async (req, res) => {
  try {
    const { formId, name, email, phone } = req.body;

    // Validate required fields
    if (!formId || !name || !email || !phone) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Prepare form data object
    const formDataObject = {
      formId,
      name,
      email,
      phone
    };

    // Stringify to JSON
    const jsonString = JSON.stringify(formDataObject);

    // Create FormData
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('formData', jsonString);

    // Submit to GoHighLevel
    const ghlResponse = await axios.post(
      'https://backend.leadconnectorhq.com/forms/submit',
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    // Return success
    res.json({ 
      success: true, 
      data: ghlResponse.data 
    });

  } catch (error) {
    console.error('GHL Form Submission Error:', error);
    res.status(500).json({ 
      error: 'Form submission failed',
      details: error.message 
    });
  }
});

export default router;
```

---

### Example 3: With reCAPTCHA Validation

```javascript
// Backend proxy with reCAPTCHA verification
import axios from 'axios';

router.post('/api/ghl-form-proxy', async (req, res) => {
  try {
    const { formId, name, email, phone, recaptchaToken } = req.body;

    // 1. Verify reCAPTCHA first
    const recaptchaResponse = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
          remoteip: req.ip
        }
      }
    );

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ 
        error: 'reCAPTCHA verification failed' 
      });
    }

    // 2. If reCAPTCHA valid, submit to GoHighLevel
    const formDataObject = { formId, name, email, phone };
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('formData', JSON.stringify(formDataObject));

    const ghlResponse = await axios.post(
      'https://backend.leadconnectorhq.com/forms/submit',
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    res.json({ success: true, data: ghlResponse.data });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Submission failed' });
  }
});
```

---

### Example 4: Using Official Contact API (Alternative)

```javascript
// Backend using official GoHighLevel Contact API
router.post('/api/ghl-contact', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Split name into first/last if needed
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');

    // Submit to official API
    const response = await axios.post(
      'https://services.leadconnectorhq.com/contacts/',
      {
        firstName,
        lastName,
        email,
        phone,
        // Add any custom fields here
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ success: true, contactId: response.data.id });

  } catch (error) {
    console.error('GHL Contact API Error:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});
```

---

## Recommendations

### For This Specific Use Case (Golden Ticket Form)

**Recommended Approach: Backend Proxy to Form Endpoint**

**Reasoning:**
1. ✅ Preserves form submission tracking in GoHighLevel
2. ✅ Works with existing workflows/automations
3. ✅ Maintains attribution data
4. ✅ Can implement custom UI without iframe
5. ✅ Can add reCAPTCHA validation on backend

**Implementation Steps:**

1. **Create Backend API Route** (`/api/ghl-form-proxy`)
   - Accept form data from frontend
   - Validate reCAPTCHA (optional but recommended)
   - Format data correctly (FormData with JSON string)
   - Submit to `backend.leadconnectorhq.com/forms/submit`

2. **Build Custom Form UI**
   - Replace iframe with custom React form
   - Submit to your backend proxy
   - Handle loading states and errors
   - Show success/failure messages

3. **Handle reCAPTCHA** (if needed for spam prevention)
   - Add invisible reCAPTCHA v3 to form
   - Get token on form submit
   - Verify token server-side
   - Only proxy to GHL if valid

4. **Test Thoroughly**
   - Test with valid data
   - Test with invalid data
   - Check GoHighLevel dashboard for submissions
   - Verify workflow triggers still work
   - Monitor for errors

5. **Add Error Handling**
   - Graceful degradation if GHL endpoint changes
   - Fallback to iframe if proxy fails
   - Log errors for debugging
   - User-friendly error messages

---

### Risk Mitigation

**Since the endpoint is undocumented:**

1. **Monitor for Changes**
   - Set up error logging/monitoring
   - Check regularly that submissions work
   - Have fallback plan (iframe or Contact API)

2. **Implement Fallback**
   ```javascript
   try {
     await submitToFormEndpoint();
   } catch (error) {
     // Fallback to Contact API or show iframe
     await submitToContactAPI();
   }
   ```

3. **Keep Iframe Option Available**
   - Don't delete iframe embed code
   - Can quickly revert if needed
   - Use as backup submission method

---

## Testing Checklist

Before deploying to production:

- [ ] Test form submission with valid data
- [ ] Verify submission appears in GoHighLevel
- [ ] Check that workflows trigger correctly
- [ ] Test reCAPTCHA validation (if implemented)
- [ ] Test CORS proxy works from production domain
- [ ] Test error handling (network failures, invalid data)
- [ ] Test mobile responsiveness
- [ ] Monitor API response times
- [ ] Set up error logging/monitoring
- [ ] Have rollback plan ready

---

## Additional Resources

- **GoHighLevel Developer Portal:** https://marketplace.gohighlevel.com/docs/
- **Contact API Docs:** https://highlevel.stoplight.io/docs/integrations/f71bbdd88f028-upsert-contact
- **Developer Community:** https://developers.gohighlevel.com/join-dev-community
- **Form Embed Script:** https://events.premierpartycruises.com/js/form_embed.js

---

## Document Version

**Version:** 1.0  
**Last Updated:** 2025-10-09  
**Status:** Complete - Ready for Implementation

---

## Summary

**Key Takeaways:**

1. **Endpoint:** `POST https://backend.leadconnectorhq.com/forms/submit`
2. **Method:** POST with FormData containing JSON string under key "formData"
3. **Required Fields:** `formId`, `name`, `email`, `phone`
4. **CORS:** Backend proxy is REQUIRED (browser requests will fail)
5. **reCAPTCHA:** May need server-side validation before submission
6. **Risk:** Undocumented endpoint - implement with fallback plan
7. **Alternative:** Use official Contact API for stability (loses form tracking)

**Next Steps:**
1. Implement backend proxy endpoint
2. Build custom form UI
3. Test thoroughly
4. Deploy with monitoring
5. Have rollback plan ready
