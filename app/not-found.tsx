import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 font-display text-8xl font-bold text-netflix-red">
          404
        </h1>
        <h2 className="mb-4 text-3xl font-bold text-white">
          Page non trouvée
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Button asChild size="lg">
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
}
