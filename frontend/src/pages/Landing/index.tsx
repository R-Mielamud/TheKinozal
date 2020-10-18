import React from 'react';
import DefaultPageWrapper from '../../containers/DefaultPageWrapper';
import LandingPage from '../../containers/LandingPage';

const Landing: React.FC = () => {
	return (
		<DefaultPageWrapper noStartup>
			<LandingPage />
		</DefaultPageWrapper>
	);
};

export default Landing;
