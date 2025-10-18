import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TOCSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface TableOfContentsProps {
  sections: TOCSection[];
  className?: string;
}

export function TableOfContents({ sections, className }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      // Close mobile menu after selection
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full shadow-xl bg-gradient-to-r from-brand-blue to-purple-600 hover:from-brand-blue/90 hover:to-purple-600/90"
          data-testid="button-mobile-toc-toggle"
        >
          <Menu className="h-5 w-5 mr-2" />
          Menu
          {isOpen ? <ChevronDown className="h-4 w-4 ml-2" /> : <ChevronUp className="h-4 w-4 ml-2" />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold font-playfair">Quick Navigation</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  data-testid="button-close-mobile-toc"
                >
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3",
                      activeSection === section.id
                        ? "bg-brand-blue text-white font-semibold shadow-md"
                        : "hover:bg-blue-50 dark:hover:bg-gray-800"
                    )}
                    data-testid={`toc-mobile-${section.id}`}
                  >
                    {section.icon && <span className="flex-shrink-0">{section.icon}</span>}
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <div className={cn(
        "hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto",
        className
      )}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            On This Page
          </h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg transition-all text-sm flex items-center gap-2",
                  activeSection === section.id
                    ? "bg-brand-blue text-white font-semibold"
                    : "hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                )}
                data-testid={`toc-desktop-${section.id}`}
              >
                {section.icon && <span className="flex-shrink-0 text-base">{section.icon}</span>}
                <span className="line-clamp-2">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
