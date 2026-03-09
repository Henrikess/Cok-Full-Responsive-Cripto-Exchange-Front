'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';

export default function Header() {
  const [lastUpdated] = useState<string>(new Date().toISOString());

  return (
    <header className="bg-surface-card border-b border-surface-border px-6 py-4 flex items-center justify-between">
      <p className="text-sm text-gray-400">
        Atualizado: <span className="text-gray-300">{formatDate(lastUpdated)}</span>
      </p>
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-orange transition-colors"
      >
        <span>↻</span>
        Atualizar
      </button>
    </header>
  );
}
