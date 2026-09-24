import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SoundProvider } from "@/components/SoundProvider";
import { portfolioData } from "@/data/portfolio";

const instagramSans = localFont({
  src: [
    {
      path: "../../public/fonts/InstagramSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/InstagramSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/InstagramSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-instagram-sans",
  display: "swap",
  preload: false,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gabrielbaiano.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${portfolioData.personal.name} · ${portfolioData.personal.role}`,
    template: `%s · ${portfolioData.personal.name}`,
  },
  description: portfolioData.personal.bio[0],
  keywords: [
    portfolioData.personal.name,
    portfolioData.personal.role,
    "Frontend Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Web Performance",
    "SVG Graphics",
    "Software Developer Portfolio",
    "Brazil",
  ],
  authors: [{ name: portfolioData.personal.name, url: portfolioData.personal.calendarUrl }],
  creator: portfolioData.personal.name,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${portfolioData.personal.name} · ${portfolioData.personal.role}`,
    description: portfolioData.personal.bio[0],
    siteName: `${portfolioData.personal.name} Portfolio`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${portfolioData.personal.name} · ${portfolioData.personal.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.personal.name} · ${portfolioData.personal.role}`,
    description: portfolioData.personal.bio[0],
    images: ["/opengraph-image"],
  },
  icons: {
    icon: portfolioData.personal.avatar,
    shortcut: portfolioData.personal.avatar,
    apple: portfolioData.personal.avatar,
  },
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: portfolioData.personal.name,
      jobTitle: portfolioData.personal.role,
      url: siteUrl,
      image: `${siteUrl}${portfolioData.personal.avatar}`,
      sameAs: [
        ...portfolioData.socials.map((s) => s.url),
        portfolioData.personal.calendarUrl,
      ].filter(Boolean),
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Frontend Engineering",
        "Web Performance",
        "SVG Architectures",
        "Design Systems",
      ],
      description: portfolioData.personal.bio[0],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${portfolioData.personal.name} Portfolio`,
      description: portfolioData.personal.bio[0],
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={instagramSans.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('darkMode');var dark=s===null?window.matchMedia('(prefers-color-scheme: dark)').matches:s==='true';if(dark){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen font-sans">
        <SoundProvider>
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
