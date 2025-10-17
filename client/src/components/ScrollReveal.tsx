import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  threshold = 0.1
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce: true });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={variants}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface StaggeredScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredScrollReveal({
  children,
  className,
  staggerDelay = 0.1
}: StaggeredScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {Array.isArray(children)
          ? children.map((child, index) => (
              <motion.div key={index} variants={itemVariants}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={itemVariants}>{children}</motion.div>
        }
      </motion.div>
    </div>
  );
}
