import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {TodoProvider} from "@/context/TodoContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">
        <Navbar/>

        <TodoProvider>
            <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10">{children}</main>
        </TodoProvider>
        <Footer />
        </body>
        </html>
    );
}
