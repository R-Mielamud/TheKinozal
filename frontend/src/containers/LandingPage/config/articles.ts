import albumVideosImage from '../../../assets/screenshots/albumvideos.png';
import manageAlbumsImage from '../../../assets/screenshots/managealbums.png';
import manageVideosImage from '../../../assets/screenshots/managevideos.png';

interface Styles {
	[key: string]: string;
}

interface ArticleImage {
	src: string;
	alt: string;
}

interface ArticlePart {
	header?: string;
	text?: string;
	centered?: boolean;
}

export interface Article {
	className: string;
	parts: ArticlePart[];
	image?: ArticleImage;
}

export const getArticles = (styles: Styles, t: (key: string) => string): Article[] => [
	{
		className: [styles.right, styles.centered].join(' '),
		parts: [
			{
				header: t('landing_article1_header'),
			},
		],
		image: {
			src: albumVideosImage,
			alt: 'Watching videos',
		},
	},
	{
		className: styles.center,
		parts: [
			{
				header: 'TheKinozal - the fastest video access ever!',
				text: t('landing_article2_text'),
			},
		],
	},
	{
		className: styles.left,
		parts: [
			{
				header: t('landing_article3_header'),
				text: t('landing_article3_text'),
			},
		],
		image: {
			src: manageAlbumsImage,
			alt: 'Albums management',
		},
	},
	{
		className: styles.right,
		parts: [
			{
				header: t('landing_article4_header'),
				text: t('landing_article4_text'),
			},
		],
		image: {
			src: manageVideosImage,
			alt: 'Videos management',
		},
	},
	{
		className: styles.center,
		parts: [
			{
				header: t('landing_article5_header'),
			},
		],
	},
];
