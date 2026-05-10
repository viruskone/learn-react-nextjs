import Link from "next/link";

export default function TodoNotFound() {
    return (
        <div>
            <p>Todo not found.</p>
            <Link href="/todos">Back to list</Link>
        </div>
    )
}