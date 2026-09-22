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

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/GabrielBaiano/gridline-portifolio-template"),
  title: `${portfolioData.personal.name} · ${portfolioData.personal.role}`,
  description: portfolioData.personal.bio[0],
  authors: [{ name: portfolioData.personal.name, url: portfolioData.personal.calendarUrl }],
  creator: portfolioData.personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/GabrielBaiano/gridline-portifolio-template",
    title: `${portfolioData.personal.name} · ${portfolioData.personal.role}`,
    description: portfolioData.personal.bio[0],
    siteName: `${portfolioData.personal.name} Portfolio`,
    images: [
      {
        url: portfolioData.personal.avatar,
        width: 400,
        height: 400,
        alt: portfolioData.personal.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${portfolioData.personal.name} · ${portfolioData.personal.role}`,
    description: portfolioData.personal.bio[0],
    images: [portfolioData.personal.avatar],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
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
