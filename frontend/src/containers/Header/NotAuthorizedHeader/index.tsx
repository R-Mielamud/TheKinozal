import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, Menu } from 'semantic-ui-react';
import LanguageSelect from '../../../components/LanguageSelect';
import history from '../../../helpers/history.helper';

const NotAuthorizedHeader: React.FC = () => {
	const { t } = useTranslation();

	return (
		<Menu.Menu position="right">
			<Menu.Item>
				<LanguageSelect />
			</Menu.Item>
			<Menu.Item>
				<div className="hoverableItem" onClick={() => history.push('/login')}>
					{t('log_in')}
					<Icon name="sign in" style={{ marginLeft: 5 }} />
				</div>
			</Menu.Item>
			<Menu.Item>
				<div className="hoverableItem" onClick={() => history.push('/register')}>
					{t('sign_up')}
					<Icon name="user" style={{ marginLeft: 5 }} />
				</div>
			</Menu.Item>
		</Menu.Menu>
	);
};

export default NotAuthorizedHeader;
