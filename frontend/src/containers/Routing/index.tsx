import React from 'react';
import { Router, Switch } from 'react-router';
import PublicRoute from '../../components/PublicRoute';
import history from '../../helpers/history.helper';
import Login from '../../pages/Login';

const Routing: React.FC = () => {
	return (
		<Router history={history}>
			<Switch>
				<PublicRoute component={Login} path="/login" exact />
			</Switch>
		</Router>
	);
};

export default Routing;
