import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Header, Icon, Rating, Table } from 'semantic-ui-react';
import Spinner from '../../components/common/Spinner';
import ConfirmModal from '../../components/ConfirmModal';
import NoResults from '../../components/NoResults';
import { RootState } from '../../typings/rootState';
import AlbumModal from '../AlbumModal';
import { deleteAlbum, toggleFavoriteAlbum } from './logic/actions';
import styles from './albumsManage.module.scss';
import history from '../../helpers/history.helper';
import { useTranslation } from 'react-i18next';

const AlbumsManagementPage: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { albums, albumsLoaded } = useSelector((state: RootState) => state.albums);
	const [search, setSearch] = useState<string>('');
	const [isCofirmOpened, setIsConfirmOpened] = useState<boolean>(false);
	const [deletingAlbumId, setDeletingAlbumId] = useState<number | null>(null);
	const [createOpened, setCreateOpened] = useState<boolean>(false);

	const displayAlbums = useMemo(() => {
		return albums.filter((album) => album.name.toLowerCase().includes(search.toLowerCase()));
	}, [search, albums]);

	if (!albumsLoaded) {
		return <Spinner />;
	}

	const dispatchDeleteAlbum = () => {
		if (deletingAlbumId) {
			dispatch(deleteAlbum({ id: deletingAlbumId }));
			setDeletingAlbumId(null);
		}
	};

	const openConfirm = (albumId: number) => {
		setDeletingAlbumId(albumId);
		setIsConfirmOpened(true);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.head}>
				<div className={styles.searchBlock}>
					<Header as="h2" className={styles.header}>
						{t('my_albums')}
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
				<AlbumModal opened={createOpened} onClose={() => setCreateOpened(false)}>
					<Button primary>{t('create_album')}</Button>
				</AlbumModal>
			</div>
			{displayAlbums.length ? (
				<Table basic className={styles.table}>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell width="8">{t('album_name')}</Table.HeaderCell>
							<Table.HeaderCell width="4">{t('videos_count')}</Table.HeaderCell>
							<Table.HeaderCell width="3">{t('actions')}</Table.HeaderCell>
							<Table.HeaderCell width="3">{t('favorite')}</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{displayAlbums.map((album) => (
							<Table.Row key={album.id}>
								<Table.Cell width="8">{album.name}</Table.Cell>
								<Table.Cell width="4">{album.videos.length}</Table.Cell>
								<Table.Cell width="3">
									<Icon
										name="play circle"
										title={t('manage_videos')}
										link
										className={styles.icon}
										onClick={() => history.push(`/videos/${album.id}`)}
									/>
									<AlbumModal update={album}>
										<Icon name="edit" title={t('update')} link className={styles.icon} />
									</AlbumModal>
									<Icon
										name="trash"
										title={t('delete')}
										link
										onClick={() => openConfirm(album.id)}
										className={[styles.icon, styles.danger].join(' ')}
									/>
								</Table.Cell>
								<Table.Cell width="3">
									<Rating
										icon="star"
										defaultRating={album.favorite ? 1 : 0}
										onRate={(event, { rating }) =>
											dispatch(toggleFavoriteAlbum({ id: album.id, favorite: Boolean(rating) }))
										}
									/>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			) : (
				<NoResults
					creation={{
						text: t('create_album'),
						icon: 'plus circle',
						callback: () => setCreateOpened(true),
					}}
				/>
			)}
			<ConfirmModal
				text={t('are_you_sure_about_deleting_album')}
				isOpened={isCofirmOpened}
				setOpened={setIsConfirmOpened}
				onConfirm={dispatchDeleteAlbum}
			/>
		</div>
	);
};

export default AlbumsManagementPage;
