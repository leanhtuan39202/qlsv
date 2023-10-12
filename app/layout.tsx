import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Drawer from "./components/drawer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import AppProvider from "./(provider)/appProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Quản lí sinh viên",
    description: "vnua",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning={true} data-theme="cupcake">
            <body className={inter.className}>
                <Toaster />
                <NextTopLoader
                    color="hsl(var(--a))"
                    height={5}
                    showSpinner={false}
                />
                <AppProvider>
                    <Drawer>{children}</Drawer>
                </AppProvider>
            </body>
        </html>
    );
}
