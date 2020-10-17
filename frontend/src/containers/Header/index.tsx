import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Dropdown, Header as HeaderUI, Icon, Menu } from 'semantic-ui-react';
import Spinner from '../../components/common/Spinner';
import LanguageSelect from '../../components/LanguageSelect';
import Logo from '../../components/Logo';
import { removeToken } from '../../helpers/token.helper';
import { RootState } from '../../typings/rootState';
import AlbumModal from '../AlbumModal';
import AlbumsMenu from '../AlbumsMenu';
import styles from './header.module.scss';

const Header: React.FC = () => {
	const { t } = useTranslation();
	const { user } = useSelector((state: RootState) => state.auth);
	const { albums } = useSelector((state: RootState) => state.albums);

	const logOut = () => {
		removeToken();
		window.location.replace('/login');
	};

	if (!user) {
		return null;
	}

	if (!albums) {
		return <Spinner />;
	}

	return (
		<div className={[styles.header, 'siteHeader'].join(' ')}>
			<Menu secondary className={styles.menu}>
				<Menu.Item>
					<Logo />
				</Menu.Item>
				<Menu.Item>
					<HeaderUI as="h1">
						<span className={styles.normal}>The</span>
						Kinozal
					</HeaderUI>
				</Menu.Item>
				<Menu.Item>
					<AlbumsMenu />
				</Menu.Item>
				<Menu.Menu position="right">
					<Menu.Item>
						<LanguageSelect />
					</Menu.Item>
					<Menu.Item>
						<Dropdown
							trigger={
								<span>
									<Icon name="setting" />
									{t('settings')}
								</span>
							}
							style={{ marginLeft: 20 }}
						>
							<Dropdown.Menu>
								<AlbumModal>
									<Dropdown.Item>{t('create_album')}</Dropdown.Item>
								</AlbumModal>
								<Dropdown.Divider />
								<Dropdown.Item onClick={logOut}>{t('log_out')}</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		</div>
	);
};

export default Header;
