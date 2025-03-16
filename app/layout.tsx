import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideNavigationBar from "@/components/layout/SideNavigationBar";
import TopNavigationBar from "@/components/layout/TopNavigationBar";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AuthRequired from "@/components/layout/AuthRequired";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <AuthRequired>
          <TopNavigationBar />
          <div className="flex w-full flex-1 gap-2 px-2 pb-2">
            <SideNavigationBar />
            <div className="bg-white flex-1 h-full rounded-2xl">
              {children}
            </div>
          </div>
        </AuthRequired>
      </UserProvider>
    </html>
  );
}
