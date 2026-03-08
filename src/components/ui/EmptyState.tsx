interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
}

export default function EmptyState({
  title = 'Nenhum dado',
  message = 'Não há informações para exibir no momento.',
  icon = '📭',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-4xl mb-4">{icon}</span>
      <p className="text-gray-300 font-medium">{title}</p>
      <p className="text-gray-500 text-sm mt-1">{message}</p>
    </div>
  );
}
