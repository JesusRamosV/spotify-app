"use client";
import { Footer, TopMenu } from "@/components";
import { titleFont } from "@/config/fonts";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "./globals.css";
import { Flowbite } from "flowbite-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flowbite>
      <SessionProvider>
        <Head>
          <title>Spotify</title>
          <meta name="description" content="Spotify clone" />
        </Head>
        <html lang="en">
          <body className={`${titleFont.className} antialiased`}>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
              <TopMenu />
              <div className="mb-[60px]">{children}</div>
              <Footer />
            </div>
          </body>
        </html>
      </SessionProvider>
    </Flowbite>
  );
}
