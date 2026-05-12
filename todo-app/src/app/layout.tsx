import {Inter, Geist_Mono} from "next/font/google";
import "./globals.css";
import {TodoProvider} from "@/context/TodoContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {Metadata} from "next";
import {SessionProvider} from "next-auth/react";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: '%s | Todo App',
        default: 'Welcome'
    }
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">
        <SessionProvider>
            <Navbar/>
            <TodoProvider>
                <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10">{children}</main>
            </TodoProvider>
            <Footer/>
        </SessionProvider>
        </body>
        </html>
    );
}
