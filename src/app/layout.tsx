import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import StoreProvider from "@/providers/StoreProvider";
import {Inter} from "next/font/google"
import {Menu} from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Quiz App - play together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className="min-h-screen flex flex-col"
        suppressHydrationWarning
      >
      <header className="p-4 bg-gray-800">
        <Menu/>
      </header>
      <StoreProvider>
        <main className="flex-1 container mx-auto">
          {children}
        </main>
      </StoreProvider>
      </body>
    </html>
  );
}
