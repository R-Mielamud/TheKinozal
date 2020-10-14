import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux/store';
import Routing from '../Routing';
import Favicon from 'react-favicon';
import beaverLogo from '../../assets/beaverlogo.png';

const App: React.FC = () => {
	return (
		<ReduxProvider store={store}>
			<Favicon url={beaverLogo} />
			<NotificationContainer />
			<Routing />
		</ReduxProvider>
	);
};

export default App;
