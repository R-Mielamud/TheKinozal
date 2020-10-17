import React from 'react';
import { useSelector } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import Spinner from '../../components/common/Spinner';
import history from '../../helpers/history.helper';
import { RootState } from '../../typings/rootState';
import styles from './albums.module.scss';
import AlbumModal from '../AlbumModal';
import { useTranslation } from 'react-i18next';

const AlbumsMenu: React.FC = () => {
	const { t } = useTranslation();
	const { user } = useSelector((state: RootState) => state.auth);
	const { albums } = useSelector((state: RootState) => state.albums);

	if (!user) {
		return null;
	}

	if (!albums) {
		return <Spinner />;
	}

	const select = (id: number) => {
		history.push(`/watch/${id}`);
	};

	return (
		<Dropdown text={t('select_album_to_watch')}>
			<Dropdown.Menu className={styles.menu}>
				<Dropdown.Header>{t('all_albums')}</Dropdown.Header>
				{albums.length ? (
					albums.map((album) => (
						<Dropdown.Item key={album.id} onClick={() => select(album.id)}>
							{album.name}
						</Dropdown.Item>
					))
				) : (
					<AlbumModal>
						<Dropdown.Item>{t('no_albums_click_to_create')}</Dropdown.Item>
					</AlbumModal>
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default AlbumsMenu;
