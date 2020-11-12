import React from 'react';
import { FileDrop } from 'react-file-drop';
import { Button, Header } from 'semantic-ui-react';
import MaskedFileInput from '../common/MaskedFileInput';
import styles from './videofinput.module.scss';

interface Props {
	selected?: boolean;
	onUpload?: (file: File | null) => void;
}

const VideoFileInput: React.FC<Props> = ({ selected, onUpload }) => {
	const handleUpload = (fileList: FileList | null) => {
		if (onUpload) {
			onUpload(fileList ? Array.from(fileList)[0] : null);
		}
	};

	return (
		<FileDrop targetClassName={styles.frame} draggingOverTargetClassName={styles.dragOver} onDrop={handleUpload}>
			<div className={styles.middle}>
				<Header as="h3" className={styles.noMargin}>
					Drag'n'drop file here
				</Header>
				<span className={styles.light}>or</span>
				<MaskedFileInput onUpload={handleUpload}>
					<Button size="tiny">Click here to attach a file</Button>
				</MaskedFileInput>
			</div>
			<div className={styles.light}>{selected ? 'File selected' : 'No file selected'}</div>
		</FileDrop>
	);
};

export default VideoFileInput;
