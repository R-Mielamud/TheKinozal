import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import noResultsImage from '../../assets/noresults.png';
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
			<img src={noResultsImage} alt="No results" />
			<h3>Sorry, no results</h3>
			{renderCreation}
		</div>
	);
};

export default NoResults;
