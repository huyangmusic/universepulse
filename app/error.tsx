'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">💫</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2 font-syne">
          Something went wrong
        </h2>
        <p className="text-text-secondary mb-6">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg text-primary font-semibold hover:bg-primary/30 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-border/50 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
