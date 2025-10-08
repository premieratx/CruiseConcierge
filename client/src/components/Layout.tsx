import Navigation from './Navigation';
import { useLocation } from 'wouter';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  // Calculate dynamic padding based on header height
  // Main header: 64px (h-16), Sub-navigation: 48px (h-12)
  const hasSubNav = location === '/leads';
  const topPadding = hasSubNav ? 'pt-28' : 'pt-16'; // 112px vs 64px

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Main content area with dynamic padding for fixed nav */}
      <main className={`${topPadding} transition-all duration-200`} data-testid="main-content">
        {children}
      </main>
    </div>
  );
}