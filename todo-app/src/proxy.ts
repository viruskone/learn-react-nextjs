import {NextRequest, NextResponse} from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (process.env.NODE_ENV === 'development') {
        console.log(`[proxy] ${request.method} ${pathname}`)
    }

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/todos', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}