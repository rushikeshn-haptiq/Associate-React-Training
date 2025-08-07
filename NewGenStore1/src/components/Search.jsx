import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch,useSelector } from 'react-redux';
import { setSearchTerm } from '../redux/SearchSlice';
const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state)=>state.search.searchTerm);
  return (
    <div className="w-full max-w-sm flex items-center relative">
      <input
        type="search"
        placeholder="Search Product..."
        value={searchTerm}
        onChange={(e)=>dispatch(setSearchTerm(e.target.value))}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FaSearch  className='absolute right-2'/>
    </div>
  );
};

export default Search;
