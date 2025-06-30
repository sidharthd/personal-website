import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DesignProvider } from "@/contexts/DesignContext";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sidharth Devaraj - Software Engineer",
  description:
    "Frontend specialist bridging technical excellence and product strategy",
  keywords: [
    "Sidharth Devaraj",
    "Software Engineer",
    "Frontend Developer",
    "React Developer",
    "TypeScript",
    "JavaScript",
    "Frontend Specialist",
    "Software Engineer",
    "Web Developer",
    "UI/UX Developer",
    "Full Stack Developer",
    "Remote Developer",
    "India",
    "Thiruvananthapuram",
  ],
  authors: [{ name: "Sidharth Devaraj" }],
  creator: "Sidharth Devaraj",
  publisher: "Sidharth Devaraj",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sidh.dev",
    title: "Sidharth Devaraj - Software Engineer",
    description:
      "Frontend specialist bridging technical excellence and product strategy",
    siteName: "Sidharth Devaraj Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sidharth Devaraj - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidharth Devaraj - Software Engineer",
    description:
      "Frontend specialist bridging technical excellence and product strategy",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sidh.dev",
  },
  category: "technology",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f43f5e" />
        <link rel="canonical" href="https://sidh.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sidharth Devaraj",
              jobTitle: "Software Engineer",
              description:
                "Software Engineer and Frontend Specialist with 7+ years of experience",
              url: "https://sidh.dev",
              email: "sidharth@sidh.dev",
              telephone: "+91-97461-63694",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Thiruvananthapuram",
                addressCountry: "India",
              },
              sameAs: [
                "https://linkedin.com/in/sidharth/",
                "https://github.com/sidharth",
              ],
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Frontend Development",
                "Software Engineering",
                "Web Development",
                "User Interface Design",
              ],
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "College of Engineering, Thiruvananthapuram",
                  description: "M.Tech in Information Security",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "College of Engineering, Chengannur",
                  description: "B.Tech in Computer Science",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <DesignProvider>{children}</DesignProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
