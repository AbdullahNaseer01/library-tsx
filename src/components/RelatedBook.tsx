import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchBooks } from '../redux/slices/books';
import { Link } from 'react-router-dom';
import arrowLeft from '../assets/arrowLeft.svg';
import arrowRight from '../assets/arrowRight.svg';
import Loader from './Loader';

const RelatedBook: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state: RootState) => state.books);

  const startIndex = 0
  const maxResults = 10

  useEffect(() => {
    dispatch(fetchBooks({ startIndex, maxResults }));
  }, [dispatch, startIndex, maxResults]);

  const books = data?.items || [];

  return (
    <div className='parent bg-[#183B56] h-full mt-7 md:mt-24 md:px-36'>
      <div className='flex justify-center md:justify-between pt-12 md:pt-14'>
        <div className='text text-white text-3xl font-bold italic'>Related Books</div>
        <div className='buttons hidden md:flex '>
          <button className='h-14 w-14 border-2 mx-3 p-2 rounded-full'>
            <img className='mx-auto' src={arrowLeft} alt='Left Arrow' />
          </button>
          <button className='h-14 w-14 border-2 mx-3 p-2 rounded-full'>
            <img className='mx-auto' src={arrowRight} alt='Right Arrow' />
          </button>
        </div>
      </div>

      {isLoading && <div className='text-white'><Loader/></div>}
      {isError && <div className='text-white'>Error loading books</div>}

      {!isLoading && !isError && (
        <div className='slider mt-10 md:mt-14 overflow-x-auto whitespace-nowrap mx-auto no-scrollbar'>
          {books.map((book: any) => (
            <div key={book.id} className='inline-block mr-4 mb-5'>
              <Link to={`/bookdetails/${book.id}`}>
                <div className='inline-block h-[298px] w-[204px] bg-red-500 rounded-md mr-4'>
                  <img className='object-cover inline-block w-full h-full bg-red-500 rounded-md' src={book.volumeInfo.imageLinks?.thumbnail} alt='Book Cover' />
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className='buttons flex md:hidden justify-center mt-3'>
        <button className='h-14 w-14 border-2 mx-3 p-2 rounded-full'>
          <img className='mx-auto' src={arrowLeft} alt='Left Arrow' />
        </button>
        <button className='h-14 w-14 border-2 mx-3 p-2 rounded-full'>
          <img className='mx-auto' src={arrowRight} alt='Right Arrow' />
        </button>
      </div>
    </div>
  );
};

export default RelatedBook;
