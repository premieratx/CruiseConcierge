import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, Users, FileText, MessageSquare, Calendar,
  DollarSign, Settings, Ship, TrendingUp, Mail, Phone,
  ChevronDown, Plus, Search, Bell, User, LogOut, Building,
  CreditCard, Briefcase, Star, FileBarChart, Database
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
    description: 'Manage your sales pipeline',
    badge: 'New',
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: Briefcase,
    description: 'Active bookings and events',
  },
  {
    title: 'Quotes',
    href: '/quotes',
    icon: FileText,
    description: 'Create and manage quotes',
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: Calendar,
    description: 'Availability and schedule',
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageSquare,
    description: 'AI booking assistant',
    badge: 'Live',
  },
];

const quickActions = [
  { label: 'New Lead', icon: Plus, href: '/leads?action=new' },
  { label: 'Create Quote', icon: FileText, href: '/quotes/new' },
  { label: 'Check Availability', icon: Calendar, href: '/calendar' },
  { label: 'View Reports', icon: FileBarChart, href: '/reports' },
];

export default function Navigation() {
  const [location, setLocation] = useLocation();

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo - clickable to go back to dashboard */}
        <div 
          className="mr-8 flex items-center space-x-2 cursor-pointer"
          onClick={() => setLocation('/')}
        >
          <Ship className="h-6 w-6 text-primary" />
          <span className="hidden font-bold text-xl lg:inline-block">
            Premier CRM
          </span>
        </div>

        {/* Main Navigation */}
        <NavigationMenu className="mr-auto">
          <NavigationMenuList>
            {/* Quick Actions Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Create
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {quickActions.map((action) => (
                    <li key={action.label}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={action.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <action.icon className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">
                              {action.label}
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

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
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
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
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/templates"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <div>
                            <div className="text-sm font-medium leading-none">Templates</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Quote templates
                            </p>
                          </div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/products"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <div>
                            <div className="text-sm font-medium leading-none">Products & Pricing</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Product catalog
                            </p>
                          </div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/discounts"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          <div>
                            <div className="text-sm font-medium leading-none">Discount Codes</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Promo codes
                            </p>
                          </div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/affiliates"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <div>
                            <div className="text-sm font-medium leading-none">Affiliates</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Referral partners
                            </p>
                          </div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/documentation"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <div>
                            <div className="text-sm font-medium leading-none">Documentation</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Pricing rules & workflow
                            </p>
                          </div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="col-span-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/settings"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-muted"
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          <div>
                            <div className="text-sm font-medium leading-none">Template Manager</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Manage quote templates, email templates, and global settings
                            </p>
                          </div>
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
        <div className="flex items-center space-x-4">
          {/* Search */}
          <Button variant="ghost" size="icon" className="relative">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
            <span className="sr-only">Notifications</span>
          </Button>

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
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" />
                <span>Organization</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Database className="mr-2 h-4 w-4" />
                <span>Integrations</span>
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

      {/* Sub-navigation based on current page */}
      {location === '/leads' && (
        <div className="border-t">
          <div className="container flex h-12 items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Users className="mr-2 h-4 w-4" />
              All Leads
            </Button>
            <Button variant="ghost" size="sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              Pipeline
            </Button>
            <Button variant="ghost" size="sm">
              <Star className="mr-2 h-4 w-4" />
              Hot Leads
            </Button>
            <Button variant="ghost" size="sm">
              <FileBarChart className="mr-2 h-4 w-4" />
              Reports
            </Button>
          </div>
        </div>
      )}
    </header>
    </>
  );
}