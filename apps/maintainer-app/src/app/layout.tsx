import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import UserProvider from "@/context/UserContext";
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
  title: "GrantFox | Maintainer",
  description: "Submit your projects to get funded",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryClientProvider>
          <UserProvider>
            <WalletProvider>
              <Navbar />
              {children}
            </WalletProvider>
          </UserProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
