import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Form, Button, Table } from 'semantic-ui-react';
import NoResults from '../../components/NoResults';
import { RootState } from '../../typings/rootState';
import styles from './videosManage.module.scss';

interface Props {
	albumId: number;
}

const VideosManagement: React.FC<Props> = ({ albumId }) => {
	const [search, setSearch] = useState<string>('');
	const { albums } = useSelector((state: RootState) => state.albums);

	const album = useMemo(() => {
		return albums.find((suspectedAlbum) => suspectedAlbum.id === albumId);
	}, [albums, albumId]);

	const displayVideos = useMemo(() => {
		if (album) {
			return album.videos.filter((video) => video.name.toLowerCase().includes(search.toLowerCase()));
		}
	}, [album]);

	if (!album || !displayVideos) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.head}>
				<div className={styles.searchBlock}>
					<Header as="h2" className={styles.header}>
						Manage videos of album {album.name}
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
				<Button>Create video</Button>
			</div>
			{displayVideos.length ? (
				<Table>
					<Table.Header></Table.Header>
					<Table.Body></Table.Body>
				</Table>
			) : (
				<NoResults
					creation={{
						text: 'Create video',
						icon: 'plus circle',
						callback: () => {},
					}}
				/>
			)}
		</div>
	);
};

export default VideosManagement;
