import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import validator from 'validator';
import PasswordInput from '../../components/common/PasswordInput';
import { RootState } from '../../typings/rootState';
import { login } from './logic/actions';

const LoginPage: React.FC = () => {
	const [email, setEmailText] = useState<string>('');
	const [emailValid, setEmailValid] = useState<boolean>(true);
	const [password, setPassword] = useState<string>('');
	const [passwordValid, setPasswordValid] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useDispatch();
	const { isAuthorized, requestingLogin } = useSelector((state: RootState) => state.auth);

	const buttonDisabled = !Boolean(email && password && emailValid && passwordValid);

	const submit = () => {
		if (buttonDisabled) return;
		dispatch(login({ email, password }));
	};

	const setEmail = (value: string) => {
		setEmailText(value);
		setEmailValid(true);
	};

	useEffect(() => {
		setLoading(requestingLogin);
	}, [requestingLogin]);

	if (isAuthorized) {
		return <Redirect to="/" />;
	}

	return (
		<Grid className="fill" columns="1" textAlign="center" verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 400 }}>
				<Header as="h1">Log in to TheKinozal</Header>
				<Segment>
					<Form onSubmit={submit} loading={loading}>
						<Form.Input
							fluid
							icon="at"
							placeholder="Email"
							value={email}
							onChange={(event, data) => setEmail(data.value)}
							error={!emailValid}
							onBlur={() => setEmailValid(validator.isEmail(email))}
						/>
						<PasswordInput
							value={password}
							valid={passwordValid}
							setValue={setPassword}
							setValid={setPasswordValid}
						/>
						<Button fluid primary type="submit" disabled={buttonDisabled}>
							Log in
						</Button>
					</Form>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default LoginPage;
