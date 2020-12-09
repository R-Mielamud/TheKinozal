import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Icon } from 'semantic-ui-react';
import UploadEmailModal from '../../components/UploadEmailModal';
import VideoFileInput from '../../components/VideoFileInput';
import { RootState } from '../../typings/rootState';
import { updateVideoFile, createVideoFile } from '../VideosManagementPage/logic/actions';

interface Props {
	children: JSX.Element;
	albumId: number;
	update?: WebApi.Entity.Video;
	opened?: boolean;
	onClose?: () => void;
}

const VideoUploadModal: React.FC<Props> = ({ update, albumId, children, opened, onClose }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { updatingVideo } = useSelector((state: RootState) => state.videos);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [name, setNameText] = useState<string>(update ? update.name : '');
	const [videoFile, setVideoFile] = useState<File | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const buttonDisabled = !name || (update ? false : !videoFile);

	const setName = (value: string) => {
		if (value.length <= 30) {
			setNameText(value);
		}
	};

	const submit = (event: React.FormEvent) => {
		event.preventDefault();
		if (buttonDisabled) return;

		const file = videoFile ?? undefined;

		if (update) {
			dispatch(updateVideoFile({ id: update.id, data: { name }, file }));
		} else {
			if (!file) return;
			dispatch(createVideoFile({ data: { id: 0, name, album: albumId }, file }));
		}

		setLoading(true);
	};

	const resetState = useCallback(() => {
		setVideoFile(null);
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
		if (update && !updatingVideo && loading && !videoFile) {
			resetState();
		}
	}, [videoFile, updatingVideo, loading, resetState, update]);

	return (
		<Modal
			as="form"
			size="small"
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
				{update ? t('update') : t('create')} {t('video_lower')}
			</Modal.Header>
			<Modal.Content>
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
						<label className="required">{t('file')}</label>
						<VideoFileInput
							selected={Boolean(update?.custom_link || videoFile?.name)}
							onUpload={setVideoFile}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={resetState} disabled={loading} type="button">
					{t('cancel')}
				</Button>
				<UploadEmailModal onClose={resetState} openCondition={Boolean(videoFile)}>
					<Button primary icon labelPosition="right" disabled={loading || buttonDisabled} type="submit">
						<Icon name="check" />
						{update ? t('update') : t('create')}
					</Button>
				</UploadEmailModal>
			</Modal.Actions>
		</Modal>
	);
};

export default VideoUploadModal;
