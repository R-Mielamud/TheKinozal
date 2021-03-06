import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { RootState } from '../../typings/rootState';

interface Props {
	component: React.ComponentClass | React.FC | React.FunctionComponent;
}

const PrivateRoute: React.FC<Props & RouteProps> = ({ component, ...rest }) => {
	const { isAuthorized } = useSelector((state: RootState) => state.auth);
	const Component = isAuthorized ? component : () => <Redirect to="/" />;

	return <Route component={Component} {...rest} />;
};

export default PrivateRoute;
