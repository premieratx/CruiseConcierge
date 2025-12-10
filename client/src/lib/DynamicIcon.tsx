import { ComponentType, useState, useEffect } from 'react';
import { LucideProps } from 'lucide-react';

const iconCache = new Map<string, ComponentType<LucideProps>>();

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const [Icon, setIcon] = useState<ComponentType<LucideProps> | null>(
    iconCache.get(name) || null
  );

  useEffect(() => {
    if (!Icon && !iconCache.has(name)) {
      import('lucide-react').then(module => {
        const IconComponent = (module as any)[name];
        if (IconComponent) {
          iconCache.set(name, IconComponent);
          setIcon(() => IconComponent);
        }
      });
    }
  }, [name, Icon]);

  if (!Icon) {
    return <div className="w-4 h-4" {...props as any} />;
  }

  return <Icon {...props} />;
}

export default DynamicIcon;
