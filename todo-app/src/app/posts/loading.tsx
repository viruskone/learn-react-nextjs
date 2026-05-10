export default function Loading() {
    return (
        <div className="w-full">
            <div className="mb-6 text-center">
                <div className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse mx-auto mb-2"/>
                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse mx-auto"/>
            </div>
            <ul className="space-y-3">
                {Array.from({length: 5}).map((_, i) => (
                    <li key={i} className="bg-white border border-gray-200 rounded-lg px-5 py-4">
                        <div className="h-3 w-8 bg-gray-100 rounded animate-pulse mb-2"/>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"/>
                        <div className="h-3 w-full bg-gray-100 rounded animate-pulse"/>
                    </li>
                ))}
            </ul>
        </div>
    );
}