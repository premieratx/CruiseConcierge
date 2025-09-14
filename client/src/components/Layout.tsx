import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Main content area with padding for fixed nav */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}