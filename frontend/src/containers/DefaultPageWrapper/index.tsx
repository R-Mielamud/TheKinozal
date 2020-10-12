import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAlbums } from '../AlbumsMenu/logic/actions';
import Header from '../Header';

const DefaultPageWrapper: React.FC = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAlbums());
	}, [dispatch]);

	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default DefaultPageWrapper;
