export const dynamic = 'force-dynamic';

export default function BotPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Bot</h1>
        <p className="text-gray-400 text-sm mt-1">Status e configurações do robô</p>
      </div>
      <div className="bg-surface-card border border-surface-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">🤖</span>
          <div>
            <p className="text-white font-medium">Robô de Trading</p>
            <p className="text-gray-400 text-sm">Integração disponível em versão futura</p>
          </div>
        </div>
        <div className="border-t border-surface-border pt-4">
          <p className="text-gray-500 text-sm text-center">
            Área reservada para configurações e controle do bot
          </p>
        </div>
      </div>
    </div>
  );
}
