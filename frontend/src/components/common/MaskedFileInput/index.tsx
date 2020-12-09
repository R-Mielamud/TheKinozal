import React from 'react';

interface Props {
	accept?: string[];
	children: JSX.Element | JSX.Element[] | string;
	onUpload?: (files: FileList | null) => void;
}

const MaskedFileInput: React.FC<Props> = ({ accept = [], children, onUpload }) => {
	const fileInputRef = React.createRef<HTMLInputElement>();

	const openFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleChange = (files: FileList | null) => {
		if (onUpload) {
			onUpload(files);
		}
	};

	return (
		<>
			<div onClick={openFileInput}>{children}</div>
			<input
				{...(accept ? { accept: accept.join(',') } : {})}
				type="file"
				ref={fileInputRef}
				onChange={(event) => handleChange(event.target.files)}
				style={{ display: 'none' }}
			/>
		</>
	);
};

export default MaskedFileInput;
