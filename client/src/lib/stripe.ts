/**
 * Centralized Stripe key resolution and initialization utility
 * Provides safe Stripe initialization across all components
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

/**
 * Safely resolves Stripe publishable key from environment variables
 * @returns {string | null} The Stripe key or null if not available
 */
export function getStripePublishableKey(): string | null {
  const primaryKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  const testingKey = import.meta.env.TESTING_VITE_STRIPE_PUBLIC_KEY;
  
  // Return the first non-empty key found
  if (primaryKey && primaryKey.trim() !== '') {
    return primaryKey.trim();
  }
  
  if (testingKey && testingKey.trim() !== '') {
    return testingKey.trim();
  }
  
  return null;
}

/**
 * Safely creates a Stripe promise, only if a valid key is available
 * @returns {Promise<Stripe | null> | null} Stripe promise or null if no key
 */
export function createStripePromise(): Promise<Stripe | null> | null {
  const key = getStripePublishableKey();
  
  if (!key) {
    console.warn('Stripe: No valid publishable key found. Stripe functionality will be disabled.');
    return null;
  }
  
  return loadStripe(key);
}

/**
 * Checks if Stripe is properly configured
 * @returns {boolean} True if Stripe key is available
 */
export function isStripeConfigured(): boolean {
  return getStripePublishableKey() !== null;
}