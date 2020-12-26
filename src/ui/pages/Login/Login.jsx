import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
	baseURL: `http://localhost:7000/`,
});

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		// alert(email + ' ' + password);
		if (!form.checkValidity()) {
			event.stopPropagation();
		} else {
			api.post(
				'/user/find',
				{
					email: email,
					password: password,
				},
				{
					withCredentials: true,
					headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
				}
			)
				.then(function (response) {
					console.log(response);
					// alert(response.data.user._id);
					if (response.data.user._id !== 0) {
						alert('You are Valid user');
						props.history.push('/organization');
					} else {
						alert('You are not Valid User');
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	};

	return (
		<div>
			<Container>
				<Form className="login-form" onSubmit={(event) => onSubmit(event)}>
					<h1 className="text-center">Login Page</h1>
					<FormGroup>
						<Label>Email:</Label>
						<Input
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder="Enter Email"
						/>
					</FormGroup>
					<FormGroup>
						<Label>Password:</Label>
						<Input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							placeholder="Enter Password"
						/>
					</FormGroup>
					<Button className="btn-dark btn-lg btn-block">
						{loading && <Spinner style={{ width: '1.5rem', height: '1.5rem' }} color="secondary" />}Login
					</Button>
					<div className="text-center pt-2">
						<Link to="/signup">Signup</Link>
					</div>
				</Form>
			</Container>
		</div>
	);
};

export default Login;
