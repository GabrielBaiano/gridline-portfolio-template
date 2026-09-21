import type { Metadata } from "next";
import "./globals.css";
import { SoundProvider } from "@/components/SoundProvider";
import { portfolioData } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} · ${portfolioData.personal.role}`,
  description: portfolioData.personal.bio[0],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('darkMode');var dark=s===null?window.matchMedia('(prefers-color-scheme: dark)').matches:s==='true';if(dark){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen">
        <SoundProvider>
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
