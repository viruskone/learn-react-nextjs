import {Post} from "@/types/post";

export default async function PostsPage() {
    let posts: Post[];
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {cache: "no-store"});
        if (!res.ok) throw new Error("Failed to fetch posts");
        posts = await res.json();
    } catch {
        return <p className="text-red-500">Failed to load posts. Try again later.</p>;
    }
    return (
        <div className="w-full">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
                <p className="text-sm text-gray-400 mt-1">{posts.length} posts loaded</p>
            </div>
            <ul className="space-y-3">
                {posts.map((post: Post) => (
                    <li key={post.id} className="bg-white border border-gray-200 rounded-lg px-5 py-4 hover:border-indigo-300 hover:shadow-sm transition-all">
                        <p className="text-xs font-medium text-indigo-500 mb-1">#{post.id}</p>
                        <h2 className="text-sm font-semibold text-gray-900 capitalize mb-1">{post.title}</h2>
                        <p className="text-xs text-gray-500 leading-relaxed">{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}