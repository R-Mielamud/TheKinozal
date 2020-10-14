import React from 'react';
import { useRouteMatch } from 'react-router';
import DefaultPageWrapper from '../../containers/DefaultPageWrapper';
import VideosManagement from '../../containers/VideosManagementPage';
import { isdigit } from '../../helpers/isdigit.helper';

interface Match {
	albumid: string;
}

const ManageVideos: React.FC = () => {
	const match = useRouteMatch<Match>();
	const albumIdString = match.params.albumid;

	if (!isdigit(albumIdString)) {
		return null;
	}

	const digitalId = Number(albumIdString);

	return (
		<DefaultPageWrapper>
			<VideosManagement albumId={digitalId} />
		</DefaultPageWrapper>
	);
};

export default ManageVideos;
