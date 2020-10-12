import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch } from 'react-router';
import Spinner from '../../components/common/Spinner';
import PublicRoute from '../../components/PublicRoute';
import PrivateRoute from '../../components/PrivateRoute';
import history from '../../helpers/history.helper';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import { RootState } from '../../typings/rootState';
import { loadProfile } from '../LoginPage/logic/actions';
import AlbumVideos from '../../pages/AlbumVideos';

const Routing: React.FC = () => {
	const dispatch = useDispatch();
	const { profileLoaded } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		dispatch(loadProfile());
	}, [dispatch]);

	if (!profileLoaded) {
		return <Spinner />;
	}

	return (
		<Router history={history}>
			<Switch>
				<PublicRoute component={Login} path="/login" restricted exact />
				<PublicRoute component={Register} path="/register" restricted exact />
				<PrivateRoute component={AlbumVideos} path="/" exact />
			</Switch>
		</Router>
	);
};

export default Routing;
