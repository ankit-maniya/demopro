import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Col,
	Row,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import axios from 'axios';

const AddData = (props) => {
	const [inputFields, addinputFields] = useState([{ name: '', contact: '' }]);
	console.log('--->input<------', inputFields);

	const showToast = () => {
		toast.success('Added Successfully!');
	};

	const { className } = props;

	const orgId = localStorage.getItem('orgId') ? localStorage.getItem('orgId') : '';

	const [modal, setModal] = useState(false);

	const toggle = () => {
		setModal(!modal);
		props?.setToggle(false);
	};

	const api = axios.create({
		baseURL: `http://localhost:7000/`,
	});

	useEffect(() => {
		if (props?.showModal) {
			setModal(props?.showModal);
		}
	}, [props]);

	const onSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (!form.checkValidity()) {
			e.stopPrapogation();
		} else {
			api.post(
				'/party/',
				{
					inputFields: inputFields,
					orgId: orgId,
				},
				{
					withCredentials: true,
					headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
				}
			)
				.then(function (response) {
					props.GetData();
					showToast();
				})
				.catch(function (error) {
					console.log(error);
				});

			toggle();
			emptyFields();
		}
	};

	const handleChangeInput = (index, name, event) => {
		const value = [...inputFields];
		// value[0]['name'] = ankit
		// value[0]['contect'] = 6359662255
		value[index][name] = event.target.value;
	};

	const handleAddInputField = () => {
		let newFields = [...inputFields];
		newFields.push({ name: '', contact: '' });
		addinputFields(newFields);
	};

	const handleRemoveField = (index) => {
		const newFields = [...inputFields];
		newFields.splice(index, 1);
		addinputFields(newFields);
	};

	const emptyFields = () => {
		addinputFields([{ name: '', contact: '' }]);
	};

	return (
		<div>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Add Data</ModalHeader>
				<ModalBody>
					<Button
						color="success"
						onClick={() => {
							handleAddInputField();
						}}
					>
						Add More +
					</Button>
					<Form
						onSubmit={(e) => {
							onSubmit(e);
						}}
					>
						{inputFields
							? inputFields.map((inputField, index) => (
									<Row form className="formInputs" key={index}>
										<Col md={2} className="m-auto justify-content-center text-center">
											<Button
												color="danger"
												type="button"
												onClick={() => {
													handleRemoveField(index);
												}}
											>
												X
											</Button>
										</Col>
										<Col md={5}>
											<FormGroup>
												<Label for="name">Party Name</Label>
												<Input
													type="text"
													placeholder="Enter Name"
													id="name"
													defaultValue={inputField.name}
													onChange={(event) => handleChangeInput(index, 'name', event)}
													required
												/>
											</FormGroup>
										</Col>
										<Col md={5}>
											<FormGroup>
												<Label for="contact">Contact No</Label>
												<Input
													type="text"
													placeholder="Enter Contact"
													id="contact"
													defaultValue={inputField.contact}
													minLength={10}
													maxLength={13}
													onChange={(event) => handleChangeInput(index, 'contact', event)}
													required
												/>
											</FormGroup>
										</Col>
									</Row>
							  ))
							: null}
						<Button color="primary">Submit</Button>
					</Form>
				</ModalBody>
				<ModalFooter onClick={emptyFields}>
					<Button color="secondary" onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default AddData;
