import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@/app/styles/globals.css";

type Children = {
  children: ReactNode;
};

export const metadata: Metadata = {
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
  title: "Akili AI Creativity Assistant | Akili AI",
  description:
    "Discover Akili AI: Your all-in-one AI creativity assistant. Create images, code snippets, and more with ease. Get started with 5 free generations and upgrade for unlimited access. Transform your workflow today!",
};

export default function RootLayout({ children }: Children) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="scroll-smooth font-opensans text-[#404756] antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
