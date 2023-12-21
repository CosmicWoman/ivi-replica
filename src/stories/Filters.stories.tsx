import {Meta, StoryObj} from "@storybook/react";
import Filters from "../components/Filters/Filters";
import TypeYear from "../components/Filters/FilterTypes/FilterYears/TypeYear";
import {activeFilters, arrAllFiltersTest} from "../types/filtersTypes";
import {MemoryRouter} from "react-router-dom";


const meta: Meta<typeof Filters> = {
    title: 'Components/Filters',
    component: Filters,
    tags: ['autodocs'],
    argTypes: {
        activeFilters: {
            description: 'Активный блок фильтра',
        },
        allFilters: {
            description: 'Все фильтры',
        },
        selectedFilters: {
            description: 'Выбранные фильтры',
        },
        setSelectedFilters: {
            description: 'Добавляет значение в выбранные фильтры',
        },
    }
};

export default meta;
type Story = StoryObj<typeof Filters>;

export const Default: Story = {
    render: (args) => (
        <div {...args} >
            <MemoryRouter>
                <Filters activeFilters={args.activeFilters}
                         allFilters={args.allFilters}
                         selectedFilters={args.selectedFilters}
                         setSelectedFilters={args.setSelectedFilters}/>
            </MemoryRouter>

        </div>
    ),
    args: {
        activeFilters: activeFilters,
        allFilters: arrAllFiltersTest,
        selectedFilters: {
            'popularGenres': [],
            'genres': [],
            'popularCountries': [],
            'countries': [],
            'years': '2010',
            'rating': 0,
            'grade': 0,
            'producer': '',
            'actor': ''
        },
        setSelectedFilters: function (){}
    }
};