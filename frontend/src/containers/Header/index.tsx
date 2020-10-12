import React from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Header as HeaderUI, Menu } from 'semantic-ui-react';
import Spinner from '../../components/common/Spinner';
import { RootState } from '../../typings/rootState';
import AlbumModal from '../AlbumModal';
import AlbumsMenu from '../AlbumsMenu';
import styles from './header.module.scss';

const Header: React.FC = () => {
	const { user } = useSelector((state: RootState) => state.auth);
	const { albums } = useSelector((state: RootState) => state.albums);

	if (!user) {
		return null;
	}

	if (!albums) {
		return <Spinner />;
	}

	return (
		<div className={[styles.header, 'siteHeader'].join(' ')}>
			<Menu secondary className={styles.menu}>
				<Menu.Item>
					<HeaderUI as="h1" style={{ display: 'inline' }}>
						<span className={styles.normal}>The</span>
						Kinozal
					</HeaderUI>
				</Menu.Item>
				<Menu.Item>
					<Dropdown text="Albums" style={{ marginLeft: 20 }}>
						<Dropdown.Menu>
							<AlbumModal>
								<Dropdown.Item>Create album</Dropdown.Item>
							</AlbumModal>
							<Dropdown.Item>Manage albums</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
				<Menu.Menu position="right">
					<Menu.Item>
						<AlbumsMenu />
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		</div>
	);
};

export default Header;
