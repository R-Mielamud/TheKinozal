import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Icon } from 'semantic-ui-react';
import { RootState } from '../../typings/rootState';
import { setSelectedAlbum } from '../AlbumsMenu/logic/actions';
import YouTube from 'react-youtube';
import styles from './videos.module.scss';
import { youtubeConfig } from './config/youtube.config';

const AlbumVideosPage: React.FC = () => {
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
		return null; //
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
				<Header className={styles.albumName}>
					<Icon name="book" />
					{album.name}
				</Header>
				<div className={styles.videoList}>
					<div className={styles.menuItem}>
						<Icon name="plus circle" style={{ marginRight: 5 }} />
						Create video
					</div>
					<div className={styles.menuItem}>
						<Icon name="edit" style={{ marginRight: 5 }} />
						Manage videos
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
			) : null}
		</div>
	);
};

export default AlbumVideosPage;
