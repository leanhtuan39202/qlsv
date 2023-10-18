import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import AppProvider from "./(provider)/appProvider";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AuthProvider from "./(provider)/authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Quản lí sinh viên",
    description: "vnua",
    icons: [
        {
            rel: "icon",
            url: "../public/image/vnualogo.png",
        },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="cupcake">
            <body className={inter.className}>
                <Toaster />
                <NextTopLoader
                    color="hsl(var(--a))"
                    height={5}
                    showSpinner={false}
                    speed={100}
                />
                <AuthProvider>
                    <AppProvider>{children}</AppProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
