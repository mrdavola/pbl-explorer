import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PBL Explorer — Learn Project-Based Learning",
    short_name: "PBL Explorer",
    description:
      "An interactive learning experience for educators to master Project-Based Learning through bite-sized lessons, quizzes, and hands-on exercises.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3F0",
    theme_color: "#6B2631",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
