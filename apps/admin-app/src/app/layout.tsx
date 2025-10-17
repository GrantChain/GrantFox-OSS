import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "GrantFox | Admin",
  description: "Admin dashboard for GrantFox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* SSR-safe theme initialization: prefers stored theme, then system */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              try{
                var stored=localStorage.getItem('theme');
                var prefersDark=window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                var isDark = stored==='dark' || (stored!=='light' && prefersDark);
                if (isDark) { document.documentElement.classList.add('dark'); }
              }catch(e){}
            })();
          `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
