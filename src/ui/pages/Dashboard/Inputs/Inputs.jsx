import React, { useState } from 'react';
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

const Inputs = (props) => {
	return (
		<Row form className="formInputs">
			<Col md={2} className="m-auto justify-content-center text-center">
				<Button color="danger" type="button" onClick={() => props.handleRemove(props.idx)}>
					X
				</Button>
			</Col>
			<Col md={5}>
				<FormGroup>
					<Label for="name">Party Name</Label>
					<Input
						type="text"
						name="name"
						id="name"
						placeholder="Enter Name"
						value={props.field.name}
						onChange={(e) => props.handleChange(props.idx, e)}
					/>
				</FormGroup>
			</Col>
			<Col md={5}>
				<FormGroup>
					<Label for="contact">Contact No</Label>
					<Input
						type="text"
						name="contact"
						id="contact"
						placeholder="Enter Contact"
						value={props.field.contact}
						minLength={10}
						maxLength={13}
						onChange={(e) => props.handleChange(props.idx, e)}
					/>
				</FormGroup>
			</Col>
		</Row>
	);
};

export default Inputs;
