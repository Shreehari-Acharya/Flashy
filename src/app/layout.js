import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CoinsProvider } from "../../context/CoinsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flashy",
  description: "Pre-register now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CoinsProvider>
        {children}
        </CoinsProvider>
      </body>
    </html>
  );
}
