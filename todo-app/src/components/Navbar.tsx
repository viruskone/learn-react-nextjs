"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

interface NavLink {
    path: string;
    label: string;
}

const pages: NavLink[] = [
    {path: "/", label: "Home"},
    {path: "/about", label: "About"},
    {path: "/todos", label: "Todos"},
    {path: "/posts", label: "Posts"}
]

export default function Navbar() {
    const currentPath = usePathname()
    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
            <nav className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
                <span className="font-bold text-indigo-600 text-lg tracking-tight">Todos</span>
                <ul className="flex gap-6">
                    {pages.map((page: NavLink) => (
                        <li key={page.path}>
                            <Link
                                href={page.path}
                                className={`text-sm font-medium transition-colors ${
                                    currentPath === page.path
                                        ? "text-indigo-600 border-b-2 border-indigo-600 pb-0.5"
                                        : "text-gray-500 hover:text-gray-900"
                                }`}
                            >
                                {page.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}