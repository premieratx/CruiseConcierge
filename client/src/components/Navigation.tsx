import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, Users, FileText, MessageSquare, Calendar,
  DollarSign, Settings, Ship, TrendingUp, Mail, Phone,
  ChevronDown, Plus, Search, Bell, User, LogOut, Building,
  CreditCard, Briefcase, Star, FileBarChart, Database, ArrowLeft, Home,
  AlertCircle, Code, UserCheck, FolderOpen, Receipt, BookOpen
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const mainNavItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    description: 'Overview and analytics',
  },
  {
    title: 'Leads',
    href: '/leads',
    icon: Users,
    description: 'Customer management and pipeline',
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: Calendar,
    description: 'Bookings and availability',
  },
  {
    title: 'Quotes',
    href: '/quotes',
    icon: FileText,
    description: 'Quote management and templates',
  },
  {
    title: 'Invoices',
    href: '/invoices',
    icon: Receipt,
    description: 'Invoice management and payments',
  },
  {
    title: 'Blog',
    href: '/blog',
    icon: BookOpen,
    description: 'Blog posts and content management',
    subItems: [
      { title: 'View Blog', href: '/blog', description: 'Public blog page' },
      { title: 'Manage Posts', href: '/admin/blog', description: 'Manage blog posts' },
      { title: 'Create Post', href: '/admin/blog/posts/new', description: 'Create new blog post' }
    ]
  },
];

export default function Navigation() {
  const [location, setLocation] = useLocation();

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Back Button and Logo */}
        <div className="mr-8 flex items-center space-x-3">
          {/* Visible Back Button */}
          {location !== '/' && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setLocation('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              data-testid="button-back-dashboard"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline-block">Back</span>
            </Button>
          )}
          
          {/* Logo - also clickable to go back to dashboard */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setLocation('/')}
            data-testid="link-logo-dashboard"
          >
            <Ship className="h-6 w-6 text-primary" />
            <span className="hidden font-bold text-xl lg:inline-block">
              Premier CRM
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <NavigationMenu className="mr-auto">
          <NavigationMenuList>
            {/* Main Nav Items */}
            {mainNavItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link 
                    href={item.href}
                    className={cn(
                      'group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                      location === item.href && 'bg-accent text-accent-foreground'
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {/* Settings Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-2 p-3">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/products"
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <div className="text-sm font-medium">Products & Pricing</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/embed-widgets"
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          <div className="text-sm font-medium">Embed Widgets</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/chat"
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <div className="text-sm font-medium">AI Chat Assistant</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/projects"
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <FolderOpen className="h-4 w-4" />
                          <div className="text-sm font-medium">Projects Overview</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/partial-leads"
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4" />
                          <div className="text-sm font-medium">Partial Leads</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/book"
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Public Booking Page</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/settings"
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          <div className="text-sm font-medium">Admin Settings</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-foreground">
                  <User className="h-4 w-4 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@premierpartycruises.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLocation('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Admin Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
    </>
  );
}