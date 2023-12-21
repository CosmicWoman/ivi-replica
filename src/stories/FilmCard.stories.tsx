import FilterButton from "../components/Filters/FilterButton/FilterButton";
import {Meta, StoryObj} from "@storybook/react";
import FilmCard from "../components/FilmCard/FilmCard";
import { Provider } from "react-redux";
import { store } from '../store';

const meta: Meta<typeof FilmCard> = {
    title: 'Components/FilmCard',
    component: FilmCard,
    tags: ['autodocs'],
    argTypes: {
        film: {
            description: 'jSon c информацией по конкретному фильму',
            options: '',
        },
        onClick: {
            description: 'Переход на страницу фильма по клику',
            defaultValue: [],
        },
        icons: {
            description: 'Добавление иконок',
            defaultValue: false,
        }
    }
};

export default meta;
type Story = StoryObj<typeof FilmCard>;
export const Default: Story = {
    
    render: (args) => (
        <Provider store={store}> 
          <FilmCard film={args.film} onClick={args.onClick} icons={args.icons}/>     
        </Provider> 
    ),
    args: {
        film: {
            key: 2,
            nameRu: 'Россия',
            nameEn: 'Russia',
            year: 2225,
            poster: 'https://thumbs.dfs.ivi.ru/storage15/contents/7/d/63b0be8961c8eb0ef20b97a933b864.jpg/234x360//?q=85',
            rating: 8.6,
            filmLength: 120,
            countryRu: 'Россия',
            countryEn: 'Russia',
                genreRu: 'Фэнтези',
            genreEn: 'Fantasy'
        },
        onClick: () => {},
        icons: false
    }
  };