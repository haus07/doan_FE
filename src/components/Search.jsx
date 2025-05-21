import Navbar from "./Navbar";
import SearchInput from "./SearchInput";
import { motion } from "framer-motion";

const Search = () => {
    
    return (
        <>
             <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      
            <Navbar />
            <div className="mb-2 flex flex-col gap-y-6 mt-5">
                <h1 className="text-white text-3xl font-semibold">
                    Search
                </h1>
                <SearchInput />
            </div>
    </motion.div>
        
        </>
    )
}

export default Search