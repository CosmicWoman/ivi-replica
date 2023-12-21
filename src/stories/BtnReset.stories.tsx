import {Meta, StoryObj} from "@storybook/react";
import ButtonReset from "../components/Filters/ButtonReset/ButtonReset";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof ButtonReset> = {
    title: 'Components/ButtonReset',
    component: ButtonReset,
    tags: ['autodocs'],
    argTypes: {
        selectedFilters: {
            description: 'Все выбранные фильтры',
            options: {},
        },
        activeFilters: {
            description: 'Props без фильтров',
            options: {},
        },
        setSelectedFilters: {
            description: 'Обнуление фильтров',
        },
    }
};

export default meta;
type Story = StoryObj<typeof ButtonReset>;

export const BtnResetFilters: Story = {
    render: (args) => (
        <BrowserRouter >
            <div {...args} style={{'backgroundColor': '#1f1b2e', 'minHeight': 60}}>
                <ButtonReset selectedFilters={args.selectedFilters} activeFilters={args.activeFilters} setSelectedFilters={args.setSelectedFilters} />
            </div>
         </BrowserRouter>
    ),
    args: {
        selectedFilters: {
            'popularGenres': [],
            'popularCountries': [],
            'genres': [],
            'countries': [],
            'years': 0,
            'rating': 0,
            'grade': 0,
            'producer': '',
            'actor': ''
        },
        setSelectedFilters: function() {alert('Фильтры сброшены')},
    }
};