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
import logoPath from '@assets/PPC logo 2023_1758097465959.png';
import { 
  Menu, X, Ship, Calendar, MessageSquare, Phone, 
  Users, Camera, Heart, ArrowRight, Star,
  Building, Cake, ChevronDown
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Home',
    href: '/',
    icon: Ship
  },
  {
    title: 'Bachelor Party',
    href: '/bachelor-party',
    icon: Users,
    badge: 'New!'
  },
  {
    title: 'Bachelorette Party',
    href: '/bachelorette-party',
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
        title: 'Corporate Events',
        href: '/corporate-events',
        description: 'Team building & client entertainment',
        icon: Building
      },
      {
        title: 'Birthday Parties',
        href: '/birthday-parties',
        description: 'Celebrate on the water',
        icon: Cake
      },
      {
        title: 'Wedding Parties',
        href: '/wedding-parties',
        description: 'Rehearsal dinners & celebrations',
        icon: Heart
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
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center space-x-3 group"
              data-testid="link-home-logo"
            >
              <div className="relative">
                <img 
                  src={logoPath} 
                  alt="Premier Party Cruises" 
                  className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-heading font-bold text-gray-900 dark:text-white tracking-wider">
                  PREMIER PARTY CRUISES
                </div>
                <div className="text-xs text-brand-blue font-semibold tracking-widest">
                  AUSTIN'S ORIGINAL LAKE PARTY
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="flex items-center space-x-2">
                {navigationItems.map((item) => (
                  item.hasDropdown ? (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuTrigger className={cn(
                        "flex items-center space-x-2 px-4 py-2 font-semibold",
                        location.startsWith('/private-cruises') || 
                        location.startsWith('/corporate-events') ||
                        location.startsWith('/birthday-parties') ||
                        location.startsWith('/wedding-parties')
                          ? "text-brand-blue"
                          : "text-gray-700 dark:text-gray-300"
                      )}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <li key={dropdownItem.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={dropdownItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  data-testid={`link-dropdown-${dropdownItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <dropdownItem.icon className="h-4 w-4 text-brand-blue" />
                                    <div className="text-sm font-medium leading-none">{dropdownItem.title}</div>
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {dropdownItem.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "flex items-center space-x-2 font-semibold",
                          location === item.href
                            ? "text-brand-blue bg-brand-blue/10"
                            : "text-gray-700 dark:text-gray-300"
                        )}
                        data-testid={`link-nav-${item.title.toLowerCase().replace(' ', '-')}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-2 px-2 py-1 text-xs font-bold bg-brand-yellow text-black rounded-full">
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
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleGetQuote}
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold px-6 py-2 tracking-wide"
                data-testid="button-header-get-quote"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                GET QUOTE
              </Button>
              
              <Button
                onClick={handleBookNow}
                className="bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold px-6 py-2 tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
                data-testid="button-header-book-now"
              >
                <Calendar className="mr-2 h-4 w-4" />
                BOOK NOW
                <ArrowRight className="ml-2 h-4 w-4" />
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
                        <div className="text-lg font-heading font-bold text-gray-900 dark:text-white tracking-wider">
                          PREMIER PARTY
                        </div>
                        <div className="text-xs text-brand-blue font-semibold tracking-widest">
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
                              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-4">
                                {item.title}
                              </div>
                              {item.dropdownItems?.map((dropdownItem) => (
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
                                  data-testid={`link-mobile-${dropdownItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  <dropdownItem.icon className="h-5 w-5" />
                                  <span className="flex-1">{dropdownItem.title}</span>
                                  <ArrowRight className="h-4 w-4 opacity-50" />
                                </Link>
                              ))}
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
                              data-testid={`link-mobile-${item.title.toLowerCase().replace(' ', '-')}`}
                            >
                              <item.icon className="h-5 w-5" />
                              <span className="flex-1 tracking-wide">{item.title}</span>
                              {item.badge && (
                                <span className="px-2 py-1 text-xs font-bold bg-brand-yellow text-black rounded-full">
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
                      GET QUOTE
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
                      BOOK NOW
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
      <div className="h-20" />
    </>
  );
}