import getEndpoints from '../server/db';
import {FilmPage, Films, Filters, PersonPage} from "./typesApi";

const endpoints = getEndpoints();

type ENDPOINTS = keyof typeof endpoints;
type RESPONSE_DATA = {
    actionFilms: Films[];
    actorPage: PersonPage;
    comedyFilms: Films[];
    filmPage: FilmPage;
    films: Films[];
    filters: Filters;
};

console.log(endpoints)
console.log(process.env.REACT_APP_NODE_ENV)

const getJson = async <T>(endpoint: ENDPOINTS): Promise<T> => {
    const path =
        process.env.REACT_APP_NODE_ENV === 'development'
            ? `http://localhost:5000/api/${endpoint}`
            : `https://raw.githubusercontent.com/CosmicWoman/ivi-replica/gh-pages/static/db/${endpoint}.json`;

    const response = await fetch(path);

    return await response.json();
};

type API = {
    get: {
        data: () => Promise<RESPONSE_DATA>;
    };
};
const api: API = {
    get: {
        // @ts-ignore
        //TODO: Проверить и исправить ошибку, по возможности.
        data: () => getJson<RESPONSE_DATA>('data'),
    },
};

export type {RESPONSE_DATA, ENDPOINTS};
export default api;