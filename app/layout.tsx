import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";

type Children = {
  children: ReactNode;
};

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon/svg",
  },
  title: "Akili AI Creativity Assistant | Akili AI",
  description:
    "Discover Akili AI: Your all-in-one AI creativity assistant. Create images, code snippets, and more with ease. Get started with 5 free generations and upgrade for unlimited access. Transform your workflow today!",
};

export default function RootLayout({ children }: Children) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-opensans scroll-smooth antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
