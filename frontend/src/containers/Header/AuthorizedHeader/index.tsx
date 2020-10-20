import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import LanguageSelect from '../../../components/LanguageSelect';
import history from '../../../helpers/history.helper';
import AlbumModal from '../../AlbumModal';
import AlbumsMenu from '../../AlbumsMenu';

interface Props {
	logOut: () => void;
}

const AuthorizedHeader: React.FC<Props> = ({ logOut }) => {
	const { t } = useTranslation();

	return (
		<>
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
							{window.location.pathname !== '/' ? (
								<Dropdown.Item onClick={() => history.push('/')}>{t('my_albums')}</Dropdown.Item>
							) : null}
							<Dropdown.Divider />
							<Dropdown.Item onClick={logOut}>{t('log_out')}</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
			</Menu.Menu>
		</>
	);
};

export default AuthorizedHeader;
