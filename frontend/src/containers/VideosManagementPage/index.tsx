import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Form, Button, Table, Icon, Breadcrumb } from 'semantic-ui-react';
import ConfirmModal from '../../components/ConfirmModal';
import NoResults from '../../components/NoResults';
import { RootState } from '../../typings/rootState';
import VideoModal from '../VideoModal';
import { deleteVideo } from './logic/actions';
import { NavLink } from 'react-router-dom';
import styles from './videosManage.module.scss';

interface Props {
	albumId: number;
}

const VideosManagement: React.FC<Props> = ({ albumId }) => {
	const { t } = useTranslation();
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
			<Breadcrumb>
				<Breadcrumb.Section as={NavLink} to="/">
					{t('all_albums')}
				</Breadcrumb.Section>
				<Breadcrumb.Divider />
				<Breadcrumb.Section active>{t('manage_videos')}</Breadcrumb.Section>
			</Breadcrumb>
			<Header as="h2" dividing style={{ marginBottom: 20 }}>
				{t('album')} "{album.name}"
			</Header>
			<div className={styles.head}>
				<div className={styles.searchBlock}>
					<Header as="h2" className={styles.header}>
						{t('manage_videos')}
					</Header>
					<Form>
						<Form.Input
							placeholder={t('search_3dots')}
							icon="search"
							value={search}
							onChange={(event, data) => setSearch(data.value)}
						/>
					</Form>
				</div>
				<VideoModal albumId={albumId} opened={createOpened} onClose={() => setCreateOpened(false)}>
					<Button primary>{t('create_video')}</Button>
				</VideoModal>
			</div>
			{displayVideos.length ? (
				<Table basic className={styles.table}>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell width="7">{t('video_name')}</Table.HeaderCell>
							<Table.HeaderCell width="5">{t('yt_identifier')}</Table.HeaderCell>
							<Table.HeaderCell width="3">{t('actions')}</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{displayVideos.map((video) => (
							<Table.Row key={video.id}>
								<Table.Cell width="7">{video.name}</Table.Cell>
								<Table.Cell width="5">
									<a
										href={`https://www.youtube.com/watch?=${video.youtube_id}`}
										title={t('click_to_watch_on_yt')}
									>
										{video.youtube_id}
									</a>
								</Table.Cell>
								<Table.Cell width="3">
									<VideoModal update={video} albumId={albumId}>
										<Icon name="edit" title={t('update')} link className={styles.icon} />
									</VideoModal>
									<Icon
										name="trash"
										link
										title={t('delete')}
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
						text: t('create_video'),
						icon: 'plus circle',
						callback: () => setCreateOpened(true),
					}}
				/>
			)}
			<ConfirmModal
				text={t('are_you_sure_about_deleting_video')}
				isOpened={isCofirmOpened}
				setOpened={setIsConfirmOpened}
				onConfirm={dispatchDeleteVideo}
			/>
		</div>
	);
};

export default VideosManagement;
