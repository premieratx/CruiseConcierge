// SSR FIX: Explicit React import needed for Node.js SSR environment
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';

export interface SplitSectionCTA {
  label: string;
  href?: string;
  scrollTo?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  xolaId?: string;
}

export interface SplitSectionMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
}

export interface SplitSectionProps {
  eyebrow?: string;
  heading: string;
  body: string | string[];
  bullets?: string[];
  cta?: SplitSectionCTA;
  secondaryCta?: SplitSectionCTA;
  media: SplitSectionMedia;
  reversed?: boolean;
  variant?: 'light' | 'dark' | 'gray';
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

function handleCTA(cta: SplitSectionCTA) {
  if (cta.scrollTo) {
    document.getElementById(cta.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (cta.onClick) {
    cta.onClick();
  }
}

function CTAButton({ cta, isDark, size = 'lg' }: { cta: SplitSectionCTA; isDark: boolean; size?: 'sm' | 'lg' }) {
  const primaryClass = 'bg-brand-yellow hover:bg-yellow-300 text-gray-900 font-bold rounded-xl shadow-lg';
  const outlineClass = isDark
    ? 'border-2 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent font-bold rounded-xl'
    : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-transparent font-bold rounded-xl';
  const btnClass = cn('text-base px-8 py-5', cta.variant === 'outline' ? outlineClass : primaryClass);

  const inner = (
    <>
      {cta.label}
      <ArrowRight className="ml-2 h-5 w-5" />
    </>
  );

  if (cta.xolaId) {
    return (
      <div className="xola-custom xola-checkout" data-button-id={cta.xolaId}>
        <Button size={size} className={btnClass}>{inner}</Button>
      </div>
    );
  }

  if (cta.scrollTo || cta.onClick) {
    return (
      <Button size={size} className={btnClass} onClick={() => handleCTA(cta)}>
        {inner}
      </Button>
    );
  }

  if (cta.href) {
    if (cta.href.startsWith('http') || cta.href.startsWith('tel:') || cta.href.startsWith('mailto:')) {
      return (
        <a href={cta.href}>
          <Button size={size} className={btnClass}>{inner}</Button>
        </a>
      );
    }
    return (
      <Link href={cta.href}>
        <Button size={size} className={btnClass}>{inner}</Button>
      </Link>
    );
  }

  return null;
}

export default function SplitSection({
  eyebrow,
  heading,
  body,
  bullets,
  cta,
  secondaryCta,
  media,
  reversed = false,
  variant = 'light',
  className,
  id,
  children,
}: SplitSectionProps) {
  const paragraphs = Array.isArray(body) ? body : [body];
  const isDark = variant === 'dark';

  const bgClass = isDark
    ? 'bg-brand-navy'
    : variant === 'gray'
    ? 'bg-[#F7F6F3]'
    : 'bg-white';

  const textBlock = (
    <div className="flex flex-col justify-center py-8 lg:py-0">
      {eyebrow && (
        <p className={cn('text-xs font-bold tracking-[0.2em] uppercase mb-4', isDark ? 'text-brand-yellow' : 'text-blue-600')}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn('heading-unbounded text-3xl sm:text-4xl font-bold mb-6 leading-tight', isDark ? 'text-white' : 'text-gray-900')}>
        {heading}
      </h2>
      {paragraphs.map((p, i) => (
        <p key={i} className={cn('text-lg leading-relaxed mb-4 last:mb-0', isDark ? 'text-gray-300' : 'text-gray-600')}>
          {p}
        </p>
      ))}
      {bullets && bullets.length > 0 && (
        <ul className="mt-4 mb-6 space-y-3">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={cn('mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0', isDark ? 'bg-brand-yellow' : 'bg-blue-600')} />
              <span className={cn('text-base leading-relaxed', isDark ? 'text-gray-200' : 'text-gray-700')}>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      {children}
      {(cta || secondaryCta) && (
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {cta && <CTAButton cta={cta} isDark={isDark} />}
          {secondaryCta && (
            <Button
              size="lg"
              variant="ghost"
              onClick={() => secondaryCta.scrollTo || secondaryCta.onClick ? handleCTA(secondaryCta) : undefined}
              className={cn('font-bold text-base px-6 py-5', isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')}
            >
              {secondaryCta.href ? (
                secondaryCta.href.startsWith('http') ? (
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                ) : (
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                )
              ) : (
                secondaryCta.label
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const mediaBlock = (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
      {media.type === 'video' ? (
        <video
          src={media.src}
          poster={media.poster}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={media.src}
          alt={media.alt || heading}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );

  return (
    <section id={id} className={cn('py-20 md:py-28', bgClass, className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {reversed ? (
            <>
              {mediaBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {mediaBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
