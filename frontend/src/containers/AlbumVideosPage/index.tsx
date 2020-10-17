import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Icon } from 'semantic-ui-react';
import { RootState } from '../../typings/rootState';
import { setSelectedAlbum } from '../AlbumsManagementPage/logic/actions';
import YouTube from 'react-youtube';
import styles from './videos.module.scss';
import { youtubeConfig } from './config/youtube.config';
import VideoModal from '../VideoModal';
import history from '../../helpers/history.helper';
import { useTranslation } from 'react-i18next';
import NoAlbumSelected from '../../components/NoAlbumSelected';
import NoVideoSelected from '../../components/NoVideoSelected';

const AlbumVideosPage: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
	const { selectedId, albums, albumsLoaded } = useSelector((state: RootState) => state.albums);

	const album = useMemo(() => {
		return albums.find((suspectedAlbum) => suspectedAlbum.id === selectedId);
	}, [selectedId, albums]);

	const selectedVideoYoutubeId = useMemo(() => {
		if (selectedVideo && album) {
			const video = album.videos.find((video) => video.id === selectedVideo);
			return video?.youtube_id;
		} else {
			return null;
		}
	}, [album, selectedVideo]);

	useEffect(() => {
		if (album && album.videos.length) {
			setSelectedVideo(album.videos[0].id);
		}
	}, [album]);

	if (!albumsLoaded) {
		return null;
	}

	if (!selectedId) {
		return <NoAlbumSelected />;
	}

	if (!album) {
		dispatch(setSelectedAlbum({ id: null }));
		return null;
	}

	const handleVideoEnd = () => {
		const selectedVideoIndex = album.videos.findIndex((video) => video.id === selectedVideo);

		if (selectedVideoIndex < album.videos.length - 1) {
			const newVideo = album.videos[selectedVideoIndex + 1];
			setSelectedVideo(newVideo.id);
		}
	};

	return (
		<div className={styles.content}>
			<div className={styles.menu}>
				<Header className={styles.albumName} as="h3">
					<Icon name="book" />
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
							className={[styles.menuItem, selectedVideo === video.id ? styles.selected : ''].join(' ')}
							onClick={() => setSelectedVideo(video.id)}
							key={video.id}
						>
							<Icon name="play circle" style={{ marginRight: 5 }} />
							{video.name}
						</div>
					))}
				</div>
			</div>
			{selectedVideoYoutubeId ? (
				<YouTube
					videoId={selectedVideoYoutubeId}
					opts={youtubeConfig}
					className={styles.video}
					containerClassName={styles.videoContainer}
					onEnd={handleVideoEnd}
				/>
			) : (
				<NoVideoSelected albumId={album.id} />
			)}
		</div>
	);
};

export default AlbumVideosPage;
