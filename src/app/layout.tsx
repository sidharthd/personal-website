import type { Metadata } from "next";
import { Arvo, Lato } from "next/font/google";
import "./globals.css";

const arvo = Arvo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-arvo",
});
const lato = Lato({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Sidharth D",
  description: "Personal website of software developer Sidharth D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${arvo.variable} ${lato.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
