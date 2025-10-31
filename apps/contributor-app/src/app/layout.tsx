import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/providers/TanstackProvider";
import UserProvider from "@/context/UserContext";
import { WalletProvider } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { NavBar } from "@/components/shared/NavBar";
import { CampaignProvider } from "@/context/CampaignContext";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Footer } from "@/components/shared/Footer";
import { PostHogProvider } from "@/providers/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrantFox | Contributor",
  description: "Contribute to the OSS projects and get rewarded",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TanstackProvider>
              <UserProvider>
                <WalletProvider>
                  <NavBar />
                  <main className="min-h-[calc(100vh-56px)] flex-1">
                    {children}
                  </main>
                  <Footer />

                  <Toaster />
                </WalletProvider>
              </UserProvider>
            </TanstackProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
