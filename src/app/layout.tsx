import { Header } from "@/components/interface/header";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/providers/providers";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "7OnSexy",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#f3f3f3]">
        <Providers>
          <Header />
          <Toaster />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
