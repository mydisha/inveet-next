import StandardFormLayout from '@/components/dashboard/StandardFormLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Head } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import OnboardingProgress, { OnboardingStep } from './OnboardingProgress';

interface OnboardingLayoutProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  steps: OnboardingStep[];
  currentStep: string;
  user?: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';
}

export default function OnboardingLayout({
  title,
  description,
  icon,
  steps,
  currentStep,
  user,
  children,
  onSubmit,
  submitLabel = 'Next',
  isSubmitting = false,
  showBackButton = false,
  onBackClick,
  maxWidth = '6xl'
}: OnboardingLayoutProps) {
  // Mark steps as completed, current, or upcoming
  const processedSteps = steps.map((step, index) => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    return {
      ...step,
      completed: index < currentIndex,
      current: index === currentIndex
    };
  });

  return (
    <>
      <Head title={`${title} - Onboarding`} />

      <DashboardLayout user={user || null} currentPath={`/onboarding/${currentStep}`}>
        <StandardFormLayout
          title={title}
          description={description}
          onSubmit={onSubmit}
          submitLabel={submitLabel}
          isSubmitting={isSubmitting}
          icon={icon}
          maxWidth={maxWidth}
          onCancel={showBackButton ? onBackClick : undefined}
          cancelLabel={showBackButton ? 'Previous' : undefined}
        >
          {/* Progress Bar */}
          <OnboardingProgress steps={processedSteps} />

          {/* Step Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              {icon && (
                <div className="icon-container icon-gradient-1">
                  <icon className="w-5 h-5" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold">{title}</h2>
                {description && (
                  <p className="text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Page Content */}
          {children}
        </StandardFormLayout>
      </DashboardLayout>
    </>
  );
}
