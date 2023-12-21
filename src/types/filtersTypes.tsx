export interface activeFiltersProps {
    'genres': string[],
    'popularGenres': string[],
    'popularCountries': string[],
    'countries': string[],
    'years': number | null | string,
    'rating': number,
    'grade': number,
    'producer': string,
    'actor': string,
}

export interface PersonPageProps {
    id: number,
    nameRu: string,
    nameEn: string,
    photo: string,
}

export interface FilmographyProps {
    key: number,
    poster: string,
    nameRu: string,
    nameEn: string,
    year: number,
    rating: number,
}

export interface FilmProps {
    'key': number,
    'nameRu': string,
    'nameEn': string,
    'year': number,
    'poster': string,
    'rating': number,
    'filmLength': number,
    'countryRu': string,
    'countryEn': string,
    'genreRu': string,
    'genreEn': string,
}

export interface MovieProps {
    'key': number,
    'nameRu': string,
    'nameEn': string,
    'genreRu': string,
    'genreEn': string,
}

export interface MovieSearchProps {
    'key': number | string,
    'nameRu': string,
    'nameEn': string,
}

export interface startFiltersProps {
    'genres':
        {
            'nameRu': string,
            'nameEn': string
        }[],
    'popularGenres':
        {
            'nameRu': string,
            'nameEn': string
        }[],
    'popularCountries':
        {
            'nameRu': string,
            'nameEn': string
        }[],
    'countries':
        {
            'nameRu': string,
            'nameEn': string
        }[],
    'years': number[],
    'rating': number,
    'grade': number,
    'producer': string,
    'actor': string,
}

export interface Item {
    nameRu: string,
    nameEn: string
}

export interface genreAdmin {
    id: number,
    nameRu: string,
    nameEn: string
}

export const arrAllFilters = {
    'popularGenres': [
        {
            'nameRu': 'драма',
            'nameEn': 'drama'
        },
        {
            'nameRu': 'боевик',
            'nameEn': 'action'
        },
        {
            'nameRu': 'триллер',
            'nameEn': 'thriller'
        },
        {
            'nameRu': 'криминал',
            'nameEn': 'crime'
        },
        {
            'nameRu': 'комедия',
            'nameEn': 'comedy'
        },
        {
            'nameRu': 'фантастика',
            'nameEn': 'fantastic'
        },
        {
            'nameRu': 'приключения',
            'nameEn': 'adventures'
        },
        {
            'nameRu': 'семейный',
            'nameEn': 'family'
        },
        {
            'nameRu': 'аниме',
            'nameEn': 'anime'
        },
        {
            'nameRu': 'фэнтези',
            'nameEn': 'fantasy'
        }
    ],
    'genres': [
        {
            'nameRu': '',
            'nameEn': ''
        }
    ],
    'popularCountries': [
        {
            'nameRu': 'Россия',
            'nameEn': 'Russia'
        },
        {
            'nameRu': 'США',
            'nameEn': 'USA'
        },
        {
            'nameRu': 'Германия',
            'nameEn': 'Germany'
        },
        {
            'nameRu': 'Великобритания',
            'nameEn': 'Great Britain'
        },
        {
            'nameRu': 'Япония',
            'nameEn': 'Japan'
        },
        {
            'nameRu': 'Китай',
            'nameEn': 'China'
        },
        {
            'nameRu': 'Корея Южная',
            'nameEn': 'South Korea'
        },
        {
            'nameRu': 'Индия',
            'nameEn': 'India'
        },
        {
            'nameRu': 'СССР',
            'nameEn': 'SSSR'
        },
        {
            'nameRu': 'Франция',
            'nameEn': 'France'
        }
    ],
    'countries': [
        {
            'nameRu': '',
            'nameEn': ''
        }
    ],
    'years': [],
    'rating': 0,
    'grade': 0,
    'producer': '',
    'actor': ''
}

