import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
interface IClauseBlockProps { };

export const ClauseBlock: FC<IClauseBlockProps> = (props) => {
	const { t, i18n } = useTranslation([]);

	const [isClauseSectionTruncated, setIsClauseSectionTruncated] = useState<boolean>(false)
	return (
		<section className="pageSection home__pageSection">
			<div className="pageSection__container">
				<div className="clause home__clause">
					<div className="clause__header">
						<h2 className="clause__title">
							{t('mainPage.clauseBlock.title')}
						</h2>
					</div>
					<div className={`clause__text ${!isClauseSectionTruncated && 'hidden-children'}`} >
						<p>
							{t('mainPage.clauseBlock.paragraph_1')}
						</p>
						<p>
							{t('mainPage.clauseBlock.paragraph_2')}
						</p>
						<p>
							{t('mainPage.clauseBlock.paragraph_3')}
						</p>
						<ol>
							<li>
								{t('mainPage.clauseBlock.listEl_1')}
							</li>
							<li>
								{t('mainPage.clauseBlock.listEl_2')}
							</li>
							<li>
								{t('mainPage.clauseBlock.listEl_3')}
							</li>
							<li>
								{t('mainPage.clauseBlock.listEl_4')}
							</li>
							<li>
								{t('mainPage.clauseBlock.listEl_5')}
							</li>
							<li>
								{t('mainPage.clauseBlock.listEl_6')}
							</li>
							<li>
								{t('mainPage.clauseBlock.listEl_7')}
							</li>
							<li>
								{t('mainPage.clauseBlock.listEl_8')}
							</li>
						</ol>
						<p>
							{t('mainPage.clauseBlock.paragraph_4')}
						</p>
					</div>
					<span
						className="clause__toggle"
						onClick={() => setIsClauseSectionTruncated(prev => !prev)}
					>
						{isClauseSectionTruncated ? t('mainPage.clauseBlock.toggleHide') : t('mainPage.clauseBlock.toggleShow')}
					</span>
				</div>
			</div>
		</section>
	);
}
