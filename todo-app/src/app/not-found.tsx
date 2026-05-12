import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <h2>Page not found</h2>
            <p>Try from start</p>
            <Link href="/">go home</Link>
        </div>
    )
}