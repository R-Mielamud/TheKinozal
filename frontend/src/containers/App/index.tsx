import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux/store';
import Routing from '../Routing';

const App: React.FC = () => {
	return (
		<ReduxProvider store={store}>
			<NotificationContainer />
			<Routing />
		</ReduxProvider>
	);
};

export default App;
