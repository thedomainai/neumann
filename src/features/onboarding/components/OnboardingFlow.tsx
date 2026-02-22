/**
 * src/features/onboarding/components/OnboardingFlow.tsx
 *
 * [Feature Component]
 * オンボーディングフロー - 全体のオーケストレーター
 */

'use client';

import { type FC, useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { SampleExperience } from './SampleExperience';
import { NextSteps } from './NextSteps';

type OnboardingStep = 'welcome' | 'experience' | 'next-steps';

export interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');

  const handleStart = () => {
    setCurrentStep('experience');
  };

  const handleExperienceComplete = () => {
    setCurrentStep('next-steps');
  };

  const handleSkip = () => {
    onComplete();
  };

  switch (currentStep) {
    case 'welcome':
      return <WelcomeScreen onStart={handleStart} />;
    case 'experience':
      return <SampleExperience onComplete={handleExperienceComplete} />;
    case 'next-steps':
      return <NextSteps onSkip={handleSkip} />;
  }
};

export default OnboardingFlow;
