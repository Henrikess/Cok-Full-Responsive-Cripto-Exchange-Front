import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ className, children }: CardProps) {
  return (
    <div className={cn('bg-surface-card border border-surface-border rounded-xl p-5', className)}>
      {children}
    </div>
  );
}
