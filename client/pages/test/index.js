import SearchBar from "@/components/searchBar/searchBar";
import { Suspense } from "react"

const SearchBarFallback = () => {
    return <>placeholder</>
}

const Page = () => {
    return (
        <>
            <nav>
                <Suspense fallback={<SearchBarFallback />}>
                    <SearchBar />
                </Suspense>
            </nav>
            <h1>dashboard</h1>
        </>

    );
}

export default Page;