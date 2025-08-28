// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BottomNav from "@/components/layout/BottomNav"; // 1. Importar a BottomNav aqui

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MedSeps",
  description: "Plataforma gamificada para ensino de detecção de sepse.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* O conteúdo da página é renderizado aqui */}
          {children}
          
          {/* 2. A BottomNav agora é parte do layout raiz e aparecerá em todas as páginas */}
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}