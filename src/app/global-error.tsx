'use client';

import './globals.css'; // MUST IMPORT THIS HERE
import { ServerCrash } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white selection:bg-primary/30 antialiased">
        <div className="relative flex flex-col items-center text-center px-6 max-w-xl">
          {/* Subtle glowing animated background effect */}
          <div className="absolute -z-10 h-40 w-40 animate-pulse rounded-full bg-red-500/10 blur-[80px]" />
          
          <div className="mb-8 rounded-full border border-red-500/20 bg-red-500/10 p-4">
            <ServerCrash className="h-8 w-8 text-red-400" strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            We're currently offline.
          </h1>
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
            Our infrastructure is temporarily down for unscheduled maintenance. We are actively working on restoring the servers. You don't need to do anything—we'll be back shortly.
          </p>

          <button
            type="button"
            onClick={() => reset()}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent px-8 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black"
          >
            Refresh Status
          </button>
        </div>
      </body>
    </html>
  );
}