import { FC } from "react";
import { Carousel } from "../../../Carousel/Carousel";
import { TopWeekFilmCard } from "../../../TopWeekCard/TopWeekFilmCard";
import { useTranslation } from "react-i18next";
interface ITopWeekFilmsBlockProps { };

export const TopWeekFilmsBlock: FC<ITopWeekFilmsBlockProps> = (props) => {
	const { t, i18n } = useTranslation([]);
	return (
		<section className="pageSection home__pageSection">
			<div className="pageSection__container">
				<div className="gallery">
					<div className="gallery__blockHeader">
						<img src="	https://solea-parent.dfs.ivi.ru/picture/bypass/top10.svg" alt="" /><span>{t('mainPage.topCompilation')}</span>
					</div>
					<Carousel variant="cards">
						<TopWeekFilmCard
							url='https://thumbs.dfs.ivi.ru/storage26/contents/9/8/b2c89d97f81efe2e16746be8d57cb5.jpg/304x620//?q=85'
							titleUrl='https://thumbs.dfs.ivi.ru/storage15/contents/9/8/b62bd137fb90981fbd639a4f85cf8d.png/x200/?q=85'
							placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number1.svg'
							id='28'
						/>
						<TopWeekFilmCard
							url='https://thumbs.dfs.ivi.ru/storage28/contents/5/7/60a7c6ae7f39f90163a3e1b72a8173.jpg/304x620//?q=85'
							titleUrl='https://thumbs.dfs.ivi.ru/storage33/contents/c/6/ebb1f750328adf266b9d867e6ce2d2.png/x200/?q=85'
							placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number2.svg'
							id='71'
						/>
						<TopWeekFilmCard
							url='https://thumbs.dfs.ivi.ru/storage39/contents/d/c/69170dd1e57bb66ba83bcd5d17fc26.jpg/304x620//?q=85'
							titleUrl='https://thumbs.dfs.ivi.ru/storage6/contents/4/5/f96ec81818f51fef8f269df712d488.png/x200/?q=85'
							placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number3.svg'
							id='26'
						/>
						<TopWeekFilmCard
							url='	https://st.kp.yandex.net/images/film_iphone/iphone360_4700336.jpg'
							titleUrl=''
							placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number4.svg'
							id='6'
						/>
						<TopWeekFilmCard
							url='https://st.kp.yandex.net/images/film_iphone/iphone360_678233.jpg'
							titleUrl=''
							placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number5.svg'
							id='103'
						/>
						<TopWeekFilmCard
							url='https://st.kp.yandex.net/images/film_iphone/iphone360_1318972.jpg'
							titleUrl=''
							placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number6.svg'
							id='56'
						/>
						<TopWeekFilmCard
							url='https://st.kp.yandex.net/images/film_iphone/iphone360_370.jpg'
							titleUrl=''
							placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number7.svg'
							id='122'
						/>
						<TopWeekFilmCard
							url='https://st.kp.yandex.net/images/film_iphone/iphone360_462682.jpg'
							titleUrl=''
							placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number8.svg'
							id='86'
						/>
						<TopWeekFilmCard
							url='https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg'
							titleUrl=''
							placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number9.svg'
							id='114'
						/>
						<TopWeekFilmCard
							url='https://st.kp.yandex.net/images/film_iphone/iphone360_301.jpg'
							titleUrl=''
							placeUrl='https://solea-parent.dfs.ivi.ru/picture/bypass/number10.svg'
							id='250'
						/>
					</Carousel>
				</div>
			</div>
		</section>
	);
}
