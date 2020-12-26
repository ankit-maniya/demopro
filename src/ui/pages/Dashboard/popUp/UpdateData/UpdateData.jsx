import React, { useState, useEffect } from 'react';
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
	const { buttonLabel, className } = props;

	const orgId = localStorage.getItem('orgId') ? localStorage.getItem('orgId') : '';

	const [modal, setModal] = useState(false);
	const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    
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

		if (props?.updateData && props?.updateData !== '') {
            setName(props?.updateData?.name);
            setContact(props?.updateData?.contact);
		}
	}, [props]);

	

	const onSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (!form.checkValidity()) {
			e.stopPrapogation();
		} else {

			api.put(
				'/party/'+props?.updateData?._id,
				{
					name: name,
					contact: contact,
				},
				{
					withCredentials: true,
					headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
				}
			)
				.then(function (response) {
					console.log('========>>>>>>>>>>>>>>>', response);
					window.location.reload();
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	};
	return (
		<div>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Update Data</ModalHeader>
				<ModalBody>
					<Form
						onSubmit={(e) => {
							onSubmit(e);
						}}
					>
						<Row form>
							<Col md={6}>
								<FormGroup>
									<Label for="name">Party Name</Label>
									<Input
										type="text"
										name="text"
										id="name"
										placeholder="Enter Name"
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label for="contact">Contact No</Label>
									<Input
										type="text"
										name="text"
										id="contact"
										placeholder="Enter Contact"
										value={contact}
										onChange={(e) => {
											setContact(e.target.value);
										}}
									/>
								</FormGroup>
							</Col>
						</Row>

						<Button color="warning">Update</Button>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default AddData;