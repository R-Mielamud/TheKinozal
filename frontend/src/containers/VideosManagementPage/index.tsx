import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Form, Button, Table, Icon } from 'semantic-ui-react';
import ConfirmModal from '../../components/ConfirmModal';
import NoResults from '../../components/NoResults';
import { RootState } from '../../typings/rootState';
import VideoModal from '../VideoModal';
import { deleteVideo } from './logic/actions';
import styles from './videosManage.module.scss';

interface Props {
	albumId: number;
}

const VideosManagement: React.FC<Props> = ({ albumId }) => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState<string>('');
	const { albums } = useSelector((state: RootState) => state.albums);
	const [isCofirmOpened, setIsConfirmOpened] = useState<boolean>(false);
	const [deletingVideoId, setDeletingVideoId] = useState<number | null>(null);
	const [createOpened, setCreateOpened] = useState<boolean>(false);

	const album = albums.find((suspectedAlbum) => suspectedAlbum.id === albumId);
	const displayVideos = album?.videos.filter((video) => video.name.toLowerCase().includes(search.toLowerCase()));

	const openConfirm = (id: number) => {
		setDeletingVideoId(id);
		setIsConfirmOpened(true);
	};

	const dispatchDeleteVideo = () => {
		if (deletingVideoId) {
			dispatch(deleteVideo({ id: deletingVideoId, albumId: albumId }));
		}
	};

	if (!album || !displayVideos) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.head}>
				<div className={styles.searchBlock}>
					<Header as="h2" className={styles.header}>
						Manage videos
					</Header>
					<Form>
						<Form.Input
							placeholder="Search..."
							icon="search"
							value={search}
							onChange={(event, data) => setSearch(data.value)}
						/>
					</Form>
				</div>
				<VideoModal albumId={albumId} opened={createOpened} onClose={() => setCreateOpened(false)}>
					<Button primary>Create video</Button>
				</VideoModal>
			</div>
			{displayVideos.length ? (
				<Table basic className={styles.table}>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell width="7">Name</Table.HeaderCell>
							<Table.HeaderCell width="4">YouTube identifier</Table.HeaderCell>
							<Table.HeaderCell width="3">Actions</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{displayVideos.map((video) => (
							<Table.Row key={video.id}>
								<Table.Cell width="7">{video.name}</Table.Cell>
								<Table.Cell width="4">
									<a
										href={`https://www.youtube.com/watch?=${video.youtube_id}`}
										title="Click to watch this video on YouTube"
									>
										{video.youtube_id}
									</a>
								</Table.Cell>
								<Table.Cell width="3">
									<VideoModal update={video} albumId={albumId}>
										<Icon name="edit" title="Edit" link className={styles.icon} />
									</VideoModal>
									<Icon
										name="trash"
										link
										title="Delete"
										className={[styles.icon, styles.danger].join(' ')}
										onClick={() => openConfirm(video.id)}
									/>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			) : (
				<NoResults
					creation={{
						text: 'Create video',
						icon: 'plus circle',
						callback: () => setCreateOpened(true),
					}}
				/>
			)}
			<ConfirmModal
				text="Are you sure about deleting this video?"
				isOpened={isCofirmOpened}
				setOpened={setIsConfirmOpened}
				onConfirm={dispatchDeleteVideo}
			/>
		</div>
	);
};

export default VideosManagement;
