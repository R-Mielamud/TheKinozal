import React from 'react';
import { useTranslation } from 'react-i18next';
import chickensImage from '../../assets/chickens.png';
import styles from './notloaded.module.scss';

const VideoNotLoaded: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>{t('video_not_uploaded')}</h2>
			<img src={chickensImage} alt="Chickens" className={styles.image} />
			<div className={styles.text}>{t('video_not_uploaded_text')}</div>
		</div>
	);
};

export default VideoNotLoaded;
