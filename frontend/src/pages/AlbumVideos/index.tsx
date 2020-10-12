import React from 'react';
import AlbumVideosPage from '../../containers/AlbumVideosPage';
import DefaultPageWrapper from '../../containers/DefaultPageWrapper';

const AlbumVideos: React.FC = () => {
	return (
		<DefaultPageWrapper overflowHidden>
			<AlbumVideosPage />
		</DefaultPageWrapper>
	);
};

export default AlbumVideos;
