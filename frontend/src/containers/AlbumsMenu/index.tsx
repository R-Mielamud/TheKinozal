import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import Spinner from '../../components/common/Spinner';
import { RootState } from '../../typings/rootState';
import styles from './albums.module.scss';
import { setSelectedAlbum } from './logic/actions';

const AlbumsMenu: React.FC = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.auth);
	const { albums } = useSelector((state: RootState) => state.albums);

	if (!user) {
		return null;
	}

	if (!albums) {
		return <Spinner />;
	}

	const setSelected = (id: number) => {
		dispatch(setSelectedAlbum({ id }));
	};

	return (
		<Dropdown text="Select album to watch" className={[styles.dropdown, 'selectAlbum'].join(' ')}>
			<Dropdown.Menu className={styles.menu}>
				<Dropdown.Header>All albums</Dropdown.Header>
				{albums.length ? (
					albums.map((album) => (
						<Dropdown.Item key={album.id} onClick={() => setSelected(album.id)}>
							{album.name}
						</Dropdown.Item>
					))
				) : (
					<Dropdown.Item>No albums. Click to create one!</Dropdown.Item>
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default AlbumsMenu;
