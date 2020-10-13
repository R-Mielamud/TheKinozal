import React from 'react';
import AlbumsManagementPage from '../../containers/AlbumsManagementPage';
import DefaultPageWrapper from '../../containers/DefaultPageWrapper';

const ManageAlbums: React.FC = () => {
	return (
		<DefaultPageWrapper>
			<AlbumsManagementPage />
		</DefaultPageWrapper>
	);
};

export default ManageAlbums;