export const activeFilters = {
    'popularGenres': [],
    'genres': [],
    'popularCountries': [],
    'countries': [],
    'years': '',
    'rating': 0,
    'grade': 0,
    'producer': '',
    'actor': ''
}

export const arrAllFiltersTest = {
    'popularGenres': [
        {
            'nameRu': 'драма',
            'nameEn': 'drama'
        },
        {
            'nameRu': 'боевик',
            'nameEn': 'action'
        },
        {
            'nameRu': 'триллер',
            'nameEn': 'thriller'
        },
        {
            'nameRu': 'криминал',
            'nameEn': 'crime'
        },
        {
            'nameRu': 'комедия',
            'nameEn': 'comedy'
        },
        {
            'nameRu': 'фантастика',
            'nameEn': 'fantastic'
        },
        {
            'nameRu': 'приключения',
            'nameEn': 'adventures'
        },
        {
            'nameRu': 'семейный',
            'nameEn': 'family'
        },
        {
            'nameRu': 'аниме',
            'nameEn': 'anime'
        },
        {
            'nameRu': 'фэнтези',
            'nameEn': 'fantasy'
        }
    ],
    'genres': [
        {
            'nameRu': 'драма',
            'nameEn': 'drama'
        },
        {
            'nameRu': 'боевик',
            'nameEn': 'action'
        },
        {
            'nameRu': 'триллер',
            'nameEn': 'thriller'
        },
        {
            'nameRu': 'криминал',
            'nameEn': 'crime'
        },
        {
            'nameRu': 'комедия',
            'nameEn': 'comedy'
        },
        {
            'nameRu': 'фантастика',
            'nameEn': 'fantastic'
        },
        {
            'nameRu': 'приключения',
            'nameEn': 'adventures'
        },
        {
            'nameRu': 'семейный',
            'nameEn': 'family'
        },
        {
            'nameRu': 'аниме',
            'nameEn': 'anime'
        },
        {
            'nameRu': 'фэнтези',
            'nameEn': 'fantasy'
        }
    ],
    'popularCountries': [
        {
            'nameRu': 'Россия',
            'nameEn': 'Russia'
        },
        {
            'nameRu': 'США',
            'nameEn': 'USA'
        },
        {
            'nameRu': 'Германия',
            'nameEn': 'Germany'
        },
        {
            'nameRu': 'Великобритания',
            'nameEn': 'Great Britain'
        },
        {
            'nameRu': 'Япония',
            'nameEn': 'Japan'
        },
        {
            'nameRu': 'Китай',
            'nameEn': 'China'
        },
        {
            'nameRu': 'Корея Южная',
            'nameEn': 'South Korea'
        },
        {
            'nameRu': 'Индия',
            'nameEn': 'India'
        },
        {
            'nameRu': 'СССР',
            'nameEn': 'SSSR'
        },
        {
            'nameRu': 'Франция',
            'nameEn': 'France'
        }
    ],
    'countries': [
        {
            'nameRu': 'Россия',
            'nameEn': 'Russia'
        },
        {
            'nameRu': 'США',
            'nameEn': 'USA'
        },
        {
            'nameRu': 'Германия',
            'nameEn': 'Germany'
        },
        {
            'nameRu': 'Великобритания',
            'nameEn': 'Great Britain'
        },
        {
            'nameRu': 'Япония',
            'nameEn': 'Japan'
        },
        {
            'nameRu': 'Китай',
            'nameEn': 'China'
        },
        {
            'nameRu': 'Корея Южная',
            'nameEn': 'South Korea'
        },
        {
            'nameRu': 'Индия',
            'nameEn': 'India'
        },
        {
            'nameRu': 'СССР',
            'nameEn': 'SSSR'
        },
        {
            'nameRu': 'Франция',
            'nameEn': 'France'
        }
    ],
    'years': [2019, 2010, 1980, 2020],
    'rating': 10,
    'grade': 10,
    'producer': '',
    'actor': ''
}
