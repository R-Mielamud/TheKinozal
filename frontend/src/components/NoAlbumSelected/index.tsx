import React from 'react';
import { useTranslation } from 'react-i18next';
import beaverImage from '../../assets/beaver.png';
import styles from './noalbum.module.scss';

const NoAlbumSelected: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<h1>{t('no_album_selected')}</h1>
			<img src={beaverImage} alt="Beaver" />
		</div>
	);
};

export default NoAlbumSelected;
