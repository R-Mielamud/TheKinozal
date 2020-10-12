import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid, Header as HeaderUI } from 'semantic-ui-react';
import Spinner from '../../components/common/Spinner';
import { RootState } from '../../typings/rootState';
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
		<Grid columns="2" textAlign="center" verticalAlign="middle" className={styles.header}>
			<Grid.Column style={{ paddingBottom: 0 }}>
				<HeaderUI as="h1">
					<span className={styles.normal}>The</span>
					Kinozal
				</HeaderUI>
			</Grid.Column>
			<Grid.Column style={{ paddingBottom: 0 }}>
				<AlbumsMenu />
				<Button primary style={{ marginLeft: 30 }}>
					Create album
				</Button>
			</Grid.Column>
		</Grid>
	);
};

export default Header;
