import React from 'react';
import { useRouteMatch } from 'react-router';
import AlbumVideosPage from '../../containers/AlbumVideosPage';
import DefaultPageWrapper from '../../containers/DefaultPageWrapper';
import { isdigit } from '../../helpers/isdigit.helper';

interface Match {
	albumid: string;
}

const AlbumVideos: React.FC = () => {
	const match = useRouteMatch<Match>();
	const albumIdString = match.params.albumid;

	if (!isdigit(albumIdString)) {
		return null;
	}

	const digitalId = Number(albumIdString);

	return (
		<DefaultPageWrapper overflowHidden>
			<AlbumVideosPage selectedId={digitalId} />
		</DefaultPageWrapper>
	);
};

export default AlbumVideos;
