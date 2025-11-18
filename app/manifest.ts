import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mehdi's Life",
    short_name: "Mehdi's Life",
    description:
      "Portfolio personnel de Mehdi - Projets, voyages, études et expériences",
    start_url: "/",
    display: "standalone",
    background_color: "#141414",
    theme_color: "#E50914",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
