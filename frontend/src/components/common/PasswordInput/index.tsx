import React, { useState } from 'react';
import { Form, Icon, Popup } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

interface Props {
	value: string;
	valid: boolean;
	showErrorPopup?: boolean;
	setValue: (value: string) => void;
	setValid: (valid: boolean) => void;
}

const PasswordInput: React.FC<Props> = ({ value, valid, showErrorPopup, setValue, setValid }) => {
	const [showed, setShowed] = useState<boolean>(false);
	const iconName: SemanticICONS = showed ? 'eye slash' : 'eye';
	const inputType = showed ? 'text' : 'password';

	const setPassword = (value: string) => {
		setValid(true);
		setValue(value);
	};

	return (
		<Popup
			on={[]}
			open={!valid && showErrorPopup}
			content="Password must be at least 4 characters long"
			trigger={
				<Form.Input
					fluid
					type={inputType}
					placeholder="Password"
					icon={<Icon name={iconName} link onClick={() => setShowed(!showed)} />}
					value={value}
					onChange={(event, data) => setPassword(data.value)}
					error={!valid && showErrorPopup}
					onBlur={() => setValid(Boolean(value) && value.length >= 4)}
				/>
			}
		/>
	);
};

export default PasswordInput;
