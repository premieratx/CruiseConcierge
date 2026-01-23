/**
 * Shared formatting utilities for consistent data display across all components
 * Premier Party Cruises CRM System
 */

/**
 * Format monetary amounts consistently across all components
 * @param amount Amount in cents (e.g., 12500 for $125.00)
 * @returns Formatted currency string (e.g., "$125.00")
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 100);
};

/**
 * Format dates consistently (MM/DD/YYYY format)
 * @param date Date string, Date object, or null
 * @returns Formatted date string or fallback
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return 'TBD';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(dateObj);
};

/**
 * Format dates with full context (e.g., "Friday, March 15, 2024")
 * @param date Date string, Date object, or null
 * @returns Formatted long date string or fallback
 */
export const formatLongDate = (date: string | Date | null | undefined): string => {
  if (!date) return 'TBD';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

/**
 * Format timestamps with date and time (MM/DD/YYYY at HH:MM AM/PM)
 * @param date Date string, Date object, or null
 * @returns Formatted datetime string or fallback
 */
export const formatDateTime = (date: string | Date | null | undefined): string => {
  if (!date) return 'TBD';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const dateStr = formatDate(dateObj);
  const timeStr = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(dateObj);
  return `${dateStr} at ${timeStr}`;
};

/**
 * Format time for display (convert 24h to 12h format)
 * @param time Time string in HH:MM format (e.g., "14:30")
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatTimeForDisplay = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Format time range for display
 * @param startTime Start time in HH:MM format
 * @param endTime End time in HH:MM format
 * @returns Formatted time range (e.g., "2:00 PM - 6:00 PM")
 */
export const formatTimeRange = (startTime: string, endTime: string): string => {
  return `${formatTimeForDisplay(startTime)} - ${formatTimeForDisplay(endTime)}`;
};

/**
 * Format phone numbers consistently (XXX) XXX-XXXX
 * @param phone Raw phone number string
 * @returns Formatted phone number or original if invalid
 */
export const formatPhoneNumber = (phone: string | null | undefined): string => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

/**
 * Format customer names consistently (First Last)
 * @param firstName First name
 * @param lastName Last name
 * @returns Formatted full name
 */
export const formatCustomerName = (firstName: string | null | undefined, lastName: string | null | undefined): string => {
  const first = firstName?.trim() || '';
  const last = lastName?.trim() || '';
  if (!first && !last) return 'N/A';
  if (!first) return last;
  if (!last) return first;
  return `${first} ${last}`;
};

/**
 * Format boat capacity labels consistently
 * @param capacity Maximum capacity number
 * @returns Formatted capacity label (e.g., "Fits up to 25 people")
 */
export const formatBoatCapacity = (capacity: number): string => {
  return `Fits up to ${capacity} people`;
};

/**
 * Format event duration consistently
 * @param hours Duration in hours
 * @returns Formatted duration label (e.g., "3-hour cruise")
 */
export const formatEventDuration = (hours: number): string => {
  return `${hours}-hour cruise`;
};

/**
 * Format group size labels consistently
 * @param size Number of people in group
 * @returns Formatted group size (e.g., "25 people")
 */
export const formatGroupSize = (size: number): string => {
  if (size === 1) return '1 person';
  return `${size} people`;
};

/**
 * Get effective people count based on cruise type
 * Consolidates logic for determining whether to use disco ticket quantity or regular group size
 * @param cruiseType The type of cruise ('disco' or 'private')
 * @param groupSize Regular group size for private cruises
 * @param discoTicketQuantity Ticket quantity for disco cruises (optional)
 * @returns The effective number of people for pricing/display purposes
 */
export const getEffectivePeopleCount = (
  cruiseType: 'disco' | 'private' | string,
  groupSize: number,
  discoTicketQuantity?: number
): number => {
  return cruiseType === 'disco' 
    ? (discoTicketQuantity || groupSize)
    : groupSize;
};

/**
 * Format percentage values consistently
 * @param percent Percentage as whole number (e.g., 25 for 25%)
 * @returns Formatted percentage (e.g., "25%")
 */
export const formatPercentage = (percent: number): string => {
  return `${percent}%`;
};

/**
 * Format tax rate consistently
 * @param taxRateInBasisPoints Tax rate in basis points (e.g., 825 for 8.25%)
 * @returns Formatted tax rate (e.g., "8.25%")
 */
export const formatTaxRate = (taxRateInBasisPoints: number): string => {
  const percent = taxRateInBasisPoints / 100;
  return `${percent}%`;
};

/**
 * Format payment schedule labels consistently
 * @param depositPercent Deposit percentage (e.g., 25)
 * @returns Formatted payment schedule (e.g., "25% deposit due now, 75% due on event date")
 */
export const formatPaymentSchedule = (depositPercent: number): string => {
  const balancePercent = 100 - depositPercent;
  if (depositPercent === 100) return 'Full payment due now';
  return `${depositPercent}% deposit due now, ${balancePercent}% due on event date`;
};

/**
 * Format email addresses consistently (lowercase)
 * @param email Raw email string
 * @returns Formatted email or empty string
 */
export const formatEmail = (email: string | null | undefined): string => {
  if (!email) return '';
  return email.toLowerCase().trim();
};

/**
 * Format relative time for activity feeds (e.g., "2 hours ago", "3 days ago")
 * @param date Date to compare against now
 * @returns Relative time string
 */
export const formatRelativeTime = (date: string | Date | null | undefined): string => {
  if (!date) return 'Unknown';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

/**
 * Format file sizes consistently
 * @param bytes File size in bytes
 * @returns Formatted file size (e.g., "1.2 MB", "345 KB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};