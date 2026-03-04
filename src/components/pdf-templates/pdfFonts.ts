import { Font } from "@react-pdf/renderer";

// Montserrat - using raw GitHub ttf files that are guaranteed to work
Font.register({
  family: "Montserrat",
  fonts: [
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/montserrat@latest/latin-400-normal.ttf", fontWeight: 400 },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/montserrat@latest/latin-600-normal.ttf", fontWeight: 600 },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/montserrat@latest/latin-700-normal.ttf", fontWeight: 700 },
  ],
});

Font.register({
  family: "OpenSans",
  fonts: [
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-400-normal.ttf", fontWeight: 400 },
    { src: "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-600-normal.ttf", fontWeight: 600 },
  ],
});

export const HEADING_FONT = "Montserrat";
export const BODY_FONT = "OpenSans";
