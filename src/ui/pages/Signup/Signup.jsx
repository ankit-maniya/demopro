import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import './signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:7000/',
});

const Signup = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		// alert(name+''+email+''+password)
		const form = event.currentTarget;

		if (!form.checkValidity()) {
			event.stopPropagation();
		} else {
			api.post(
				'/user',
				{
					name: name,
					email: email,
					password: password,
				},
				{ withCredentials: true }
			)
				.then((response) => {
					console.log(response);
					if (response.data.user._id !== 0) {
						props.history.push('/organization');
					} else {
						alert('Some Error');
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<div>
			<Container>
				<Form className="Signup-form" onSubmit={(event) => onSubmit(event)}>
					<h1 className="text-center">Signup Page</h1>
					<FormGroup>
						<Label>Name:</Label>
						<Input
							type="name"
							name="name"
							id="name"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder="Enter Name"
						/>
					</FormGroup>
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
					<Button className="btn-dark btn-lg btn-block">SignUp</Button>
					<div className="text-center pt-2">
						<Link to="/">SignIn</Link>
					</div>
				</Form>
			</Container>
		</div>
	);
};

export default Signup;
