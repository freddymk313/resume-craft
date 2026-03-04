import { Font } from "@react-pdf/renderer";

// Register Montserrat (headings) - TTF format required by @react-pdf
Font.register({
  family: "Montserrat",
  fonts: [
    { src: "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew-Y3tcoqK5.ttf", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu173w-Y3tcoqK5.ttf", fontWeight: 700 },
  ],
});

// Register Open Sans (body) - using TTF format (not woff)
Font.register({
  family: "OpenSans",
  fonts: [
    { src: "https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVI.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVI.ttf", fontWeight: 600 },
  ],
});

export const HEADING_FONT = "Montserrat";
export const BODY_FONT = "OpenSans";
