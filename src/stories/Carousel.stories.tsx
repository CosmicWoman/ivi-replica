import type { Meta, StoryObj } from '@storybook/react';

import '../styles/App.scss'
import '../components/Pages/MainPage/MainPage.scss'
import { Carousel } from '../components/Carousel/Carousel';
import FilmCard from '../components/FilmCard/FilmCard';
import { FilmBanner } from '../components/filmBanner/FilmBanner';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';

const meta: Meta<typeof Carousel> = {
	title: 'Components/Carousel',
	component: Carousel,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			description: 'Варианты слайдера',
			options: ['cards', 'filters', 'tv', 'main'],
			control: {
				type: 'radio',
				defaultValue: 'main'
			}
		},
		children: {
			description: 'Принимает список компонент и HTML элементов',
		}
	}
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const movie = {
	'key': 1,
	'nameRu': 'Властелин колец: Братство Кольца',
	'nameEn': 'The Lord of the Rings: The Fellowship of the Ring',
	'year': 2001,
	'poster': 'https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/a2d5bcae-a1a9-442f-8195-f5373a5ba77f/360',
	'rating': 8.6,
	'filmLength': 178,
	'countryRu': 'Новая Зеландия',
	'countryEn': 'New Zealand',
	'genreRu': 'фэнтези',
	'genreEn': 'fantasy',
}

export const cards: Story = {
	args: {
		variant: 'cards'
	},
	render: () => (
		<div style={{ padding: '100px', backgroundColor: '#100e19' }}>
			<Provider store={store}>
				<Carousel variant='cards'>
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
					<FilmCard film={movie} onClick={() => console.log(movie)} />
				</Carousel>
			</Provider>

		</div>
	)
};

export const filters: Story = {
	args: {
		variant: 'filters'
	},
	render: () => (
		<div style={{ padding: '100px', backgroundColor: '#1f1b2e' }}>
			<Carousel variant='filters'>
				<div style={{ backgroundColor: 'white', marginRight: '10px', minWidth: '150px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'green', marginRight: '10px', minWidth: '150px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'blue', marginRight: '10px', minWidth: '180', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'gray', marginRight: '10px', minWidth: '150px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'purple', marginRight: '10px', minWidth: '150px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'pink', marginRight: '10px', minWidth: '150px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'red', marginRight: '10px', minWidth: '100px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'crimson', marginRight: '10px', minWidth: '120px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'snow', marginRight: '10px', minWidth: '130px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'teal', marginRight: '10px', minWidth: '200', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'tomato', marginRight: '10px', minWidth: '150px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'chocolate', marginRight: '10px', minWidth: '140px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'brown', marginRight: '10px', minWidth: '90px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'darkgoldenrod', marginRight: '10px', minWidth: '150px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'coral', marginRight: '10px', minWidth: '150px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'darkviolet', marginRight: '10px', minWidth: '80px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'skyblue', marginRight: '10px', minWidth: '180px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'cyan', marginRight: '10px', minWidth: '150px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'firebrick', marginRight: '10px', minWidth: '150px', minHeight: '30px', borderRadius: '30px' }}></div>
				<div style={{ backgroundColor: 'aqua', marginRight: '10px', minWidth: '240', minHeight: '30px', borderRadius: '30px' }}></div>
			</Carousel>
		</div>
	)
};

export const main: Story = {
	args: {
		variant: 'main'
	},
	render: () => (
		<div style={{ marginTop: '100px', backgroundColor: '#100e19' }}>

			<Provider store={store}>
				<BrowserRouter>
					<Carousel variant='main'>
						<FilmBanner
							description="Столичные богачи учатся выживать в деревне. Продолжение хитового сериала с россыпью звёзд"
							img="https://thumbs.dfs.ivi.ru/storage28/contents/7/3/311c6a4093803c950d1153b674e3d7.jpg/1216x524/?q=85"
							imgSm="https://thumbs.dfs.ivi.ru/storage33/contents/8/5/f1efb4f8b074d5275e5414569ca667.jpg/1216x1358/?q=60"
							logo="https://thumbs.dfs.ivi.ru/storage33/contents/c/6/ebb1f750328adf266b9d867e6ce2d2.png/x200/"
							id="71"
						/>

						<FilmBanner
							description="Бывший военный готовит план мести за убитого бандитами брата. Боевик с Владимиром Епифанцевым"
							img="https://thumbs.dfs.ivi.ru/storage3/contents/5/e/57e62a9708f79edf703813a3f48eaa.jpg/1216x524/?q=60"
							imgSm="https://thumbs.dfs.ivi.ru/storage31/contents/8/4/c0b052a572a98100a246e2a9c12261.jpg/1216x1358/?q=60"
							logo="https://thumbs.dfs.ivi.ru/storage3/contents/b/4/53b2eb53a78e7761c394e17c52069f.png/x200/"
							id="103"
						/>

						<FilmBanner
							description="Экранизация подросткового бестселлера о страстной любви отличницы и бойца без правил"
							img="https://thumbs.dfs.ivi.ru/storage2/contents/9/1/4985aa6b1bea7a90e4ecd766a3871c.jpg/1216x524/?q=60"
							imgSm="https://thumbs.dfs.ivi.ru/storage2/contents/d/1/bdfc4cc20a287961b5d997fb703c74.jpg/1216x1358/?q=60"
							logo="https://thumbs.dfs.ivi.ru/storage4/contents/f/1/3aa0a1cd2eee0614ac0bc92c48b135.png/x200/"
							id="6"
						/>

						<FilmBanner
							description="За кулисами эпохального процесса завязывается опасный заговор. Историческая драма Николая Лебедева"
							img="https://thumbs.dfs.ivi.ru/storage5/contents/f/6/e9a5c19056bd6b9826c35733be0a5a.jpg/1216x524/?q=60"
							imgSm="https://thumbs.dfs.ivi.ru/storage26/contents/a/4/96e659bef3541a13920d01054381ff.jpg/1216x1358/?q=60"
							logo="https://thumbs.dfs.ivi.ru/storage6/contents/4/5/f96ec81818f51fef8f269df712d488.png/x200/"
							id="26"
						/>
					</Carousel>
				</BrowserRouter>
			</Provider>



		</div>
	)
};

export const tv: Story = {
	args: {
		variant: 'tv'
	},
	render: () => (
		<div style={{ padding: '100px', backgroundColor: '#1f1b2e' }}>
			<Carousel variant='tv'>
				<div style={{ backgroundColor: 'white', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'green', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'blue', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'gray', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'purple', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'pink', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'red', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'crimson', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'snow', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'teal', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'tomato', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'chocolate', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'brown', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'darkgoldenrod', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'coral', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
				<div style={{ backgroundColor: 'darkviolet', marginRight: '10px', minWidth: '150px', minHeight: '60px', borderRadius: '5px' }}></div>
			</Carousel>
		</div>
	)
};
