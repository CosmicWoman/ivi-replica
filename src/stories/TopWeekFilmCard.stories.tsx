import type { Meta, StoryObj } from '@storybook/react';
import { TopWeekFilmCard } from '../components/TopWeekCard/TopWeekFilmCard';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof TopWeekFilmCard> = {
	title: 'Components/TopWeekFilmCard',
	component: TopWeekFilmCard,
	tags: ['autodocs'],
	argTypes: {
		url: {
			description: 'Url обложки'
		},
		titleUrl: {
			description: 'Url логотипа'
		},
		placeUrl: {
			description: 'Url изображения места в топ 10'
		},
		id: {
			description: 'id фильма'
		}
	}
};
export default meta;
type Story = StoryObj<typeof TopWeekFilmCard>;

export const Default: Story = {
	render: (args) => (
		<BrowserRouter >
			<div style={
				{
					'backgroundColor': '#100e19',

				}
			}>

				<TopWeekFilmCard
					url='https://thumbs.dfs.ivi.ru/storage28/contents/5/7/60a7c6ae7f39f90163a3e1b72a8173.jpg/304x620//?q=85'
					titleUrl='https://thumbs.dfs.ivi.ru/storage33/contents/c/6/ebb1f750328adf266b9d867e6ce2d2.png/x200/?q=85'
					placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number2.svg'
					id='71'
				/>
			</div>
		</BrowserRouter>
	),
	args: {
	}
};