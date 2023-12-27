export interface Filters {
    'genres': Genres[],
    'countries': Countries[],
    'years': number[]
}

interface Countries {
    'countryName': string,
    'countryNameEn': string
}

interface Genres {
    'nameRu': string,
    'nameEn': string
}

export interface Films {
    "id": number,
    "trailerName": string,
    "trailerUrl": string,
    "ratingKp": number,
    "votesKp": number,
    "ratingImdb": number,
    "votesImdb": number,
    "ratingFilmCritics": number,
    "votesFilmCritics": number,
    "ratingRussianFilmCritics": number,
    "votesRussianFilmCritics": number,
    "movieLength": number,
    "originalFilmLanguage": string,
    "filmNameRu": string,
    "filmNameEn": string,
    "description": string,
    "premiereCountry": string,
    "slogan": string,
    "bigPictureUrl": string,
    "smallPictureUrl": string,
    "year": number,
    "top10": string,
    "top250": number,
    "premiereWorldDate": string,
    "createdAt": string,
    "countries": Genres,
    "genres":
        {
            "id": number,
            "nameRu": string,
            "nameEn": string,
            "FilmGenre": {
                "A": number,
                "B": number
            }
        }
}

export interface FilmPage {
    "film": {
        "id": number,
        "trailerName": string,
        "trailerUrl": string,
        "ratingKp": number,
        "votesKp": number,
        "ratingImdb": number,
        "votesImdb": number,
        "ratingFilmCritics": number,
        "votesFilmCritics": number,
        "ratingRussianFilmCritics": number,
        "votesRussianFilmCritics": number,
        "movieLength": number,
        "originalFilmLanguage": string,
        "filmNameRu": string,
        "filmNameEn": string,
        "description": string,
        "premiereCountry": string,
        "slogan": string,
        "bigPictureUrl": string,
        "smallPictureUrl": string,
        "year": number,
        "top10": string,
        "top250": number,
        "premiereWorldDate": string,
        "createdAt": string,
        "persons": FPerson[],
        "countries": FCountries[],
        "genres": FGenres[],
        "fact": FFact,
        "comments": []
    },
}

interface FGenres {
    "id": number,
    "nameRu": string,
    "nameEn": string,
    "FilmGenre": {
        "A": number,
        "B": number
    }
}

interface FCountries {
    "id": number,
    "countryName": string,
    "countryNameEn": string,
    "FilmCountry": {
        "A": number,
        "B": number
    }
}

interface FPerson {
    "id": number,
    "photoUrl": string,
    "nameRu": string,
    "nameEn": string,
    "FilmPerson": FilmPersonProps,
    "professions": PersonProfessions[]
}

interface FFact {
    "id": number,
    "value": string,
    "type": string,
    "spoiler": boolean,
    "filmId": number
}

interface PersonProfessions {
    "id": number,
    "name": string,
    "PersonProfession": {
        "A": number,
        "B": number
    }
}

interface FilmPersonProps {
    "A": number,
    "B": number
}

export interface PersonPage {
    "id": number,
    "photoUrl": string,
    "nameRu": string,
    "nameEn": string,
    "professions": PersonProfessions[],
    "films": filmPagePerson[]
}

interface filmPagePerson {
    "id": number,
    "trailerName": string,
    "trailerUrl": string,
    "ratingKp": number,
    "votesKp": number,
    "ratingImdb": number,
    "votesImdb": number,
    "ratingFilmCritics": number,
    "votesFilmCritics": number,
    "ratingRussianFilmCritics": number,
    "votesRussianFilmCritics": number,
    "movieLength": number,
    "originalFilmLanguage": string,
    "filmNameRu": string,
    "filmNameEn": string,
    "description": string,
    "premiereCountry": string,
    "slogan": string,
    "bigPictureUrl": string,
    "smallPictureUrl": string,
    "year": number,
    "top10": string,
    "top250": number,
    "premiereWorldDate": string,
    "createdAt": string,
    "FilmPerson": FilmPersonProps
}
