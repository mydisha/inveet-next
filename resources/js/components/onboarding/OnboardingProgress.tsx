import { Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export interface OnboardingStep {
  id: string;
  title: string;
  href: string;
  completed?: boolean;
  current?: boolean;
}

interface OnboardingProgressProps {
  steps: OnboardingStep[];
  currentStepId: string;
  className?: string;
}

export default function OnboardingProgress({ steps, currentStepId, className = '' }: OnboardingProgressProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-center space-x-2 sm:space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <Link href={step.href} className="flex items-center group">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
                index < currentStepIndex
                  ? 'bg-green-500 text-white shadow-lg ring-2 ring-green-200' // Completed
                  : index === currentStepIndex
                    ? 'bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/20' // Current
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary group-hover:ring-2 group-hover:ring-primary/10' // Upcoming
              }`}>
                {index < currentStepIndex ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : index + 1}
              </div>
              <span className={`ml-2 text-xs sm:text-sm font-medium hidden sm:block transition-colors duration-300 ${
                index === currentStepIndex
                  ? 'text-foreground font-semibold'
                  : 'text-muted-foreground group-hover:text-primary'
              }`}>
                {step.title}
              </span>
            </Link>
            {index < steps.length - 1 && (
              <div className={`w-8 sm:w-12 h-1 rounded-full transition-colors duration-300 ${
                index < currentStepIndex ? 'bg-green-500' : 'bg-muted'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Predefined step configurations for different onboarding flows
export const ONBOARDING_STEPS = {
  main: [
    { id: 'couple-info', title: 'Couple Info', href: '/onboarding/couple-info' },
    { id: 'wedding-location', title: 'Wedding & Location', href: '/onboarding/wedding-location' },
    { id: 'design-selection', title: 'Design', href: '/onboarding/design-selection' },
    { id: 'wedding-url', title: 'URL', href: '/onboarding/wedding-url' },
  ] as OnboardingStep[],
  alternative: [
    { id: 'couple-info', title: 'Couple Info', href: '/onboarding/couple-info' },
    { id: 'wedding-details', title: 'Wedding Details', href: '/onboarding/wedding-details' },
    { id: 'custom-url', title: 'Custom URL', href: '/onboarding/custom-url' },
    { id: 'design-selection', title: 'Design', href: '/onboarding/design-selection' },
    { id: 'activation', title: 'Activation', href: '/onboarding/activation' },
  ] as OnboardingStep[]
};
