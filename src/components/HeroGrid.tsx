import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/slices/books';
import Card from './Card';
import Aside from './Aside';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const HeroGrid: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state: RootState) => state.books);
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(10);

  useEffect(() => {
    // Dispatch the fetchBooks action when the component mounts
    dispatch(fetchBooks({ startIndex, maxResults }));
  }, [dispatch, startIndex, maxResults]);

  const loadMoreResults = () => {
    setStartIndex(startIndex + maxResults);
    setMaxResults(maxResults + 10);
    dispatch(fetchBooks({ startIndex, maxResults: maxResults + 10 }));
  };

  const books = data?.items || [];

  return (
    <div className='flex flex-wrap gap-5 items-start justify-center lg:justify-start'>
      <div className='w-full md:w-2/3 md:mt-4'>
        <h1 className='font-bold italic text-4xl text-[#183B56] mb-5'>Recommended Books</h1>
        <div className='slider pt-8 md:pt-0 mt-5 md:mt-0 overflow-x-auto whitespace-nowrap mx-auto no-scrollbar md:flex md:flex-wrap'>
          {books.map((book: any) => (
            <div key={book.id} className='inline-block mr-4 mb-5'>
              <Link to={`/bookdetails/${book.id}`}>
                <Card book={book} />
              </Link>
            </div>
          ))}
        </div>
        {isLoading ? (
          <div className=' flex justify-center items-center'><Loader/></div>
        ) : isError ? (
          <div>Something went wrong</div>
        ) : (
          <button
            onClick={loadMoreResults}
            className='block mx-auto w-64 h-12 md:h-16 md:w-[60%] text-[#1565D8] text-md font-bold rounded-md bg-[#b5cef0]'
          >
            See More
          </button>
        )}
      </div>
      <Aside />
    </div>
  );
};
export default HeroGrid;
