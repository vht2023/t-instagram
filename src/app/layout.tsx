import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProviders from "@/components/AuthProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "T - Instagram",
    description: "T - Instagram",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProviders>{children}</AuthProviders>
            </body>
        </html>
    );
}
