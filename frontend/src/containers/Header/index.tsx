import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Header as HeaderUI, Menu } from 'semantic-ui-react';
import Spinner from '../../components/common/Spinner';
import Logo from '../../components/Logo';
import history from '../../helpers/history.helper';
import { removeToken } from '../../helpers/token.helper';
import { RootState } from '../../typings/rootState';
import AuthorizedHeader from './AuthorizedHeader';
import styles from './header.module.scss';
import NotAuthorizedHeader from './NotAuthorizedHeader';

const Header: React.FC = () => {
	const { t } = useTranslation();
	const { user } = useSelector((state: RootState) => state.auth);
	const { albums } = useSelector((state: RootState) => state.albums);

	const logOut = () => {
		removeToken();
		window.location.replace('/');
	};

	if (!albums) {
		return <Spinner />;
	}

	return (
		<div className={[styles.header, 'siteHeader'].join(' ')}>
			<Menu secondary className={styles.menu}>
				<Menu.Menu onClick={() => history.push('/')} title={t('back_to_home')} className={styles.pointer}>
					<Menu.Item>
						<Logo />
					</Menu.Item>
					<Menu.Item>
						<HeaderUI as="h1">
							<span className={styles.normal}>The</span>
							<span className={styles.coloredText}>Kinozal</span>
						</HeaderUI>
					</Menu.Item>
				</Menu.Menu>
				{user ? <AuthorizedHeader logOut={logOut} /> : <NotAuthorizedHeader />}
			</Menu>
		</div>
	);
};

export default Header;
