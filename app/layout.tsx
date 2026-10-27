import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clothes Closet — Everyday, Elevated",
  description: "A minimal fashion storefront with an interactive clothing carousel.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
