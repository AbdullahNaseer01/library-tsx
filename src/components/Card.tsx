import React from 'react';

interface Book {
    id: string;
    volumeInfo?: {
        title?: string;
        authors?: string[];
        publishedDate?: string;
        pageCount?: number;
        printType?: string;
        maturityRating?: string;
        imageLinks?: {
            smallThumbnail?: string;
            thumbnail?: string;
        };
    };
}

interface CardProps {
    book: Book;
}

const defaultBook: Book = {
    id: '',
    volumeInfo: {
        title: 'Title Not Available',
        authors: ['Authors Not Available'],
        publishedDate: 'Published Date Not Available',
        pageCount: 0,
        printType: 'Print Type Not Available',
        maturityRating: 'Maturity Rating Not Available',
        imageLinks: {
            smallThumbnail: 'fallback-image-url',
            thumbnail: 'fallback-image-url',
        },
    },
};
const trimText = (text: string, wordCount: number): string => {
    const words = text.split(' ');
    if (words.length > wordCount) {
        return words.slice(0, wordCount).join(' ') + '...';
    }
    return text;
};


const Card: React.FC<CardProps> = ({ book }) => {
    const mergedBook = { ...defaultBook, ...book };
    const {
        title,
        authors,
        // publishedDate,
        // pageCount,
        // printType,
        maturityRating,
        imageLinks,
    } = mergedBook.volumeInfo!; // Non-null assertion, assuming volumeInfo is defined
    
    const trimmedTitle = trimText(title || '', 5);

    return (
        <div className="relative w-[270px] h-[312px] md:w-[358px] md:h-[260px] rounded-md md:flex md:flex-row border-2">
            <div className="absolute bg-red-500 rounded-t-md md:static w-[92px] h-[137px] left-20 top-[-30px] md:h-auto md:w-auto md:flex-1">
                <img className='w-full h-full object-cover rounded-t-md' src={imageLinks?.thumbnail} alt="picture" />
            </div>
            <div className="mt-[132px] md:mt-0 md:flex-1 p-4 flex flex-col justify-around md:justify-between text-center md:text-left">
                <div>
                    <p className="text-lg font-bold md:mb-2 text-customTextColour italic text-wrap overflow-hidden">
                        {trimmedTitle}
                    </p>
                    {/* <p className="font-thin text-customTextColour text-base overflow-hidden text-wrap">
                        {authors?.join(', ')}
                    </p> */}
                    <p className="text-customTextColour text-base font-thin">{authors && authors.length > 0 ? authors[0] : 'Author Not Available'}</p>

                    <p className="text-linkColour text-sm mt-2 md:mt-6 italic font-bold">
                        {`$${maturityRating ? 'Not For Sale' : 'Price Not Available'}`}
                    </p>
                </div>
                <div className="flex justify-between items-center mt-2 md:mt-3">
                    <button className="bg-customTextColour text-white text-sm px-4 py-2 rounded-full">Buy Now</button>
                    <button className="pr-4 py-2 rounded-md">
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.79444 15.7841L16.5972 8.75993C18.5765 6.71737 18.4604 3.33534 16.2526 1.45095C14.3261 -0.190812 11.4609 0.10448 9.69251 1.9291L8.99992 2.64276L8.30734 1.9291C6.54249 0.10448 3.67376 -0.190812 1.74721 1.45095C-0.460588 3.33534 -0.576631 6.71737 1.39915 8.75993L8.20187 15.7841C8.64132 16.2377 9.35499 16.2377 9.79444 15.7841Z" fill="#959EAD" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Card;