import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAlbums } from '../AlbumsManagementPage/logic/actions';
import Header from '../Header';
import styles from './default.module.scss';

interface Props {
	overflowHidden?: boolean;
}

const DefaultPageWrapper: React.FC<Props> = ({ children, overflowHidden }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAlbums());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<Header />
			<div className={[styles.remaining, overflowHidden ? styles.hidden : ''].join(' ')}>{children}</div>
		</div>
	);
};

export default DefaultPageWrapper;
