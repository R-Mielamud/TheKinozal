import React, { useMemo } from 'react';
import { Header } from 'semantic-ui-react';
import { Article, getArticles } from './config/articles';
import styles from './landing.module.scss';
import { useTranslation } from 'react-i18next';

const LandingPage: React.FC = () => {
	const { t } = useTranslation();
	const articles = useMemo<Article[]>(() => getArticles(styles, t), [t]);

	return (
		<div className={styles.wrapper}>
			{articles.map((article, i) => (
				<div className={[styles.article, article.className].join(' ')} key={i}>
					{article.image ? (
						<img className={styles.image} src={article.image.src} alt={article.image.alt} />
					) : null}
					<div className={styles.textBlock}>
						{article.parts.map((part, i) => (
							<div className={styles.part} key={i}>
								{part.header ? <Header className={styles.header}>{part.header}</Header> : null}
								{part.text ? <p>{part.text}</p> : null}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default LandingPage;
