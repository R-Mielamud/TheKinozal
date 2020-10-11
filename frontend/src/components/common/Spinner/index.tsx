import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Spinner: React.FC = () => {
	return (
		<Dimmer active inverted>
			<Loader size="massive" />
		</Dimmer>
	);
};

export default Spinner;
