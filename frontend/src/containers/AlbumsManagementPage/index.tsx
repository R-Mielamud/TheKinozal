import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Header, Icon, Table } from 'semantic-ui-react';
import Spinner from '../../components/common/Spinner';
import ConfirmModal from '../../components/ConfirmModal';
import NoResults from '../../components/NoResults';
import { RootState } from '../../typings/rootState';
import AlbumModal from '../AlbumModal';
import { deleteAlbum } from './logic/actions';
import styles from './albumsManage.module.scss';
import history from '../../helpers/history.helper';

const AlbumsManagementPage: React.FC = () => {
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
						Manage albums
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
				<AlbumModal opened={createOpened} onClose={() => setCreateOpened(false)}>
					<Button primary>Create album</Button>
				</AlbumModal>
			</div>
			{displayAlbums.length ? (
				<Table basic className={styles.table}>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell width="7">Name</Table.HeaderCell>
							<Table.HeaderCell width="3">Videos count</Table.HeaderCell>
							<Table.HeaderCell width="4">Actions</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{displayAlbums.map((album) => (
							<Table.Row key={album.id}>
								<Table.Cell width="7">{album.name}</Table.Cell>
								<Table.Cell width="3">{album.videos.length}</Table.Cell>
								<Table.Cell width="4">
									<Icon
										name="play circle"
										title="Manage videos"
										link
										className={styles.icon}
										onClick={() => history.push(`/videos/${album.id}`)}
									/>
									<AlbumModal update={album}>
										<Icon name="edit" title="Edit" link className={styles.icon} />
									</AlbumModal>
									<Icon
										name="trash"
										title="Delete"
										link
										onClick={() => openConfirm(album.id)}
										className={[styles.icon, styles.danger].join(' ')}
									/>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			) : (
				<NoResults
					creation={{
						text: 'Create album',
						icon: 'plus circle',
						callback: () => setCreateOpened(true),
					}}
				/>
			)}
			<ConfirmModal
				text="Are you sure about deleting this album?"
				isOpened={isCofirmOpened}
				setOpened={setIsConfirmOpened}
				onConfirm={dispatchDeleteAlbum}
			/>
		</div>
	);
};

export default AlbumsManagementPage;
