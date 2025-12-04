import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { loadXolaScript, initXolaEmbeds } from '@/services/xola';
import GHLFormModal from '@/components/GHLFormModal';
// Fix for SSR: Use path string instead of import for logo (removed CSS import - breaks SSR)
const logoPath = '/attached_assets/PPC-Logo-48x48.webp';
import { 
  Ship, Calendar, MessageSquare, Phone, 
  Users, Camera, Heart, ArrowRight, Star,
  Building, GraduationCap,
  Trophy, Crown, Sparkles, Wine, Music, Gift,
  Disc3, Menu, ChevronDown
} from 'lucide-react';

// Type definitions
type BaseNavigationItem = {
  title: string;
  href: string;
  icon: any;
  badge?: string;
};

type NavigationItemWithDropdown = BaseNavigationItem & {
  hasDropdown: true;
  dropdownItems: (DropdownLink | DropdownSection)[];
};

type NavigationItemSimple = BaseNavigationItem & {
  hasDropdown?: false;
};

type NavigationItem = NavigationItemSimple | NavigationItemWithDropdown;

type DropdownLink = {
  title: string;
  href: string;
  description: string;
  icon: any;
};

type DropdownSection = {
  section: string;
};

// Helper functions
const safeSlug = (s?: string): string => {
  return (s ?? 'item').toLowerCase().replace(/\s+/g, '-');
};

const isSection = (item: DropdownLink | DropdownSection): item is DropdownSection => {
  return 'section' in item;
};

const isLink = (item: DropdownLink | DropdownSection): item is DropdownLink => {
  return 'href' in item;
};

const navigationItems: NavigationItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Ship
  },
  {
    title: 'ATX Disco Cruise',
    href: '/atx-disco-cruise',
    icon: Disc3
  },
  {
    title: 'Bachelor Party',
    href: '/bachelor-party-austin',
    icon: Users
  },
  {
    title: 'Bachelorette Party',
    href: '/bachelorette-party-austin',
    icon: Heart
  },
  {
    title: 'Private Cruises',
    href: '/private-cruises',
    icon: Ship,
    hasDropdown: true,
    dropdownItems: [
      {
        title: 'All Private Cruises',
        href: '/private-cruises',
        description: 'Exclusive boat charters',
        icon: Ship
      },
      {
        section: 'Wedding Experiences'
      },
      {
        title: 'Rehearsal Dinner',
        href: '/rehearsal-dinner',
        description: 'Elegant pre-wedding celebration',
        icon: Wine
      },
      {
        title: 'Welcome Party',
        href: '/welcome-party',
        description: 'Kick off wedding weekend',
        icon: Heart
      },
      {
        title: 'After Party',
        href: '/after-party',
        description: 'Keep celebration going',
        icon: Music
      },
      {
        section: 'Corporate Events'
      },
      {
        title: 'Team Building',
        href: '/team-building',
        description: 'Interactive team activities',
        icon: Users
      },
      {
        title: 'Client Entertainment',
        href: '/client-entertainment',
        description: 'Impress with Austin views',
        icon: Building
      },
      {
        title: 'Company Milestones',
        href: '/company-milestone',
        description: 'Celebrate achievements',
        icon: Trophy
      },
      {
        section: 'Birthday Parties'
      },
      {
        title: 'Milestone Birthdays',
        href: '/milestone-birthday',
        description: '21st, 30th, 40th, 50th & beyond',
        icon: Crown
      },
      {
        title: 'Sweet 16',
        href: '/sweet-16',
        description: 'Teen celebration cruise',
        icon: Sparkles
      },
      {
        section: 'Special Events'
      },
      {
        title: 'Graduation Parties',
        href: '/graduation-party',
        description: 'Celebrate achievements',
        icon: GraduationCap
      }
    ]
  },
  {
    title: 'Gallery',
    href: '/gallery',
    icon: Camera
  },
  {
    title: 'Reviews & FAQ',
    href: '/testimonials-faq',
    icon: Star
  },
  {
    title: 'Contact',
    href: '/contact',
    icon: Phone
  }
];

interface PublicNavigationProps {
  onBookNowClick?: () => void;
}

