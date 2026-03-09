interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Ocorreu um erro ao carregar os dados.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-4xl mb-4">⚠️</span>
      <p className="text-red-400 font-medium">Erro</p>
      <p className="text-gray-400 text-sm mt-1">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 text-brand-orange hover:text-orange-400 text-sm font-medium"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
