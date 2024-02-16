import { Header } from "@/components/interface/header";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/providers/providers";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "7 On Place",
  description: "Maiores criadoras(es) de conteúdo hot em um só lugar!",
  openGraph: {images: 'https://7onsexycatalogo.s3.amazonaws.com/76onplaceee.jpg'},  
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
          <main className="max-w-[1920px] w-full mx-auto flex-1 flex flex-col">
            {children}
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
  
}
