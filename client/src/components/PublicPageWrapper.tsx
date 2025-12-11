import { ReactNode } from 'react';
import PublicNavigation from './PublicNavigation';

interface PublicPageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PublicPageWrapper({ children, className = '' }: PublicPageWrapperProps) {
  return (
    <>
      <PublicNavigation />
      <div 
        className={className}
        style={{ paddingTop: '128px' }}
      >
        {children}
      </div>
    </>
  );
}

export default PublicPageWrapper;
