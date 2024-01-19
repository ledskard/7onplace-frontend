import { Header } from "@/components/interface/header";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/providers/providers";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "7 On Place",
  description: "Maiores criadoras(es) de conteúdo hot em um só lugar!",
  openGraph: {images: 'https://scontent-gru1-1.xx.fbcdn.net/v/t39.30808-1/340768899_529830022563190_3934893358219137785_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=596444&_nc_ohc=58HoXk8U-tcAX_L6Zho&_nc_ht=scontent-gru1-1.xx&oh=00_AfBzFe2DVt0h-QNMjKZ7K8--YMIreCzRTINLwB6x7hHQwg&oe=656D0C80'},  
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
