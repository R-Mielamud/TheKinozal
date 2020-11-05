import React from 'react';

interface Props {
	attrs?: Record<string, string | number | boolean | null | undefined>;
	children: JSX.Element | JSX.Element[] | string;
	onUpload?: (files: FileList | null) => void;
}

const MaskedFileInput: React.FC<Props> = ({ attrs = {}, children, onUpload }) => {
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
				{...attrs}
				type="file"
				ref={fileInputRef}
				onChange={(event) => handleChange(event.target.files)}
				style={{ display: 'none' }}
			/>
		</>
	);
};

export default MaskedFileInput;
