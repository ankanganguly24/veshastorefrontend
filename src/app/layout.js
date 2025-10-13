import "@/app/globals.css";
import AppProviders from "@/providers/app-providers";
import { Toaster } from "sonner";
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Vesha',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Your ultimate destination for premium shopping experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
