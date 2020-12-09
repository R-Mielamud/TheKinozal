import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'semantic-ui-react';
import emailed from '../../assets/emailed.png';
import styles from './emailed.module.scss';

interface Props {
	children: JSX.Element;
	openCondition?: boolean | (() => boolean);
	onClose?: () => void;
}

const UploadEmailModal: React.FC<Props> = ({ children, openCondition, onClose }) => {
	const { t } = useTranslation();
	const [opened, setOpenedValue] = useState<boolean>(false);

	const canOpen = useMemo(() => {
		return Boolean(typeof openCondition === 'function' ? openCondition() : openCondition);
	}, [openCondition]);

	const setOpened = (value: boolean) => {
		setOpenedValue(value);

		if (!value && onClose) {
			onClose();
		}
	};

	return (
		<Modal
			size="tiny"
			dimmer="blurring"
			open={opened}
			onOpen={() => setOpened(true)}
			onClose={() => setOpened(false)}
			trigger={children}
			openOnTriggerClick={canOpen}
			closeOnDimmerClick
			closeIcon
		>
			<Modal.Header>{t('your_file_accepted')}</Modal.Header>
			<Modal.Content>
				<div className={styles.content}>
					<img className={styles.image} src={emailed} alt="Email" />
					<div className={styles.text}>{t('you_will_get_email')}</div>
				</div>
			</Modal.Content>
			<Modal.Actions>
				<Button primary onClick={() => setOpened(false)} type="button">
					OK
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default UploadEmailModal;
