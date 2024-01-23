import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RelatedBook from '../components/RelatedBook';

const BookDetails = () => {
  return (
    <div className=''>
      <div className=' mx-6 lg:mx-36'>
      <Navbar />
      </div> 
      <div className="mt-28 mx-aut sm:px-6  mx-6 lg:mx-36">
        <div className="flex flex-col md:flex-row justify-between mx-4">
          <div className="md:flex-1 px-4 text-center md:text-left mt-4  mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-5">
              <span className="text-[#FAAD13]">Design Theory:</span>
              <br />
              The Psychology of <br />
              Graphic Design Pricing
            </h2>
            <p className="text-base md:text-lg mb-4 font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing.
            </p>
            <div>
              <p className="text-gray-600 text-sm md:text-base mt-7">
                After 15 years running my own studio, completing thousands of projects for high-profile clients. Now, I am sharing my golden strategies for pricing creative work.
              </p>
            </div>
            <button className="w-[228px] h-[58px] text-white bg-[#1565D8] border rounded-md mt-7">
              See More On Google
            </button>
          </div>
          <div className="md:flex-1 flex justify-center md:justify-end items-center mt-4 md:mt-0">
            <div className="md:w-[488px] md:h-[580px] h-[333px] w-[280px] rounded-lg bg-gray-300 mx-auto md:mx-0">
              <div className='w-full h-full flex justify-center items-center'>
                <img
                  className="w-36 h-[215px] md:w-[250px] md:h-[375px] object-cover"
                  src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Product Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedBook/>
      <Footer />
    </div>
  );
};

export default BookDetails;
