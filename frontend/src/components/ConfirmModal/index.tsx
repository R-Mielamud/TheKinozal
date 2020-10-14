import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

interface Props {
	header?: string;
	text: string | JSX.Element | JSX.Element[];
	confirmColor?: SemanticCOLORS;
	isOpened: boolean;
	setOpened: (value: boolean) => void;
	onConfirm: () => void;
	onDecline?: () => void;
}

const ConfirmModal: React.FC<Props> = ({
	header = i18next.t('are_you_sure'),
	text,
	confirmColor = 'red',
	isOpened,
	setOpened,
	onConfirm,
	onDecline,
}) => {
	const { t } = useTranslation();

	const confirm = () => {
		onConfirm();
		setOpened(false);
	};

	const decline = () => {
		if (onDecline) {
			onDecline();
		}

		setOpened(false);
	};

	return (
		<Modal dimmer="blurring" open={isOpened} size="small">
			<Modal.Header>{header}</Modal.Header>
			<Modal.Content>{text}</Modal.Content>
			<Modal.Actions>
				<Button onClick={decline}>{t('decline')}</Button>
				<Button color={confirmColor} onClick={confirm}>
					{t('confirm')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default ConfirmModal;
