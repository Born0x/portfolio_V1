"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-netflix-black px-4">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-netflix-red/10 p-6">
            <AlertTriangle className="h-16 w-16 text-netflix-red" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mb-4 text-4xl font-bold text-white">
          Oups ! Une erreur est survenue
        </h1>
        <p className="mb-2 text-lg text-muted-foreground">
          Quelque chose s'est mal passé
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 rounded-lg bg-netflix-dark-gray p-4 text-left">
            <p className="text-sm font-mono text-red-400">
              {error.message || "Une erreur inattendue s'est produite"}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-netflix-red px-6 py-3 text-white transition-all hover:bg-[#c0000d] hover:shadow-lg"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="rounded-lg border border-netflix-divider bg-transparent px-6 py-3 text-white transition-colors hover:bg-[#2a2a2a]"
          >
            Retour à l'accueil
          </a>
        </div>

        {/* Additional Info */}
        {error.digest && (
          <p className="mt-6 text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
