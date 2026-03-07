import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Votre Nom — Developer & Founder",
  description: "Portfolio & projets — e-commerce, app mobile, app bureautique.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
