import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserProvider from "@/context/UserContext";
import { Toaster } from "sonner";
import { ReactQueryClientProvider } from "@/components/tw-blocks/providers/ReactQueryClientProvider";
import { WalletProvider } from "@/components/tw-blocks/wallet-kit/WalletProvider";

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

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryClientProvider>
          <WalletProvider>
            <UserProvider>{children}</UserProvider>

            <Toaster position="top-right" richColors />
          </WalletProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
