export const dynamic = 'force-dynamic';

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Ativos</h1>
        <p className="text-gray-400 text-sm mt-1">Seus saldos por ativo</p>
      </div>
      <div className="bg-surface-card border border-surface-border rounded-xl p-6">
        <p className="text-gray-400 text-center py-8">Carregando ativos...</p>
      </div>
    </div>
  );
}
