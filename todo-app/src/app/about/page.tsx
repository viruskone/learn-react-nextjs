import {Metadata} from "next";

export const metadata: Metadata = {
    title: "About Todo App",
    description:"It's all about learning"
}

export default function Page() {
    return (
        <main>
            <h1>About</h1>
            <p>Site to test my ReactJS + Next.js skills</p>
        </main>
    );
}