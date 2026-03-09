import { Suspense } from 'react';
import LoadingState from '@/components/ui/LoadingState';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Visão geral da sua conta</p>
      </div>
      <Suspense fallback={<LoadingState />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Cards will be populated with real data */}
          <div className="bg-surface-card border border-surface-border rounded-xl p-5">
            <p className="text-gray-400 text-sm">Patrimônio Total</p>
            <p className="text-2xl font-bold text-white mt-1">—</p>
          </div>
          <div className="bg-surface-card border border-surface-border rounded-xl p-5">
            <p className="text-gray-400 text-sm">Ativos</p>
            <p className="text-2xl font-bold text-white mt-1">—</p>
          </div>
          <div className="bg-surface-card border border-surface-border rounded-xl p-5">
            <p className="text-gray-400 text-sm">Ordens Abertas</p>
            <p className="text-2xl font-bold text-white mt-1">—</p>
          </div>
          <div className="bg-surface-card border border-surface-border rounded-xl p-5">
            <p className="text-gray-400 text-sm">Última Atualização</p>
            <p className="text-sm font-medium text-brand-orange mt-1">—</p>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
