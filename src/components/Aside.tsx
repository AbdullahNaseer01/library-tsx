import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMonthBooks } from '../redux/slices/monthSlice'; // Adjust the path accordingly
import MonthCard from './MonthCard';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const Aside: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state: RootState) => state.monthBooks);

  useEffect(() => {
    dispatch(fetchMonthBooks({ startIndex: 0, maxResults: 5 })); // Adjust maxResults accordingly
  }, [dispatch]);

  const asideBooks = data?.items || [];

  return (
    <aside className='text-center w-full md:w-1/4 p-4 flex flex-col items-center gap-5'>
      <div>
        <h1 className="font-bold italic text-4xl text-customTextColour mb-5">Best This Month</h1>
        <div className='flex flex-col gap-5 items-center border-gray-200 p-4 rounded-md'>
          {asideBooks.map((book: any) => (
            <Link to={`/bookdetails/${book.id}`}>
            <MonthCard key={book.id} book={book} />
            </Link>
          ))}
          
          {isLoading ? (
          <div className=' flex justify-center items-center'><Loader/></div>
        ) : isError ? (
          <div>Something went wrong</div>
        ) : (
          <></>
        )}
        </div>
        <hr className='mx-7 my-4' />
        <button className='block italic font-semibold mx-auto w-[350px] h-auto text-linkColour text-lg'>
          See More
        </button>
      </div>
    </aside>
  );
};

export default Aside;
