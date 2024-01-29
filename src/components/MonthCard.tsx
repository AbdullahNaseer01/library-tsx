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


const MonthCard: React.FC<CardProps> = ({ book }) => {
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
        <div className="relative w-[270px] h-[312px] md:w-[300px] md:h-[260px] rounded-md md:flex md:flex-row border-2 md:border-0">
            <div className="absolute md:static w-[92px] h-[137px] left-20 top-[-30px] md:h-auto md:w-auto md:flex-1">
                <img className=' bg-red-500 md:ml-2 w-full h-full md:h-2/3 object-cover md:mt-10 rounded-md' src={imageLinks?.thumbnail} alt="picture" />
            </div>
            <div className="mt-[132px] md:mt-0 md:flex-1 p-4 flex flex-col justify-between text-center md:text-left">
                <div>
                    <p className="text-lg font-bold italic text-customTextColour md:mb-2">{trimmedTitle}</p>
                    <p className="text-customTextColour text-base font-thin">{authors && authors.length > 0 ? authors[0] : 'Author Not Available'}</p>

                    <p className="text-linkColour italic text-sm md:mt-6 font-bold">{`$${maturityRating ? 'Not For Sale' : 'Price Not Available'}`}</p>
                </div>
                    <button className=" bg-customTextColour text-white text-sm px-4 py-2 w-[101px] h-9 rounded-full">Buy Now</button>
            </div>
        </div>
    );
};

export default MonthCard;
