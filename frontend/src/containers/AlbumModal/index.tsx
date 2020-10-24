import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import { RootState } from '../../typings/rootState';
import AlbumImportModal from '../AlbumImportModal';
import { createAlbum, updateAlbum } from '../AlbumsManagementPage/logic/actions';
import styles from './albummodal.module.scss';

interface Props {
	update?: WebApi.Entity.Album;
	children: JSX.Element;
	opened?: boolean;
	onClose?: () => void;
}

const AlbumModal: React.FC<Props> = ({ update, children, opened, onClose }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { creatingAlbum, updatingAlbum, albums } = useSelector((state: RootState) => state.albums);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [copyFrom, setCopyFrom] = useState<number | undefined>(undefined);
	const [name, setNameText] = useState<string>(update ? update.name : '');
	const [loading, setLoading] = useState<boolean>(false);
	const buttonDisabled = !name;

	const albumOptions = useMemo(
		() =>
			albums.map((album) => ({
				text: album.name,
				key: album.id,
				value: album.id,
			})),
		[albums],
	);

	const setName = (value: string) => {
		if (value.length <= 30) {
			setNameText(value);
		}
	};

	const submit = (event: React.FormEvent) => {
		event.preventDefault();
		if (buttonDisabled) return;

		if (update) {
			dispatch(updateAlbum({ id: update.id, data: { name } }));
		} else {
			dispatch(createAlbum({ data: { id: 0, name, videos: [], favorite: false }, copyFrom }));
		}

		setLoading(true);
	};

	const resetState = useCallback(() => {
		setName(update ? update.name : '');
		setLoading(false);
		setIsOpened(false);

		if (onClose) {
			onClose();
		}
	}, [update, onClose]);

	useEffect(() => {
		if (opened && opened !== isOpened) {
			setIsOpened(opened);
		}
	}, [opened, isOpened]);

	useEffect(() => {
		const modified = update ? !updatingAlbum : !creatingAlbum;

		if (modified && loading) {
			resetState();
		}
	}, [creatingAlbum, updatingAlbum, loading, resetState, update]);

	return (
		<Modal
			as="form"
			size="tiny"
			dimmer="blurring"
			trigger={children}
			openOnTriggerClick
			closeIcon
			closeOnEscape
			closeOnDimmerClick
			open={isOpened}
			onSubmit={submit}
			onOpen={() => setIsOpened(true)}
			onClose={() => setIsOpened(false)}
		>
			<Modal.Header>
				{update ? t('update') : t('create')} {t('album_lower')}
			</Modal.Header>
			<Modal.Content style={{ paddingTop: 10 }}>
				<AlbumImportModal onClose={resetState}>
					<div className={styles.importLink}>{t('import_album_from_link')}</div>
				</AlbumImportModal>
				<Form as="div" loading={loading}>
					<Form.Field>
						<label className="required">{t('name')}</label>
						<Form.Input
							fluid
							placeholder={t('name_your_album')}
							value={name}
							onChange={(event, data) => setName(data.value)}
						/>
						<div className="meta">{t('name_must_be_less_than_30')}</div>
					</Form.Field>
					{albums.length && !update ? (
						<Form.Field>
							<label>{t('copy_videos_from')}</label>
							<Form.Select
								options={albumOptions}
								placeholder={t('select_album_to_copy')}
								onChange={(event, data) => setCopyFrom(data.value as number | undefined)}
								clearable
								search
							/>
						</Form.Field>
					) : null}
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={resetState} disabled={loading} type="button">
					{t('cancel')}
				</Button>
				<Button primary icon labelPosition="right" disabled={loading || buttonDisabled} type="submit">
					<Icon name="check" />
					{update ? t('update') : t('create')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default AlbumModal;
