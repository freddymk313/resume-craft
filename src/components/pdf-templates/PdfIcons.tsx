import { Svg, Path, Circle } from "@react-pdf/renderer";

const SIZE = 10;
const COLOR = "#6b7280";

export const PdfEmailIcon = ({ color = COLOR, size = SIZE }: { color?: string; size?: number }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={2} fill="none" />
    <Path d="M22 6l-10 7L2 6" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);

export const PdfPhoneIcon = ({ color = COLOR, size = SIZE }: { color?: string; size?: number }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);

export const PdfLocationIcon = ({ color = COLOR, size = SIZE }: { color?: string; size?: number }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth={2} fill="none" />
    <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);

export const PdfWebsiteIcon = ({ color = COLOR, size = SIZE }: { color?: string; size?: number }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} fill="none" />
    <Path d="M2 12h20" stroke={color} strokeWidth={2} fill="none" />
    <Path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);

export const PdfLinkedinIcon = ({ color = COLOR, size = SIZE }: { color?: string; size?: number }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke={color} strokeWidth={2} fill="none" />
    <Path d="M2 9h4v12H2z" stroke={color} strokeWidth={2} fill="none" />
    <Circle cx="4" cy="4" r="2" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);
