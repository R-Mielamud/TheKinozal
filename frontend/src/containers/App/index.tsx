import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux/store';
import history from '../../helpers/history.helper';
import Routing from '../Routing';
import Favicon from 'react-favicon';
import beaverLogo from '../../assets/beaverlogo.png';
import { Router } from 'react-router';

const App: React.FC = () => {
	return (
		<ReduxProvider store={store}>
			<Router history={history}>
				<Favicon url={beaverLogo} />
				<NotificationContainer />
				<Routing />
			</Router>
		</ReduxProvider>
	);
};

export default App;
