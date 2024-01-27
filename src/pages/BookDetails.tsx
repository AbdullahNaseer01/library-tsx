import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from '../redux/slices/bookDetailsSlice';
import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store';
import Navbar from '../components/Navbar';
import RelatedBook from '../components/RelatedBook';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const bookDetailsState = useSelector((state: RootState) => state.bookDetails);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookDetails({ id } as any));
    }
  }, [dispatch, id]);

  if (bookDetailsState.isLoading) {
    return <div className=' flex justify-center items-center min-h-screen '><Loader/></div>
  }

  if (bookDetailsState.isError) {
    return <p>Error fetching book details</p>;
  }

  const bookDetails = bookDetailsState.data;

  if (!bookDetails) {
    return <p>Book details not found</p>;
  }

  return (
    <div className=''>
    <div className=' mx-6 lg:mx-36'>
    <Navbar />
    </div> 
    <div className="mt-28 mx-aut sm:px-6  mx-6 lg:mx-36">
      <div className="flex flex-col md:flex-row justify-between mx-4">
        <div className="md:flex-1 px-4 text-center md:text-left mt-4  mb-8 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-bold italic md:leading-[60px] text-customTextColour mb-5">
            <span className=" text-customTextColour ">{bookDetails.volumeInfo.title}</span>
          </h2>
          <p className="text-base md:text-lg mb-4 font-semibold">
          {bookDetails.volumeInfo.subtitle}
          </p>
          <div>
            <p className="text-gray-600 text-sm md:text-base mt-7">
            {bookDetails.volumeInfo.description}
            </p>
          </div>
          <a href={bookDetails.volumeInfo.previewLink} target=' blank' >
          <button  className="text-white bg-[#1565D8] border rounded-md mt-7  w-[228px] h-[58px]">
            See More On Google
          </button>
          </a>          
        </div>
        <div className="md:flex-1 flex justify-center md:justify-end items-center mt-4 md:mt-0">
          <div className="md:w-[488px] md:h-[580px] h-[333px] w-[280px] rounded-lg bg-gray-300 mx-auto md:mx-0">
            <div className='w-full h-full flex justify-center items-center'>
              <img
                className="w-36 h-[215px] md:w-[250px] md:h-[375px] object-cover"
                src={bookDetails.volumeInfo.imageLinks?.thumbnail}
                alt="Product Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <RelatedBook/>
    <div className='mx-6 lg:mx-36'>
    <Footer />
    </div>
  </div>
  );
};

export default BookDetails;
