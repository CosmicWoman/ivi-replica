import { FC, useEffect, useState } from "react";
import Icons from "../Icons/Icons";
import { Carousel } from "../Carousel/Carousel";
import FilmCard from "../FilmCard/FilmCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import AxiosErrorCheck from "../../hooks/AxiosErrorCheck";
import api from "../../api";

interface IFilmsCompilationProps {
	variant: string
	genre?: string
	title: string
	similarFilms?: {}[]
};

export const FilmsCompilation: FC<IFilmsCompilationProps> = ({ genre, title, variant, similarFilms }) => {
	const navigate = useNavigate()
	const [films, setFilms] = useState<Array<any>>([])
	const [errorAxios, setErrorAxios] = useState(true)

	const { t, i18n } = useTranslation([]);

	useEffect(() => {
		axiosCheck()
		if (variant === 'similarFilms' && similarFilms) {
			convertData(similarFilms)
		}
		if (variant === 'genreCompilation') {
			fetchData()
		}
	}, [])

	async function fetchData() {
		// if (errorAxios){
		// 	response = await axios.get(`http://localhost:5000/${genre}`)
		// } else {
		// 	response = await axios.get('http://localhost:5000/films', {
		// 		params: {
		// 			perPage: 19,
		// 			page: 1,
		// 			genres: genre
		// 		}
		// 	})
		// }
		const response = await api.get.data()
		const movies = response.actionFilms.map((item: any) => {
			return {
				key: item.id,
				nameRu: item.filmNameRu,
				nameEn: item.filmNameEn,
				year: item.year,
				poster: item.smallPictureUrl,
				rating: item.ratingKp,
				filmLength: item.movieLength,
				countryRu: '',
				countryEn: '',
				genreRu: '',
				genreEn: '',
			}

		})
		setFilms(movies)
	}

	function convertData(data: {}[]) {
		const movies = data.map((item: any) => {
			return {
				key: item.id,
				nameRu: item.filmNameRu,
				nameEn: item.filmNameEn,
				year: item.year,
				poster: item.smallPictureUrl,
				rating: item.ratingKp,
				filmLength: item.movieLength,
				countryRu: '',
				countryEn: '',
				genreRu: '',
				genreEn: '',
			}
		})
		setFilms(movies)
	}

	function linkToGenre() {
		if (variant === 'genreCompilation') {
			navigate(`/movies-website/films/genre/${genre}`)
		}
	}

	function axiosCheck(){
		if(errorAxios !== AxiosErrorCheck('films/')){
			setErrorAxios(AxiosErrorCheck('films/'))
		}
	}

	return (
		<section className="pageSection home__pageSection">
			<div className="pageSection__container">
				<div className="gallery">
					<div
						onClick={linkToGenre}
						className="gallery__blockHeader"
					>
						{
							variant === 'similarFilms'
								?
								`${t('filmPage.filmsCompilation.similar')} "${title}" ${t('filmPage.filmsCompilation.watches')}`
								:
								title
						}
						{
							variant === 'genreCompilation'
							&&
							<span>
								<Icons
									name="arrowRight"
									size={'15'}
									color="white"
								/>
							</span>
						}
					</div>
					<div className="gallery__carousel">
						<Carousel variant='cards'>
							{films && films.map(i => {
								return (
									<div key={i.key} className="gallery__film">
										<FilmCard
											icons={variant === 'genreCompilation' && true}
											film={i}
											onClick={(movie) => navigate('/movies-website/film/' + movie.key)}
										/>
									</div>

								)
							})}
							{variant === 'genreCompilation'
								&&
								<div onClick={() => navigate(`/movies-website/films/genre/${genre}`)} className="linkCard">
									{t('mainPage.viewAll')}
								</div>
							}
						</Carousel>
					</div>
				</div>
			</div>
		</section>

	);
}
