import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import logoPath from '@assets/PPC-logo-2023.webp';
import { 
  Menu, X, Ship, Calendar, MessageSquare, Phone, 
  Users, Camera, Heart, ArrowRight, Star,
  Building, Cake, ChevronDown, GraduationCap,
  Trophy, Crown, Sparkles, Wine, Music, Gift,
  Bot, Award, TrendingUp, Disc3
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
    title: 'Bachelor Party',
    href: '/bachelor-party-austin',
    icon: Users,
    badge: 'New!'
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
        title: '⭐ ATX Disco Cruise',
        href: '/atx-disco-cruise',
        description: 'All-Inclusive Bach Party Cruise • Most Popular',
        icon: Disc3
      },
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

export default function PublicNavigation() {
  const [location, navigate] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleGetQuote = () => {
    // Navigate to the customer chatbot quote flow
    navigate('/chat');
  };

  const handleBookNow = () => {
    navigate('/chat');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Sticky Header */}
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-800" 
            : "bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-3 md:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center group"
              data-testid="link-home-logo"
            >
              <img 
                src={logoPath} 
                alt="Premier Party Cruises" 
                className="h-12 lg:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="flex items-center space-x-0">
                {navigationItems.map((item) => (
                  item.hasDropdown ? (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuTrigger 
                        className={cn(
                          "flex items-center space-x-1 px-2 lg:px-3 py-2 font-semibold text-sm",
                          (location.startsWith('/private-cruises') || 
                          location.startsWith('/corporate-events') ||
                          location.startsWith('/birthday-parties') ||
                          location.startsWith('/wedding-parties') ||
                          (item.title === 'Authority' && (location.startsWith('/ai-endorsement') || location.includes('/claude-ai-market-analysis'))))
                            ? "text-brand-blue"
                            : "text-gray-700 dark:text-gray-300"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span 
                          onClick={(e) => {
                            // Check if device has hover capability (not just width)
                            const hasHover = window.matchMedia('(hover: hover)').matches;
                            
                            if (hasHover) {
                              // Desktop with hover: navigate directly
                              e.preventDefault();
                              e.stopPropagation();
                              navigate(item.href);
                            }
                            // Touch devices (no hover): let trigger handle dropdown naturally
                          }}
                          className="cursor-pointer"
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
                                    <Link
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
                                    </Link>
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
                      <Link
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "flex items-center space-x-1 font-semibold text-sm px-2 lg:px-3",
                          location === item.href
                            ? "text-brand-blue bg-brand-blue/10"
                            : "text-gray-700 dark:text-gray-300"
                        )}
                        data-testid={`link-nav-${safeSlug(item.title)}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span data-editable data-editable-id={`nav-simple-${safeSlug(item.title)}`}>{item.title}</span>
                        {item.badge && (
                          <span className="ml-2 px-2 py-1 text-xs font-bold bg-brand-yellow text-black rounded-full" data-editable data-editable-id={`nav-badge-${safeSlug(item.title)}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </NavigationMenuItem>
                  )
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={handleGetQuote}
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold px-3 lg:px-4 py-2 tracking-wide text-sm whitespace-nowrap"
                data-testid="button-header-get-quote"
              >
                <MessageSquare className="mr-1.5 h-4 w-4" />
                <span data-editable data-editable-id="header-get-quote-button">GET QUOTE</span>
              </Button>
              
              <Button
                onClick={handleBookNow}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-3 lg:px-4 py-2 tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 text-sm whitespace-nowrap"
                data-testid="button-header-book-now"
              >
                <Calendar className="mr-1.5 h-4 w-4" />
                <span data-editable data-editable-id="header-book-now-button">BOOK NOW</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2"
                  data-testid="button-mobile-menu"
                  aria-label="Open mobile navigation menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              
              <SheetContent side="right" className="w-full sm:w-96 p-0">
                <div className="flex flex-col h-full bg-white dark:bg-gray-950">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={logoPath} 
                        alt="Premier Party Cruises" 
                        className="h-10 w-auto"
                      />
                      <div>
                        <div className="text-lg font-heading font-bold text-gray-900 dark:text-white tracking-wider" data-editable data-editable-id="mobile-header-title">
                          PREMIER PARTY
                </div>
                        <div className="text-xs text-brand-blue font-semibold tracking-widest" data-editable data-editable-id="mobile-header-subtitle">
                          CRUISES
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={closeMobileMenu}
                      className="p-2"
                      data-testid="button-close-mobile-menu"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex-1 py-6 overflow-y-auto">
                    <div className="space-y-2 px-6">
                      {navigationItems.map((item) => (
                        <div key={item.href}>
                          {item.hasDropdown ? (
                            <>
                              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-4" data-editable data-editable-id={`mobile-dropdown-${safeSlug(item.title)}-header`}>
                                {item.title}
                              </div>
                              {item.dropdownItems?.map((dropdownItem, index) => {
                                if (isSection(dropdownItem)) {
                                  return (
                                    <div key={`section-mobile-${index}`} className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-4 mb-2 px-4" data-editable data-editable-id={`mobile-section-${safeSlug(dropdownItem.section)}`}>
                                      {dropdownItem.section}
                                    </div>
                                  );
                                } else if (isLink(dropdownItem)) {
                                  const Icon = dropdownItem.icon;
                                  const getMobileTestId = () => {
                                    if (dropdownItem.title === 'AI Endorsements') return 'nav-ai-authority';
                                    if (dropdownItem.title === 'Market Analysis') return 'nav-market-analysis';
                                    return `link-mobile-${safeSlug(dropdownItem.title)}`;
                                  };
                                  return (
                                    <Link
                                      key={dropdownItem.href}
                                      href={dropdownItem.href}
                                      onClick={closeMobileMenu}
                                      className={cn(
                                        "flex items-center space-x-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-300",
                                        location === dropdownItem.href
                                          ? "text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue"
                                          : "text-gray-700 dark:text-gray-300 hover:text-brand-blue hover:bg-brand-blue/5"
                                      )}
                                      data-testid={getMobileTestId()}
                                    >
                                      <Icon className="h-5 w-5" />
                                      <span className="flex-1" data-editable data-editable-id={`mobile-dropdown-${safeSlug(dropdownItem.title)}`}>{dropdownItem.title}</span>
                                      <ArrowRight className="h-4 w-4 opacity-50" />
                                    </Link>
                                  );
                                }
                                return null;
                              })}
                            </>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={closeMobileMenu}
                              className={cn(
                                "flex items-center space-x-3 w-full px-4 py-4 rounded-xl font-semibold text-lg transition-all duration-300",
                                location === item.href
                                  ? "text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue"
                                  : "text-gray-700 dark:text-gray-300 hover:text-brand-blue hover:bg-brand-blue/5"
                              )}
                              data-testid={`link-mobile-${safeSlug(item.title)}`}
                            >
                              <item.icon className="h-5 w-5" />
                              <span className="flex-1 tracking-wide" data-editable data-editable-id={`mobile-nav-${safeSlug(item.title)}`}>{item.title}</span>
                              {item.badge && (
                                <span className="px-2 py-1 text-xs font-bold bg-brand-yellow text-black rounded-full" data-editable data-editable-id={`mobile-badge-${safeSlug(item.title)}`}>
                                  {item.badge}
                                </span>
                              )}
                              <ArrowRight className="h-4 w-4 opacity-50" />
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile CTA Buttons */}
                  <div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
                    <Button
                      onClick={() => {
                        handleGetQuote();
                        closeMobileMenu();
                      }}
                      variant="outline"
                      className="w-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold py-4 text-lg tracking-wide"
                      data-testid="button-mobile-get-quote"
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      <span data-editable data-editable-id="mobile-get-quote-button">GET QUOTE</span>
                    </Button>
                    
                    <Button
                      onClick={() => {
                        handleBookNow();
                        closeMobileMenu();
                      }}
                      className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold py-4 text-lg tracking-wide shadow-lg"
                      data-testid="button-mobile-book-now"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      <span data-editable data-editable-id="mobile-book-now-button">BOOK NOW</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}