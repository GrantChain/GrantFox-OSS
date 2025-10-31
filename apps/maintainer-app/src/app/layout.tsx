import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import UserProvider from "@/context/UserContext";
import { ReactQueryClientProvider } from "@/components/tw-blocks/providers/ReactQueryClientProvider";
import { WalletProvider } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { CampaignProvider } from "@/context/CampaignContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
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
  title: "GrantFox | Maintainer",
  description: "Submit your projects to get funded",
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
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryClientProvider>
              <UserProvider>
                <WalletProvider>
                  <CampaignProvider>
                    <Navbar />

                    <div className="flex-1 w-full min-h-screen">{children}</div>

                    <Footer />

                    <Toaster />
                  </CampaignProvider>
                </WalletProvider>
              </UserProvider>
            </ReactQueryClientProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
