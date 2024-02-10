export interface Book {
    id: string;
    volumeInfo?: {
        title?: string;
        subtitle?: string;
        description?: string;
        previewLink?: string;
        authors?: string[];
        publishedDate?: string;
        pageCount?: number;
        printType?: string;
        maturityRating?: string;
        imageLinks?: {
            smallThumbnail?: string;
            thumbnail?: string;
        }

    };
}
