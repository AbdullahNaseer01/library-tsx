import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMonthBooks } from '../redux/slices/monthSlice';
import MonthCard from './MonthCard';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { Book } from "../types/types";

const Aside: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state: RootState) => state.monthBooks);

  useEffect(() => {
    dispatch(fetchMonthBooks({ startIndex: 0, maxResults: 5 }));
  }, [dispatch]);

  const asideBooks: Book[] = data || [];

  return (
    <aside className='text-center w-full md:w-1/4 p-4 flex flex-col items-center md:items-start  gap-5'>
        <h1 className="font-bold italic text-4xl text-customTextColour">Best this Month</h1>
      <div className=' bg-slate-50 rounded-lg'>
        <div className='flex flex-col gap-5 items-center border-gray-200 p-4 rounded-md'>
          {asideBooks.map((book: Book) => (
            <Link key={book.id} to={`/bookdetails/${book.id}`}>
              <MonthCard book={book} />
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
        <Link to={"/search"}>
          <button className='block italic font-semibold mx-auto w-[350px] h-auto text-linkColour text-lg mb-6'>
            See More
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
