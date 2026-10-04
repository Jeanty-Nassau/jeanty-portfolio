import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PageTransitionProvider } from "@/components/motion/page-transition-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteConfig } from "@/content/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Jeanty Nassau — Software Developer",
    template: "%s — Jeanty Nassau",
  },

  description:
    "Software Developer in Cape Town focused on backend systems, distributed systems, .NET, AWS, Kafka, PostgreSQL, and creative coding.",

  openGraph: {
    title: "Jeanty Nassau — Software Developer",
    description:
      "Backend and distributed systems engineer with a creative-coding side.",
    type: "website",
    locale: "en_ZA",
    siteName: "Jeanty Nassau",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jeanty Nassau — Software Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Jeanty Nassau — Software Developer",
    description:
      "Backend and distributed systems engineer with a creative-coding side.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
