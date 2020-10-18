import React, { useState } from 'react';
import { Header } from 'semantic-ui-react';
import { Article, getArticles } from './config/articles';
import styles from './landing.module.scss';

const LandingPage: React.FC = () => {
	const [articles] = useState<Article[]>(getArticles(styles));

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
								<Header as="h3">{part.header}</Header>
								<p>{part.text}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default LandingPage;
