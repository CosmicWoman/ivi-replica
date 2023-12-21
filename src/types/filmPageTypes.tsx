export interface FilmPageProps {
    id: number
    trailerName: string, 
    trailerUrl: string , 
    ratingKp: number, 
    votesKp: number,
    movieLength: number,
    filmNameRu: string,
    filmNameEn: string,
    description: string,
    slogan: string | undefined,
    bigPictureUrl: string,
    smallPictureUrl: string,
    year: number,
    persons: IPerson [],
    countries: ICountry[],
    genres: IGenre [],
    fact: IFact,
    comments: IComment []
};

export type SummaryBlockProps = Pick <FilmPageProps, 'year' | 'movieLength' | 'countries' | 'genres'> & {filmName: string};
export type CardsBlockProps = Pick <FilmPageProps, 'ratingKp' | 'persons'>;
export type SloganBlockProps = Pick <FilmPageProps, 'slogan'>;
export type DescriptionBlockProps = Pick <FilmPageProps, 'description'> & {filmName: string};
export type ReitingBlockProps = Pick <FilmPageProps, 'ratingKp' | 'votesKp'>;

export type CreatorsBlockProps = Pick <FilmPageProps, 'persons'>;
export type CommentsBlockProps = Pick <FilmPageProps, 'comments'> & {filmName: string};
export type WatchesBlockProps = Pick <FilmPageProps, 'bigPictureUrl'| 'smallPictureUrl'> & {filmName: string};

export interface IPerson {
    id: number,
    photoUrl: string,
    nameRu: string,
    nameEn: string,
    professions: [
        {
            id: number,
            name: string,
        }
    ]
};
export interface ICountry {
    id: number,
    countryName: string,
    countryNameEn: string,
};
export interface IGenre {
    id: number,
    nameRu: string,
    nameEn: string,
};
export interface IFact {
    id: number,
    value: string,
    type: string,
    spoiler: boolean,
    filmId: number
};
export interface IComment {
    id: number,
    header: string,
    value: string,
    authorId: number,
    parentId: number | null,
    createdAt: Date,
    nickName: string,
    filmId: number,
};


export interface InternalPageProps {
    film: FilmPageProps
};
export interface IpNavPanelProps {
    commentsCounter: number;
    trailer: string | null;
};
export interface ShortInfoBlockProps {
    film: FilmPageProps;
    onDecrement : () => void;
};
export interface AllCreatorsBlockProps {
    persons: IPerson [];
};
export interface CommentsCreatingBlockProps {
    filmId: number;
    onCommentsCountChange: (currentCommentsCount: number) => void;
};
export type CommentsStructure = [
    [ parent: IComment,
    childrens: IComment[] | []
    ]
];
export interface ReviewProps {
    review: IComment,
    openCreateComment: (e:React.MouseEvent<HTMLDivElement>) => void;
};
export interface CommentProps {
    child: IComment
};
export interface FactsBlockProps {
    fact: IFact
};
export interface TrailersBlockProps {
    trailer: string;
};