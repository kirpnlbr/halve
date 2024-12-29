import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Halve",
  description: "Maintain your log of receipts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
