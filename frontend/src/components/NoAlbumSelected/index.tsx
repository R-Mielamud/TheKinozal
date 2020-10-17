import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from 'semantic-ui-react';
import beaverImage from '../../assets/beaver.png';
import AlbumModal from '../../containers/AlbumModal';
import styles from './noalbum.module.scss';

const NoAlbumSelected: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<h1>{t('no_album_selected')}</h1>
			<AlbumModal>
				<Button primary>
					<Icon name="plus circle" />
					{t('create_album')}
				</Button>
			</AlbumModal>
			<img src={beaverImage} alt="Beaver" />
		</div>
	);
};

export default NoAlbumSelected;
