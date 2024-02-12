
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { searchBooks } from "../redux/slices/searchBoookSlice";
import Card from "./Card";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { Book } from "../Types/types";

const SearchGrid: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(10);

  const { isLoading, data, isError } = useSelector(
    (state: RootState) => state.searchBooks
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setStartIndex(0);
    setMaxResults(10);
  };
  
  useEffect(() => {
    let timer =  setTimeout(() => {
      dispatch(searchBooks({ query, startIndex, maxResults }));
    }, 2000);
    return () => clearTimeout(timer);
  }, [query, dispatch, startIndex, maxResults]);

  const loadMoreResults = () => {
    setStartIndex(startIndex + maxResults);
    setMaxResults(maxResults + 10);
    dispatch(
      searchBooks({
        query,
        startIndex: startIndex + maxResults,
        maxResults: 10,
      })
    );
  };

  return (
    <>
      <div className="searchHero mt-48 mb-16 text-center text-customTextColour">
        <h1 className="text-5xl font-bold italic mb-16 ">Search Books</h1>
        <div className="search w-[236px] h-[46px] md:w-[610px] md:h-[72px] border rounded-lg m-auto">
          <input
            type="text"
            className="w-full h-full outline-none bg-slate-200 px-10"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="text-center flex flex-col justify-center items-center text-customTextColour">
        <h3 className="text-3xl font-bold mb-6 italic text-start">
          Search Results
        </h3>

        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : isError ? (
          <div>Error searching books</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {data?.items?.map((book: Book) => (
              <Link key={book.id} to={`/bookdetails/${book.id}`}>
                <Card book={book} />
              </Link>
            ))}
          </div>
        )}
        {!isLoading && !isError && (
          <button
            onClick={loadMoreResults}
            className="block mx-auto mt-6 text-base lg:w-[362px] w-[280px] lg:h-[72px] rounded-md h-[48px] text-linkColour italic font-bold bg-[#cfe1fa]"
          >
            More
          </button>
        )}
      </div>
    </>
  );
};

export default SearchGrid;




