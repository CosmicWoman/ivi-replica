import {Meta, StoryObj} from "@storybook/react";
import MyInput from "../components/UI/Inputs/MyInput/MyInput";
import RowSearchResult from "../components/Search/RowSearchResult/RowSearchResult";


const meta: Meta<typeof MyInput> = {
    title: 'UI/Search',
    component: MyInput,
    tags: ['autodocs'],
    argTypes: {
        result: {
            description:'Объект с результатами поиска',
            options: [{name: 'name', key: 'key'}]
        },
        renderResult: {
            description: 'Принимает формат, в котором нужно выводить результат поиска',
        },
        handleClear: {
            description: 'Используется в фильтрах для очищения фильтра',
        },
        placeholder: {
            description: 'Задаёт подпись для поисковой строки',
            options: 'Поиск...'
        },
        searchQuery: {
            description: 'Хранит строку поиска, введенную пользователем'
        },
        setSearchQuery: {
            description: 'Перезаписывет строку поиска'
        },
    }
};

export default meta;
type Story = StoryObj<typeof MyInput>;

export const NotActive: Story = {
    args: {
        result: [{name: 'name', key: 'key'}],
        renderResult: (item: any) => (<></>),
        placeholder: 'Поиск...',
        searchQuery: '',
        setSearchQuery: function (){}
    }
};

export const Active: Story = {
    args: {
        result: [{name: 'name', key: 'key'}],
        renderResult: (item: any) => (<></>),
        placeholder: 'Поиск...',
        searchQuery: ' ',
        setSearchQuery: function (){}
    }
};