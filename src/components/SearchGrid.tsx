import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { searchBooks } from '../redux/slices/searchBoookSlice'; // Adjust the path accordingly
import Card from './Card';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const CardGrid: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(10);

  // Fetch search results from Redux store
  const { isLoading, data, isError } = useSelector((state: RootState) => state.searchBooks);

  // Dispatch searchBooks action on input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setStartIndex(0);
    setMaxResults(10);
    dispatch(searchBooks({ query: event.target.value, startIndex: 0, maxResults: 10 }));
  };

  // Function to load more results
  const loadMoreResults = () => {
    setStartIndex(startIndex + maxResults);
    setMaxResults(maxResults + 10);
    dispatch(searchBooks({ query, startIndex: startIndex + maxResults, maxResults: 10 }));
  };

  useEffect(() => {
    // Load initial results when the component mounts
    dispatch(searchBooks({ query, startIndex, maxResults }));
  }, [dispatch, query, startIndex, maxResults]);

  return (
    <>
      <div className='searchHero mt-48 mb-16 text-center'>
        <h1 className='text-5xl mb-16'>Search Books</h1>
        <div className="search w-[236px] h-[46px] md:w-[610px] md:h-[72px] border rounded-lg m-auto">
          <input
            type="text"
            className='w-full h-full outline-none bg-slate-200 px-10'
            placeholder='Search'
            value={query}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className='text-center flex flex-col items-center justify-center'>
        <h3 className='text-3xl mb-6 italic'>Search Results</h3>

        {isLoading ? (
          <div className='flex justify-center'><Loader/></div>
        ) : isError ? (
          <div>Error searching books</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {data?.items?.map((book: any) => (
              <Link to={`/bookdetails/${book.id}`}>
                <Card key={book.id} book={book} />
              </Link>
            ))}
          </div>
        )}
        {!isLoading && !isError && (
          <button
            onClick={loadMoreResults}
            className='block mx-auto mt-6 text-base lg:w-[362px] w-[280px] lg:h-[72px] rounded-md h-[48px] text-linkColour italic font-bold bg-[#cfe1fa]'
          >
            More
          </button>
        )}
      </div>
    </>
  );
};

export default CardGrid;

