import React from 'react';
import { FileDrop } from 'react-file-drop';
import { useTranslation } from 'react-i18next';
import { Button, Header } from 'semantic-ui-react';
import { VideoFileExtensions } from '../../constants/FileTypes';
import MaskedFileInput from '../common/MaskedFileInput';
import styles from './videofinput.module.scss';

interface Props {
	selected?: boolean;
	onUpload?: (file: File | null) => void;
}

const VideoFileInput: React.FC<Props> = ({ selected, onUpload }) => {
	const { t } = useTranslation();

	const handleUpload = (fileList: FileList | null) => {
		if (onUpload) {
			const file: File | null = fileList ? Array.from(fileList)[0] : null;

			if (file && VideoFileExtensions.includes(file.type)) {
				onUpload(file);
			}
		}
	};

	return (
		<FileDrop targetClassName={styles.frame} draggingOverTargetClassName={styles.dragOver} onDrop={handleUpload}>
			<div className={styles.middle}>
				<Header as="h3" className={styles.noMargin}>
					{t('dragndrop_file_here')}
				</Header>
				<span className={styles.light}>{t('or')}</span>
				<MaskedFileInput onUpload={handleUpload} accept={VideoFileExtensions}>
					<Button size="tiny" type="button">
						{t('click_here_to_attach_file')}
					</Button>
				</MaskedFileInput>
			</div>
			<div className={styles.light}>{selected ? <b>{t('file_selected')}</b> : t('no_file_selected')}</div>
		</FileDrop>
	);
};

export default VideoFileInput;
