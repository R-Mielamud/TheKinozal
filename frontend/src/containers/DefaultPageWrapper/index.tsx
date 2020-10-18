import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAlbums } from '../AlbumsManagementPage/logic/actions';
import Header from '../Header';
import styles from './default.module.scss';

interface Props {
	overflowHidden?: boolean;
	noStartup?: boolean;
}

const DefaultPageWrapper: React.FC<Props> = ({ children, overflowHidden, noStartup }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (!noStartup) {
			dispatch(loadAlbums());
		}
	}, [dispatch, noStartup]);

	return (
		<div className={styles.container}>
			<Header />
			<div className={[styles.remaining, overflowHidden ? styles.hidden : ''].join(' ')}>{children}</div>
		</div>
	);
};

export default DefaultPageWrapper;
