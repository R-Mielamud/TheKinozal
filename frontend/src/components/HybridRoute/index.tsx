import React from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps } from 'react-router';
import { RootState } from '../../typings/rootState';

interface Props {
	component: React.ComponentClass | React.FC | React.FunctionComponent;
	notAuthorizedComponent: React.ComponentClass | React.FC | React.FunctionComponent;
}

const HybridRoute: React.FC<RouteProps & Props> = ({ component, notAuthorizedComponent, ...rest }) => {
	const { isAuthorized } = useSelector((state: RootState) => state.auth);
	const Component = isAuthorized ? component : notAuthorizedComponent;

	return <Route component={Component} {...rest} />;
};

export default HybridRoute;
