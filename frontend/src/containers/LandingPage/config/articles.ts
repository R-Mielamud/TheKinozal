import image1 from '../../../assets/screenshots/1.png';
import image2 from '../../../assets/flyawaybee.png';

interface Styles {
	[key: string]: string;
}

interface ArticleImage {
	src: string;
	alt: string;
}

interface ArticlePart {
	header: string;
	text: string;
}

export interface Article {
	className: string;
	parts: ArticlePart[];
	image?: ArticleImage;
}

export const getArticles = (styles: Styles): Article[] => [
	{
		className: styles.left,
		parts: [
			{
				header: 'Header',
				text: 'Long long long long text...',
			},
		],
		image: {
			src: image1,
			alt: 'Screenshot',
		},
	},
	{
		className: styles.right,
		parts: [
			{
				header: 'Header',
				text: 'Long long long long text...',
			},
		],
		image: {
			src: image2,
			alt: 'Bee',
		},
	},
	{
		className: styles.center,
		parts: [
			{
				header: 'Header',
				text: 'Long long long long text...',
			},
		],
	},
];
