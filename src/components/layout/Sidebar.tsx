'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/assets', label: 'Ativos', icon: '💰' },
  { href: '/orders', label: 'Ordens', icon: '📋' },
  { href: '/bot', label: 'Bot', icon: '🤖' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-surface-card border-r border-surface-border flex flex-col">
      <div className="p-6 border-b border-surface-border">
        <h2 className="text-lg font-bold text-white">Dashboard MB</h2>
        <p className="text-xs text-gray-400 mt-0.5">Mercado Bitcoin</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'bg-brand-orange text-white'
                : 'text-gray-400 hover:text-white hover:bg-surface-border'
            )}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-surface-border">
        <p className="text-xs text-gray-500 text-center">v1.0.0</p>
      </div>
    </aside>
  );
}
