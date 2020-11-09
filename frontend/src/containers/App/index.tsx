import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux/store';
import history from '../../helpers/history.helper';
import Routing from '../Routing';
import Favicon from 'react-favicon';
import beaverLogo from '../../assets/beaverlogo.png';
import { Router } from 'react-router';
import { Form, Modal } from 'semantic-ui-react';
import { uploadVideo } from '../../config/media.config';

const App: React.FC = () => {
	return (
		<ReduxProvider store={store}>
			<Router history={history}>
				<Favicon url={beaverLogo} />
				<NotificationContainer />
				<Modal open>
					<Form>
						<input
							type="file"
							onChange={(event) => event.target.files && uploadVideo(event.target.files[0])}
						/>
					</Form>
				</Modal>
				<Routing />
			</Router>
		</ReduxProvider>
	);
};

export default App;
