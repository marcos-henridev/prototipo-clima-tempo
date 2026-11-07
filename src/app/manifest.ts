import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Clima-Tempo",
    start_url: "/",
    short_name: "Clima-Tempo",
    description: "Aplicativo de previsão do tempo",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
    icons: [
      {
        src: "/IconsManifest/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/IconsManifest/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
