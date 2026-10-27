'use client'
import { searchPosts, SearchResultType } from "@/lib/supabase/queries"
import Link from "next/link"
import { useState } from "react"
import { Search } from "lucide-react"

const SearchComponent = () => {
    const [input, setInput] = useState<string>('')
    const [searchResults, setSearchResults ]=useState<SearchResultType | null>(null)

    const handleChange = async(e: React.ChangeEvent<HTMLInputElement> ) => {
        const query =e.target.value
        setInput(query)

    if(query.trim() === ''){
        setSearchResults(null)
        return
    }

    const {data, error} = await searchPosts(query)
    if(error) throw new Error(error.message)
        setSearchResults(data)
    }

    return (
        <div className="relative my-[26px]">
            <div className="ptagText border border-icon"
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Search className="w-4 h-4 text-icon shrink-0" />
                <input onChange={handleChange} placeholder="Search recipes" value={input} />
            </div>
            {searchResults && 
                <div className="absolute left-0 top-full bg-background border p-2 w-full text-text text-sm">
                    {searchResults.map((result, index) => 
                    <Link className="block" key={index} href={`/${result.slug}`}>
                        {result.title}
                    </Link>)}
                </div>
            }
        </div>
    )
}

export default SearchComponent