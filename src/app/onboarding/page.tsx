/**
 * src/app/onboarding/page.tsx
 *
 * [App Router Page]
 * オンボーディングページ
 */

'use client';

import { useRouter } from 'next/navigation';
import { OnboardingFlow } from '@/features/onboarding';

export default function OnboardingPage() {
  const router = useRouter();

  const handleComplete = () => {
    // オンボーディング完了フラグを localStorage に保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('neumann_onboarding_completed', 'true');
    }
    // ダッシュボードへリダイレクト
    router.push('/');
  };

  return <OnboardingFlow onComplete={handleComplete} />;
}
