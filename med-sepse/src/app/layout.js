import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BottomNav from "@/components/layout/BottomNav";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MedSeps",
  description: "Treinamento Gamificado em Diagnóstico de Sepse",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex flex-col min-h-screen bg-background text-foreground pb-16 md:pb-0">
                <main className="flex-grow container mx-auto px-4 py-4 md:py-8">
                  {children}
                </main>
                <BottomNav />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}