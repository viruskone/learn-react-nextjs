"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {signIn, signOut, useSession} from "next-auth/react";

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
    const session = useSession()
    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
            <nav className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
                <span className="font-bold text-indigo-600 text-lg tracking-tight">
                    <Image src="/logo.svg" className="inline-block pr-2" width={32} height={32} alt="Todos App"/>
                    Todos</span>
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
                {session.data?.user?.name ? <ul className="flex gap-6">
                    <li>
                        <span className="text-sm font-medium transition-colors text-gray-800">
                            {session.data?.user?.name}
                        </span>
                    </li>
                    <li>
                        <button className="text-sm font-medium transition-colors text-gray-800"
                                onClick={() => signOut()}>Sign out
                        </button>
                    </li>
                </ul> : <ul>
                    <li>
                        <button className="text-sm font-medium transition-colors text-gray-800"
                                onClick={() => signIn('github')}>Sign in
                        </button>
                    </li>
                </ul>}
            </nav>
        </header>
    )
}