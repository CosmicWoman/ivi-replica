import {Meta, StoryObj} from "@storybook/react";
import FilterTwoBlocks from "../components/Filters/FilterTypes/FilterGenre&Countries/FilterTwoBlocks";

const meta: Meta<typeof FilterTwoBlocks> = {
    title: 'Components/Filters/FilterGenre&Countries',
    component: FilterTwoBlocks,
    tags: ['autodocs'],
    argTypes: {
        popularValues: {
            description: 'Массив популярных значений фильтра',
            options: [{}]
        },

        allValues: {
            description: 'Массив всех значений фильтра',
            options: [{}]
        },

        selectValues: {
            description: 'Выбранные значения конкретного фильтра',
        },

        handleChangeFilter: {
            description: 'Все выбранные фильтры',
        },
    }
};

export default meta;
type Story = StoryObj<typeof FilterTwoBlocks>;

export const FilterBlocks: Story = {
    render: (args) => (
        <div {...args} style={{'backgroundColor': '#FFFFFF', 'minHeight': 393}}>
            <FilterTwoBlocks popularValues={args.popularValues} allValues={args.allValues}
                             selectValues={args.selectValues} handleChangeFilter={args.handleChangeFilter}/>
        </div>
    ),
    args: {
        popularValues: [
            {
                nameRu: 'Жанр',
                nameEn: 'Genre'
            },
            {
                nameRu: 'Жанр2',
                nameEn: 'Genre2'
            },],
        allValues: [
            {
                nameRu: 'Жанр',
                nameEn: 'Genre'
            },
            {
                nameRu: 'Жанр2',
                nameEn: 'Genre2'
            },
            {
                nameRu: 'Жанр3',
                nameEn: 'Genre3'
            },
        ],
        selectValues: ['Жанр3', 'Жанр2'],
        handleChangeFilter: function () {
        }
    }
};
