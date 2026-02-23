/**
 * src/shared/components/Badge.tsx
 *
 * [Shared Component]
 * Badge - ステータス表示用の pill 型タグ
 */

'use client';

import { type FC } from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';

export type BadgeVariant = 'critical' | 'warning' | 'info' | 'success';

export interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, {
  bg: string;
  text: string;
  border: string;
  icon: typeof AlertCircle;
}> = {
  critical: {
    bg: 'bg-red-500/10',
    text: 'text-red-500',
    border: 'border-red-500/20',
    icon: AlertCircle,
  },
  warning: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    border: 'border-amber-500/20',
    icon: AlertTriangle,
  },
  info: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-500',
    border: 'border-purple-500/20',
    icon: Info,
  },
  success: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    border: 'border-emerald-500/20',
    icon: CheckCircle,
  },
};

export const Badge: FC<BadgeProps> = ({
  variant,
  children,
  showIcon = true,
  className = '',
}) => {
  const styles = VARIANT_STYLES[variant];
  const Icon = styles.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1
        px-2.5 py-0.5
        rounded-full
        border
        text-xs font-medium
        ${styles.bg}
        ${styles.text}
        ${styles.border}
        ${className}
      `}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

export default Badge;
