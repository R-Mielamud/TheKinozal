import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import flyawayBee from '../../assets/flyawaybee.png';
import styles from './notfound.module.scss';

const NotFound: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<img src={flyawayBee} alt="Bee" />
			<h2>{t('page_not_found')}</h2>
			<NavLink to="/">
				<Icon name="arrow circle left" />
				{t('back_to_home')}
			</NavLink>
		</div>
	);
};

export default NotFound;
