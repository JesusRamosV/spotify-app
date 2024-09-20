"use client";
import { Footer, Sidebar, TopMenu } from "@/components";
import { titleFont } from "@/config/fonts";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "./globals.css";
import { Flowbite } from "flowbite-react";
import { Snackbar } from "@/store";

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
            <div className="fixed top-0 left-0 right-0 z-50">
              <TopMenu />
            </div>
            <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white py-[73px] overflow-hidden	">
              <Sidebar />
              <div className=" overflow-y-auto flex-1">{children}</div>
            </div>
            <Footer />
            <Snackbar />
          </body>
        </html>
      </SessionProvider>
    </Flowbite>
  );
}