export default function PublicNavigation({ onBookNowClick }: PublicNavigationProps = {}) {
  // SSR-safe location hook - use guard for browser-only wouter hook
  const locationData = typeof window !== 'undefined' ? useLocation() : ['/', () => {}];
  const [location, navigate] = locationData as [string, (to: string) => void];
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ghlFormOpen, setGhlFormOpen] = useState(false);

  // PAGESPEED: Xola now loads only on user interaction (click/touch)
  // No auto-loading on mount or navigation - handled by index.html click listener
  
  // Re-initialize Xola embeds when needed (only if already loaded)
  useEffect(() => {
    if (typeof window !== 'undefined' && mobileMenuOpen && window.xolaLoaded) {
      setTimeout(() => initXolaEmbeds(), 100);
    }
  }, [mobileMenuOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 50);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll to top on navigation (no Xola auto-load)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      // Only re-init Xola if already loaded (user has interacted)
      if (window.xolaLoaded) {
        setTimeout(() => initXolaEmbeds(), 100);
      }
    }
  }, [location]);


  const handleGetQuote = () => {
    // Open quote builder in new tab
    window.open('https://booking.premierpartycruises.com/quote-v2', '_blank');
  };

  return (
    <>
      {/* Sticky Header - Flexbox Layout */}
      <header 
        className={cn(
          "ppc-public-nav sticky top-0 inset-x-0 z-50 w-full transition-all duration-300",
          isScrolled 
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-800" 
            : "bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-6 lg:px-10" style={{ height: '5rem' }}>
          {/* Logo - Left */}
          <div className="flex items-center flex-shrink-0">
            <a 
              href="/"
              className="flex items-center group"
              data-testid="link-home-logo"
            >
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-12 lg:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                width={56}
                height={56}
                loading="eager"
              />
            </a>
          </div>

          {/* Mobile Header Controls - flex-1 to push to right */}
          <div className="lg:!hidden flex flex-1 items-center justify-end gap-2">
            {/* Mobile Get Quote Button */}
            <a
              href="https://booking.premierpartycruises.com/quote-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold px-2 py-1.5 text-xs whitespace-nowrap h-9 rounded-md transition-colors"
              data-testid="button-mobile-header-get-quote"
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              Get My Quote
            </a>
            
            {/* Mobile Book Now Button - Xola Checkout */}
            <div
              className="xola-custom xola-checkout inline-block"
              data-button-id="691574bd162501edc00f151a"
              data-testid="button-mobile-header-book-now"
            >
              <button className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-2 py-1.5 text-xs whitespace-nowrap h-9 shadow-md rounded-md inline-flex items-center justify-center transition-colors">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                Book Now
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand-blue transition-colors"
              data-testid="button-mobile-menu-toggle"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation - Left-to-right flow */}
          <div className="ppc-public-nav-center hidden lg:flex items-center">
              <NavigationMenu className="overflow-visible">
                <NavigationMenuList className="flex items-center space-x-1 overflow-visible">
                {navigationItems.map((item) => (
                  item.hasDropdown ? (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuTrigger 
                        className={cn(
                          "flex items-center px-2 py-2 font-semibold text-sm",
                          (location.startsWith('/private-cruises') || 
                          location.startsWith('/corporate-events') ||
                          location.startsWith('/birthday-parties') ||
                          location.startsWith('/wedding-parties') ||
                          (item.title === 'Authority' && (location.startsWith('/ai-endorsement') || location.includes('/claude-ai-market-analysis'))))
                            ? "text-brand-blue"
                            : "text-gray-700 dark:text-gray-300"
                        )}
                      >
                        <span 
                          data-editable 
                          data-editable-id={`nav-dropdown-${safeSlug(item.title)}`}
                        >
                          {item.title}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[600px] gap-2 p-4 md:w-[700px] md:grid-cols-2">
                          {item.dropdownItems?.map((dropdownItem, index) => {
                            if (isSection(dropdownItem)) {
                              return (
                                <li key={`section-${index}`} className="col-span-2 mt-2 first:mt-0">
                                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 pb-1" data-editable data-editable-id={`nav-section-${safeSlug(dropdownItem.section)}`}>
                                    {dropdownItem.section}
                                  </div>
                                </li>
                              );
                            } else if (isLink(dropdownItem)) {
                              const Icon = dropdownItem.icon;
                              const getTestId = () => {
                                if (dropdownItem.title === 'AI Endorsements') return 'nav-ai-authority';
                                if (dropdownItem.title === 'Market Analysis') return 'nav-market-analysis';
                                return `link-dropdown-${safeSlug(dropdownItem.title)}`;
                              };
                              return (
                                <li key={dropdownItem.href}>
                                  <NavigationMenuLink asChild>
                                    <a
                                      href={dropdownItem.href}
                                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      data-testid={getTestId()}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <Icon className="h-4 w-4 text-brand-blue" />
                                        <div className="text-sm font-medium leading-none" data-editable data-editable-id={`nav-dropdown-${safeSlug(dropdownItem.title)}-title`}>{dropdownItem.title}</div>
                                      </div>
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground" data-editable data-editable-id={`nav-dropdown-${safeSlug(dropdownItem.title)}-description`}>
                                        {dropdownItem.description}
                                      </p>
                                    </a>
                                  </NavigationMenuLink>
                                </li>
                              );
                            }
                            return null;
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.href}>
                      <a
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "flex items-center font-semibold text-sm px-2",
                          location === item.href
                            ? "text-brand-blue bg-brand-blue/10"
                            : "text-gray-700 dark:text-gray-300"
                        )}
                        data-testid={`link-nav-${safeSlug(item.title)}`}
                      >
                        <span data-editable data-editable-id={`nav-simple-${safeSlug(item.title)}`}>{item.title}</span>
                        {item.badge && (
                          <span className="ml-2 px-2 py-1 text-xs font-bold bg-brand-yellow text-black rounded-full" data-editable data-editable-id={`nav-badge-${safeSlug(item.title)}`}>
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </NavigationMenuItem>
                  )
                ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

          {/* Desktop CTA Buttons - Right */}
          <div className="ppc-public-nav-cta hidden lg:flex flex-shrink-0 items-center gap-2">
              <a
                href="https://booking.premierpartycruises.com/quote-v2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold px-3 lg:px-4 py-2 tracking-wide text-sm whitespace-nowrap rounded-md transition-colors"
                data-testid="button-header-get-quote"
              >
                <MessageSquare className="mr-1.5 h-4 w-4" />
                <span data-editable data-editable-id="header-get-quote-button">Get My Quote</span>
              </a>
              
              {/* Desktop Book Now Button - Xola Checkout */}
              <div
                className="xola-custom xola-checkout"
                data-button-id="691574bd162501edc00f151a"
                data-testid="button-header-book-now"
              >
                <button className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-4 py-2 tracking-wide text-sm whitespace-nowrap shadow-md rounded-md inline-flex items-center justify-center transition-colors">
                  <Calendar className="mr-1.5 h-4 w-4" />
                  Book Now
                </button>
              </div>
          </div>
        </div>
      </header>


      {/* Mobile Bottom Navigation Bar */}
      <nav 
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 lg:hidden",
          "bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg",
          "border-t border-gray-200 dark:border-gray-800 shadow-2xl",
          "pb-safe"
        )}
        data-testid="mobile-bottom-nav"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {/* Home */}
          <a
            href="/"
            className={cn(
              "flex flex-col items-center justify-center min-h-[44px] px-2 py-1 rounded-lg transition-all duration-200",
              location === '/'
                ? "text-brand-blue bg-brand-blue/10"
                : "text-gray-600 dark:text-gray-400 hover:text-brand-blue hover:bg-brand-blue/5"
            )}
            data-testid="link-bottom-nav-home"
          >
            <Ship className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium">Home</span>
          </a>

          {/* Private Cruises */}
          <a
            href="/private-cruises"
            className={cn(
              "flex flex-col items-center justify-center min-h-[44px] px-2 py-1 rounded-lg transition-all duration-200",
              location.startsWith('/private-cruises')
                ? "text-brand-blue bg-brand-blue/10"
                : "text-gray-600 dark:text-gray-400 hover:text-brand-blue hover:bg-brand-blue/5"
            )}
            data-testid="link-bottom-nav-private-cruises"
          >
            <Ship className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium">Private</span>
          </a>

          {/* Bach Party */}
          <a
            href="/bachelorette-party-austin"
            className={cn(
              "flex flex-col items-center justify-center min-h-[44px] px-2 py-1 rounded-lg transition-all duration-200",
              location === '/bachelorette-party-austin'
                ? "text-brand-blue bg-brand-blue/10"
                : "text-gray-600 dark:text-gray-400 hover:text-brand-blue hover:bg-brand-blue/5"
            )}
            data-testid="link-bottom-nav-bach-party"
          >
            <Heart className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium">Bach</span>
          </a>

          {/* Wedding */}
          <a
            href="/wedding-parties"
            className={cn(
              "flex flex-col items-center justify-center min-h-[44px] px-2 py-1 rounded-lg transition-all duration-200",
              location === '/wedding-parties'
                ? "text-brand-blue bg-brand-blue/10"
                : "text-gray-600 dark:text-gray-400 hover:text-brand-blue hover:bg-brand-blue/5"
            )}
            data-testid="link-bottom-nav-wedding"
          >
            <Heart className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium">Wedding</span>
          </a>

          {/* Gallery */}
          <a
            href="/gallery"
            className={cn(
              "flex flex-col items-center justify-center min-h-[44px] px-2 py-1 rounded-lg transition-all duration-200",
              location === '/gallery'
                ? "text-brand-blue bg-brand-blue/10"
                : "text-gray-600 dark:text-gray-400 hover:text-brand-blue hover:bg-brand-blue/5"
            )}
            data-testid="link-bottom-nav-gallery"
          >
            <Camera className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium">Gallery</span>
          </a>

          {/* Get Quote */}
          <button
            onClick={handleGetQuote}
            className={cn(
              "flex flex-col items-center justify-center min-h-[44px] px-2 py-1 rounded-lg transition-all duration-200",
              "text-gray-600 dark:text-gray-400 hover:text-brand-blue hover:bg-brand-blue/5"
            )}
            data-testid="button-bottom-nav-get-quote"
          >
            <MessageSquare className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium">Quote</span>
          </button>

          {/* Book Now Button - Xola Checkout */}
          <div
            className="xola-custom xola-checkout"
            data-button-id="691574bd162501edc00f151a"
            data-testid="button-bottom-nav-book-now"
          >
            <button
              className={cn(
                "flex flex-col items-center justify-center min-h-[44px] px-2 py-1 rounded-lg transition-all duration-200",
                "text-gray-600 dark:text-gray-400 hover:text-brand-blue hover:bg-brand-blue/5"
              )}
            >
              <Calendar className="h-5 w-5 mb-0.5" />
              <span className="text-[10px] font-medium">Book</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom spacer for mobile bottom nav */}
      <div className="h-16 lg:hidden" />

      {/* Mobile Menu Sheet - Only render when open to prevent overlay issues */}
      {mobileMenuOpen && (
        <Sheet open={true} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          {/* Book Now Button at Top of Mobile Menu - Xola Checkout */}
          <div className="mt-4 px-3">
            <div
              className="xola-custom xola-checkout w-full"
              data-button-id="691574bd162501edc00f151a"
              data-testid="button-mobile-menu-book-now"
              onClick={() => setMobileMenuOpen(false)}
            >
              <button className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold py-3 shadow-md rounded-md inline-flex items-center justify-center transition-colors">
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </button>
            </div>
          </div>
          
          <nav className="mt-6 space-y-1" data-testid="mobile-menu-nav">
            {navigationItems.map((item) => {
              const ItemIcon = item.icon;
              
              if (item.hasDropdown) {
                return (
                  <Collapsible key={item.href} className="space-y-1">
                    <CollapsibleTrigger 
                      className="flex items-center justify-between w-full px-3 py-3 text-left rounded-lg hover:bg-accent transition-colors group"
                      data-testid={`button-mobile-menu-${safeSlug(item.title)}`}
                    >
                      <div className="flex items-center space-x-3">
                        <ItemIcon className="h-5 w-5 text-brand-blue" />
                        <span className="font-semibold text-sm">{item.title}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 space-y-1">
                      {item.dropdownItems?.map((dropdownItem, index) => {
                        if (isSection(dropdownItem)) {
                          return (
                            <div 
                              key={`section-${index}`} 
                              className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 pt-3 pb-1"
                            >
                              {dropdownItem.section}
                            </div>
                          );
                        } else if (isLink(dropdownItem)) {
                          const DropdownIcon = dropdownItem.icon;
                          return (
                            <a
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-start space-x-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                              data-testid={`link-mobile-menu-${safeSlug(dropdownItem.title)}`}
                            >
                              <DropdownIcon className="h-4 w-4 text-brand-blue mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium">{dropdownItem.title}</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">{dropdownItem.description}</div>
                              </div>
                            </a>
                          );
                        }
                        return null;
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                );
              } else {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors",
                      location === item.href
                        ? "bg-brand-blue/10 text-brand-blue"
                        : "hover:bg-accent"
                    )}
                    data-testid={`link-mobile-menu-${safeSlug(item.title)}`}
                  >
                    <ItemIcon className="h-5 w-5 text-brand-blue" />
                    <span className="font-semibold text-sm">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-1 text-xs font-bold bg-brand-yellow text-black rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              }
            })}
          </nav>

          {/* CTA Buttons in Mobile Menu */}
          <div className="mt-6 space-y-3 border-t pt-6">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                handleGetQuote();
              }}
              variant="outline"
              className="w-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold"
              data-testid="button-mobile-menu-get-quote"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              GET QUOTE
            </Button>
            
            {/* Mobile Menu Book Now Button - Xola Checkout */}
            <div
              className="xola-custom xola-checkout w-full"
              data-button-id="691574bd162501edc00f151a"
              data-testid="button-mobile-menu-book-now-bottom"
              onClick={() => setMobileMenuOpen(false)}
            >
              <button className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold py-3 shadow-md rounded-md inline-flex items-center justify-center transition-colors">
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </button>
            </div>
          </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}