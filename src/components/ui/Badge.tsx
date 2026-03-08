import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/types/contracts';

const statusStyles: Record<string, string> = {
  open: 'bg-blue-900/40 text-blue-300 border-blue-800',
  executed: 'bg-green-900/40 text-green-300 border-green-800',
  cancelled: 'bg-red-900/40 text-red-300 border-red-800',
  partially_filled: 'bg-yellow-900/40 text-yellow-300 border-yellow-800',
};

const statusLabels: Record<string, string> = {
  open: 'Aberta',
  executed: 'Executada',
  cancelled: 'Cancelada',
  partially_filled: 'Parcial',
};

interface BadgeProps {
  status: OrderStatus | string;
  className?: string;
}

export default function Badge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        statusStyles[status] ?? 'bg-gray-800 text-gray-300 border-gray-700',
        className
      )}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}
