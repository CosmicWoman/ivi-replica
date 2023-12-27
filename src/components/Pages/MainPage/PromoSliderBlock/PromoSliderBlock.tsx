import { FC } from "react";
import { Carousel } from "../../../Carousel/Carousel";
import { FilmBanner } from "../../../filmBanner/FilmBanner";
interface IPromoSliderBlockProps { };

export const PromoSliderBlock: FC<IPromoSliderBlockProps> = (props) => {
	return (
		<div className="home__promoSlider promoSlider">
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
		</div>
	);
}
