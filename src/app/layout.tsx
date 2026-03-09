import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dashboard MB',
  description: 'Painel de acompanhamento do Mercado Bitcoin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="font-sans bg-brand-dark text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
