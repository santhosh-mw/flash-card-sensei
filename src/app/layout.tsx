import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { GameProvider } from "@/context/GameContext";
import Stars from "@/components/Stars";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flash Cards Sensei - May the Force Be With Your Learning",
  description: "Master languages through the power of the Force with our interactive flashcard system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-starwars-dark text-starwars-light min-h-screen`}>
        <GameProvider>
          <div className="space-background min-h-screen relative">
            <Stars />
            <div className="relative z-10">
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
