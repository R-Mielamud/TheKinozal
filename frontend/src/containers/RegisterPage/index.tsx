import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import validator from 'validator';
import PasswordInput from '../../components/common/PasswordInput';
import { RootState } from '../../typings/rootState';
import { register } from '../LoginPage/logic/actions';

const LoginPage: React.FC = () => {
	const [email, setEmailText] = useState<string>('');
	const [emailValid, setEmailValid] = useState<boolean>(true);
	const [password, setPassword] = useState<string>('');
	const [passwordValid, setPasswordValid] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useDispatch();
	const { isAuthorized, requestingRegister } = useSelector((state: RootState) => state.auth);

	const buttonDisabled = !Boolean(email && password && emailValid && passwordValid);

	const submit = () => {
		if (buttonDisabled) return;
		dispatch(register({ email, password }));
	};

	const setEmail = (value: string) => {
		setEmailText(value);
		setEmailValid(true);
	};

	useEffect(() => {
		setLoading(requestingRegister);
	}, [requestingRegister]);

	if (isAuthorized) {
		return <Redirect to="/" />;
	}

	return (
		<Grid className="fill" columns="1" textAlign="center" verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 400 }}>
				<Header as="h1">Sign up to TheKinozal</Header>
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
							showErrorPopup
							setValue={setPassword}
							setValid={setPasswordValid}
						/>
						<Button fluid primary type="submit" disabled={buttonDisabled}>
							Sign up
						</Button>
					</Form>
				</Segment>
				<Message>
					Already have an account? <a href="/login">Log in</a>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export default LoginPage;