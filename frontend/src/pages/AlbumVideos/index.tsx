import React from 'react';
import { useRouteMatch } from 'react-router';
import AlbumVideosPage from '../../containers/AlbumVideosPage';
import DefaultPageWrapper from '../../containers/DefaultPageWrapper';
import { isdigit } from '../../helpers/isdigit.helper';
import NotFound from '../NotFound';

interface Match {
	albumid: string;
}

const AlbumVideos: React.FC = () => {
	const match = useRouteMatch<Match>();
	const albumIdString = match.params.albumid;

	if (!isdigit(albumIdString)) {
		return <NotFound />;
	}

	const digitalId = Number(albumIdString);

	return (
		<DefaultPageWrapper overflowHidden>
			<AlbumVideosPage selectedAlbumId={digitalId} />
		</DefaultPageWrapper>
	);
};

export default AlbumVideos;
