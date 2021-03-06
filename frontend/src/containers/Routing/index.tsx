import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import Spinner from '../../components/common/Spinner';
import PublicRoute from '../../components/PublicRoute';
import PrivateRoute from '../../components/PrivateRoute';
import HybridRoute from '../../components/HybridRoute';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import { RootState } from '../../typings/rootState';
import { loadProfile } from '../LoginPage/logic/actions';
import AlbumVideos from '../../pages/AlbumVideos';
import ManageAlbums from '../../pages/ManageAlbums';
import ManageVideos from '../../pages/ManageVideos';
import NotFound from '../../pages/NotFound';
import Landing from '../../pages/Landing';

const Routing: React.FC = () => {
	const dispatch = useDispatch();
	const { profileLoaded } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		dispatch(loadProfile());
	}, [dispatch]);

	if (!profileLoaded) {
		return <Spinner />;
	}

	/*
	Route order:
	1. Public
	2. Private
	3. Hybrid
	4. 404
	*/

	return (
		<Switch>
			<PublicRoute component={Login} path="/login" restricted exact />
			<PublicRoute component={Register} path="/register" restricted exact />
			<PrivateRoute component={AlbumVideos} path="/watch/:albumid" exact />
			<PrivateRoute component={ManageVideos} path="/videos/:albumid" exact />
			<HybridRoute component={ManageAlbums} notAuthorizedComponent={Landing} path="/" exact />
			<Route component={NotFound} path="*" />
		</Switch>
	);
};

export default Routing;
