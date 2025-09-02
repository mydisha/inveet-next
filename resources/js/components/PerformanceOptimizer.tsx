import { useEffect, useState } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const PerformanceOptimizer = ({ children }: PerformanceOptimizerProps) => {
  const [isLowSpec, setIsLowSpec] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for low-spec device indicators
    const checkDeviceSpecs = () => {
      const isMobile = window.innerWidth <= 768;
      const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2;
      const isSlowConnection = (navigator as any).connection && 
        ((navigator as any).connection.effectiveType === 'slow-2g' || 
         (navigator as any).connection.effectiveType === '2g');
      
      return isMobile || isLowMemory || isSlowConnection;
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    setIsLowSpec(checkDeviceSpecs());
    setPrefersReducedMotion(checkReducedMotion());

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply performance optimizations based on device capabilities
  const getOptimizedClassName = (baseClassName: string) => {
    if (prefersReducedMotion || isLowSpec) {
      return `${baseClassName} performance-optimized`;
    }
    return baseClassName;
  };

  return (
    <div 
      className={getOptimizedClassName('')}
      data-low-spec={isLowSpec}
      data-reduced-motion={prefersReducedMotion}
    >
      {children}
    </div>
  );
};

export default PerformanceOptimizer;
