import { Header } from "@/components/interface/header";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/providers/providers";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "7 On Place",
  description: "Maiores criadoras(es) de conteúdo hot em um só lugar!",
  openGraph: {images: 'https://www.7onplace.com/'},  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="bg-[#f3f3f3] h-full">
        <Providers>
          <div className="h-full flex flex-col ">
            <Header />
            <Toaster />
            <main className="max-w-[1930px] w-full mx-auto flex-1 flex flex-col my-4">
              {children}
              <Analytics />
            </main>
          </div>
          

        </Providers>
      </body>
    </html>
  );
}
