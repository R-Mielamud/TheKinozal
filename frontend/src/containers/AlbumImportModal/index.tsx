import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import { extractPlaylistId, validatePlaylistLink } from '../../helpers/YTlink.helper';
import { RootState } from '../../typings/rootState';
import { importAlbum } from '../AlbumsManagementPage/logic/actions';

interface Props {
	children: JSX.Element;
	opened?: boolean;
	onClose?: () => void;
}

const AlbumImportModal: React.FC<Props> = ({ children, opened, onClose }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { creatingAlbum, updatingAlbum } = useSelector((state: RootState) => state.albums);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [name, setNameText] = useState<string>('');
	const [playlistLink, setPlaylistLinkText] = useState<string>('');
	const [playlistLinkValid, setPlaylistLinkValid] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const buttonDisabled = !name || !playlistLink || !playlistLinkValid;

	const setName = (value: string) => {
		if (value.length <= 30) {
			setNameText(value);
		}
	};

	const setPlaylistLink = (value: string) => {
		setPlaylistLinkText(value);
		setPlaylistLinkValid(true);
	};

	const submit = (event: React.FormEvent) => {
		event.preventDefault();
		if (buttonDisabled) return;

		const playlistId = extractPlaylistId(playlistLink);
		if (!playlistId) return;

		dispatch(importAlbum({ data: { name, videos: [], id: 0, favorite: false }, playlistId }));
		setLoading(true);
	};

	const resetState = useCallback(() => {
		setName('');
		setLoading(false);
		setIsOpened(false);

		if (onClose) {
			onClose();
		}
	}, [onClose]);

	useEffect(() => {
		if (opened && opened !== isOpened) {
			setIsOpened(opened);
		}
	}, [opened, isOpened]);

	useEffect(() => {
		if (creatingAlbum && loading) {
			resetState();
		}
	}, [creatingAlbum, updatingAlbum, loading, resetState]);

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
			<Modal.Header>{t('import_album')}</Modal.Header>
			<Modal.Content scrolling style={{ paddingTop: 10 }}>
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
						<label className="required">{t('playlist_link')}</label>
						<Form.Input
							fluid
							placeholder={t('enter_playlist_link')}
							value={playlistLink}
							onChange={(event, data) => setPlaylistLink(data.value)}
							error={!playlistLinkValid}
							onBlur={() => setPlaylistLinkValid(validatePlaylistLink(playlistLink))}
						/>
						<div className="meta">
							{t('link_must_match_pattern')} {'https://www.youtube.com/playlist?list=<list id>'}
						</div>
						<div className="meta">{t('just_copy_link')}</div>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={resetState} disabled={loading} type="button">
					{t('cancel')}
				</Button>
				<Button primary icon labelPosition="right" disabled={loading || buttonDisabled} type="submit">
					<Icon name="check" />
					{t('import')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default AlbumImportModal;
