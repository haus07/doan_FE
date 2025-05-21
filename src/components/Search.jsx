import Navbar from "./Navbar";
import SearchInput from "./SearchInput";

const Search = () => {
    
    return (
        <>
            <Navbar />
            <div className="mb-2 flex flex-col gap-y-6 mt-5">
                <h1 className="text-white text-3xl font-semibold">
                    Search
                </h1>
                <SearchInput />
            </div>
        
        </>
    )
}

export default Search