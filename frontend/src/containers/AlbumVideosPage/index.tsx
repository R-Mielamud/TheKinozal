import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Icon } from 'semantic-ui-react';
import { RootState } from '../../typings/rootState';
import YouTube from 'react-youtube';
import styles from './videos.module.scss';
import { youtubeConfig } from './config/youtube.config';
import VideoModal from '../VideoModal';
import history from '../../helpers/history.helper';
import { useTranslation } from 'react-i18next';
import NoVideoSelected from '../../components/NoVideoSelected';
import NotFound from '../../pages/NotFound';
import Spinner from '../../components/common/Spinner';
import VideoNotLoaded from '../../components/VideoNotLoaded';

interface Props {
	selectedAlbumId: number;
}

const AlbumVideosPage: React.FC<Props> = ({ selectedAlbumId }) => {
	const { t } = useTranslation();
	const [selectedVideo, setSelectedVideo] = useState<WebApi.Entity.Video | null>(null);
	const [canShowNotLoaded, setCanShowNotLoaded] = useState<boolean>(false);
	const { albums, albumsLoaded } = useSelector((state: RootState) => state.albums);

	const album = useMemo(() => {
		return albums.find((suspectedAlbum) => suspectedAlbum.id === selectedAlbumId);
	}, [selectedAlbumId, albums]);

	useEffect(() => {
		if (album && album.videos.length) {
			setSelectedVideo(album.videos[0]);
		}
	}, [album]);

	if (!albumsLoaded) {
		return <Spinner />;
	}

	if (!selectedAlbumId || !album) {
		return <NotFound />;
	}

	const handleVideoEnd = () => {
		if (selectedVideo) {
			const selectedVideoIndex = album.videos.findIndex((video) => video.id === selectedVideo.id);

			if (selectedVideoIndex < album.videos.length - 1) {
				const newVideo = album.videos[selectedVideoIndex + 1];
				setSelectedVideo(newVideo);
			}
		}
	};

	const youtubeSnippet =
		selectedVideo && selectedVideo.youtube_id ? (
			<YouTube
				videoId={selectedVideo.youtube_id}
				opts={youtubeConfig}
				className={styles.video}
				containerClassName={styles.videoContainer}
				onEnd={handleVideoEnd}
			/>
		) : null;

	let nativeVideoSnippet = null;

	if (canShowNotLoaded) {
		nativeVideoSnippet = <VideoNotLoaded />;
	} else if (selectedVideo && selectedVideo.custom_link) {
		nativeVideoSnippet = (
			<video
				className={styles.video}
				src={selectedVideo.custom_link}
				autoPlay
				controls
				onEnded={handleVideoEnd}
				onError={() => setCanShowNotLoaded(true)}
			/>
		);
	}

	const noVideoSnippet = <NoVideoSelected albumId={album.id} />;

	const videoSnippet = youtubeSnippet ? (
		youtubeSnippet
	) : (
		<div className={styles.videoContainer}>{nativeVideoSnippet || noVideoSnippet}</div>
	);

	return (
		<div className={styles.content}>
			<div className={styles.menu}>
				<Header className={styles.albumName} as="h4">
					{album.name}
				</Header>
				<div className={styles.videoList}>
					<VideoModal albumId={album.id}>
						<div className={styles.menuItem}>
							<Icon name="plus circle" style={{ marginRight: 5 }} />
							{t('create_video')}
						</div>
					</VideoModal>
					<div className={styles.menuItem} onClick={() => history.push(`/videos/${album.id}`)}>
						<Icon name="edit" style={{ marginRight: 5 }} />
						{t('manage_videos')}
					</div>
					{album.videos.map((video) => (
						<div
							className={[styles.menuItem, selectedVideo?.id === video.id ? styles.selected : ''].join(
								' ',
							)}
							onClick={() => {
								setSelectedVideo(video);
								setCanShowNotLoaded(false);
							}}
							key={video.id}
							title={video.name}
						>
							<Icon name="play circle" style={{ marginRight: 5 }} />
							{video.name}
						</div>
					))}
				</div>
			</div>
			{videoSnippet}
		</div>
	);
};

export default AlbumVideosPage;
