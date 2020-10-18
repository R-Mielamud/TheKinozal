import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import noResultsImage from '../../assets/beaver.png';
import styles from './noresults.module.scss';

export interface CreationConfig {
	text: string;
	icon?: SemanticICONS;
	callback: () => void;
}

interface Props {
	creation?: CreationConfig;
}

const NoResults: React.FC<Props> = ({ creation }) => {
	const { t } = useTranslation();

	const renderCreation = creation ? (
		<div>
			<Button primary onClick={creation.callback}>
				{creation.icon ? <Icon name={creation.icon} /> : null}
				{creation.text}
			</Button>
		</div>
	) : null;

	return (
		<div className={styles.flex}>
			<img src={noResultsImage} alt={t('no_results')} />
			<h3>{t('sorry_no_results')}</h3>
			{renderCreation}
		</div>
	);
};

export default NoResults;
