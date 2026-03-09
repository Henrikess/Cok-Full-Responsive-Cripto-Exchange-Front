export default function LoadingState({ message = 'Carregando...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-surface-border border-t-brand-orange rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
}
