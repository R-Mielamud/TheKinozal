import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Icon } from 'semantic-ui-react';
import { extractYoutubeId, validateYoutubeLink } from '../../helpers/YTlink.helper';
import { RootState } from '../../typings/rootState';
import { updateVideo, createVideo } from '../VideosManagementPage/logic/actions';

interface Props {
	children: JSX.Element;
	albumId: number;
	update?: WebApi.Entity.Video;
	opened?: boolean;
	onClose?: () => void;
}

const VideoModal: React.FC<Props> = ({ update, albumId, children, opened, onClose }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { creatingVideo, updatingVideo } = useSelector((state: RootState) => state.videos);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [name, setNameText] = useState<string>(update ? update.name : '');
	const [youtubeLink, setYoutubeLinkText] = useState<string>(
		update ? `https://www.youtube.com/watch?v=${update.youtube_id}` : '',
	);
	const [youtubeLinkValid, setYoutubeLinkValid] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	const setName = (value: string) => {
		if (value.length <= 30) {
			setNameText(value);
		}
	};

	const setYoutubeLink = (value: string) => {
		setYoutubeLinkText(value);
		setYoutubeLinkValid(true);
	};

	const submit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!name || !youtubeLink || !youtubeLinkValid) return;

		const youtubeId = extractYoutubeId(youtubeLink);
		if (!youtubeId) return;

		if (update) {
			dispatch(updateVideo({ id: update.id, data: { name, youtube_id: youtubeId } }));
		} else {
			dispatch(createVideo({ data: { id: 0, name, youtube_id: youtubeId, album: albumId } }));
		}

		setLoading(true);
	};

	const resetState = useCallback(() => {
		setYoutubeLink(update ? `https://www.youtube.com/watch?v=${update.youtube_id}` : '');
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
		const modified = update ? !updatingVideo : !creatingVideo;

		if (modified && loading) {
			resetState();
		}
	}, [updatingVideo, creatingVideo, loading, resetState, update]);

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
				{update ? t('update') : t('create')} {t('video')}
			</Modal.Header>
			<Modal.Content scrolling>
				<Form as="div" loading={loading}>
					<Form.Field>
						<label className="required">{t('name')}</label>
						<Form.Input
							fluid
							placeholder={t('name_your_video')}
							value={name}
							onChange={(event, data) => setName(data.value)}
						/>
						<div className="meta">{t('name_must_be_less_than_30')}</div>
					</Form.Field>
					<Form.Field>
						<label className="required">{t('youtube_link')}</label>
						<Form.Input
							fluid
							placeholder={t('provide_youtube_link')}
							value={youtubeLink}
							onChange={(event, data) => setYoutubeLink(data.value)}
							error={!youtubeLinkValid}
							onBlur={() => setYoutubeLinkValid(validateYoutubeLink(youtubeLink))}
						/>
						<div className="meta">
							{t('link_must_match_pattern')} {'https://www.youtube.com/watch?v=<video id>'}
						</div>
						<div className="meta">{t('just_copy_link')}</div>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={resetState} disabled={loading}>
					{t('cancel')}
				</Button>
				<Button primary icon labelPosition="right" disabled={loading} type="submit">
					<Icon name="check" />
					{update ? t('update') : t('create')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default VideoModal;
