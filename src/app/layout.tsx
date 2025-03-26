"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { AuthenticationProvider } from "@/provider/authentication-provider";
import { UserProvider } from "@/provider/User-Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CategoryProvider } from "@/provider/CategoryProvider";
import { LoadingProvider } from "@/provider/LoaderProvider";
import ScreenLoader from "@/components/ScreenLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <Suspense>
            <NuqsAdapter>
              <QueryClientProvider client={queryClient}>
                <LoadingProvider>
                  <AuthenticationProvider>
                    <UserProvider>
                      <CategoryProvider>{children}</CategoryProvider>
                      <ScreenLoader />

                      <Toaster />
                    </UserProvider>
                  </AuthenticationProvider>
                </LoadingProvider>
              </QueryClientProvider>
            </NuqsAdapter>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
