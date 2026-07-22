import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MR-ENGG | Flange Engineering Hub",
  description: "Practical engineering reference for piping flanges",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
