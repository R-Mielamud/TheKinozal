import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from 'semantic-ui-react';
import chickensImage from '../../assets/chickens.png';
import VideoModal from '../../containers/VideoModal';
import styles from './novideo.module.scss';

interface Props {
	albumId: number;
}

const NoVideoSelected: React.FC<Props> = ({ albumId }) => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>{t('no_video_selected')}</h2>
			<VideoModal albumId={albumId}>
				<Button primary>
					<Icon name="plus circle" />
					{t('create_video')}
				</Button>
			</VideoModal>
			<img src={chickensImage} alt="Chickens" className={styles.image} />
		</div>
	);
};

export default NoVideoSelected;
