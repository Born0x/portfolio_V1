"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
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
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#141414",
            padding: "1rem",
          }}
        >
          <div style={{ width: "100%", maxWidth: "28rem", textAlign: "center" }}>
            {/* Error Icon */}
            <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  borderRadius: "9999px",
                  backgroundColor: "rgba(229, 9, 20, 0.1)",
                  padding: "1.5rem",
                }}
              >
                <AlertTriangle
                  style={{ width: "4rem", height: "4rem", color: "#E50914" }}
                />
              </div>
            </div>

            {/* Error Message */}
            <h1
              style={{
                marginBottom: "1rem",
                fontSize: "2.25rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Erreur Critique
            </h1>
            <p style={{ marginBottom: "0.5rem", fontSize: "1.125rem", color: "#A3A3A3" }}>
              Une erreur inattendue s'est produite
            </p>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === "development" && (
              <div
                style={{
                  marginBottom: "1.5rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "#0F0F0F",
                  padding: "1rem",
                  textAlign: "left",
                }}
              >
                <p style={{ fontSize: "0.875rem", fontFamily: "monospace", color: "#EF4444" }}>
                  {error.message || "Une erreur critique s'est produite"}
                </p>
              </div>
            )}

            {/* Actions */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <button
                onClick={reset}
                style={{
                  borderRadius: "0.5rem",
                  backgroundColor: "#E50914",
                  padding: "0.75rem 1.5rem",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "500",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#c0000d";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#E50914";
                }}
              >
                Réessayer
              </button>
              <a
                href="/"
                style={{
                  borderRadius: "0.5rem",
                  border: "1px solid #232323",
                  backgroundColor: "transparent",
                  padding: "0.75rem 1.5rem",
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: "500",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#2a2a2a";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Retour à l'accueil
              </a>
            </div>

            {/* Additional Info */}
            {error.digest && (
              <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#737373" }}>
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
