/*
 * XolaBookNow — shared helper that wraps any element (usually a button or
 * link styled as a CTA) with the classes + data attribute Xola's
 * checkout.js looks for. Clicking the wrapped element opens Xola's
 * slide-out booking widget.
 *
 * The script loader that initializes checkout.js lives in index.html
 * and triggers on any click to `.xola-custom`, `.xola-checkout`, or an
 * element with `data-xola-button`. So the wrapper only needs to apply
 * those classes and the Xola product button ID.
 *
 * Product button ID for Premier Party Cruises' primary "Book Now" entry:
 *     695186923c261203770cc2e7
 * (same ID used on the live Replit site — matches every V1 component
 * that renders a Book Now CTA across the codebase).
 */

import { ReactNode } from 'react';

/** Xola "Book Now" product button ID (primary booking funnel). */
export const XOLA_BUTTON_ID = '695186923c261203770cc2e7';

type Props = {
  children: ReactNode;
  /** Override the Xola product/button ID (default: primary book-now). */
  buttonId?: string;
  /** Extra classes to apply to the wrapper. */
  className?: string;
  /** Rendered inline-block by default so it sits tightly next to other CTAs. */
  display?: 'inline-block' | 'block' | 'inline-flex';
};

export default function XolaBookNow({
  children,
  buttonId = XOLA_BUTTON_ID,
  className = '',
  display = 'inline-block',
}: Props) {
  return (
    <div
      className={`xola-custom xola-checkout ${className}`}
      data-button-id={buttonId}
      data-xola-button="true"
      style={{ display }}
    >
      {children}
    </div>
  );
}
