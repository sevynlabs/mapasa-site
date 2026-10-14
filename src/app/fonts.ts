import localFont from "next/font/local";

/** Jost — títulos e destaques (arquivos locais, sem dependência de rede no build). */
export const jost = localFont({
  src: [
    { path: "../fonts/jost-latin-wght-normal.woff2", weight: "400 700", style: "normal" },
    { path: "../fonts/jost-latin-ext-wght-normal.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-jost",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** Manrope — textos, botões, formulários e navegação. */
export const manrope = localFont({
  src: [
    { path: "../fonts/manrope-latin-wght-normal.woff2", weight: "400 800", style: "normal" },
    { path: "../fonts/manrope-latin-ext-wght-normal.woff2", weight: "400 800", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
