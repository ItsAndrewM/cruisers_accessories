import styles from "./searchBar.module.css"
import swell from 'swell-js'
import { useSearchParams } from 'next/navigation'

// https://nextjs.org/docs/app/api-reference/functions/use-search-params

const SearchBar = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('search')
    console.log(search)
    return (
        <>Search: {search}</>
    );
}

export default SearchBar;