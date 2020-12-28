import React, { useState, useEffect } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Row,
	Col,
	FormGroup,
	Label,
	Input,
	Form,
} from 'reactstrap';
import axios from 'axios';
import {toast} from 'react-toastify'
function AddOrg(props) {
	const { buttonLabel, className } = props;

	const [model, setModel] = useState(false);
	const [name, setName] = useState('');

	const toggle = () => {
		setModel(!model);
		props.onClose(!model);
    };
    
    const showToast = () =>{
        toast.success("Added Successfully");
    }

    const api = axios.create({
        baseURL:`http://localhost:7000/`
    })

	const onSubmit = (e) => {
        e.preventDefault();
		const form = e.currentTarget;
		if (!form.checkValidity()) {
			e.stopPrapogation();
		} else {
			api.post(
				'/organization/',
				{
					company_name: name,
				},
				{
					withCredentials: true,
					headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
				}
			)
				.then(function (response) {
					props.GetData();
					showToast();
					console.log('======insert----', response);
					// window.location.reload();
				})
				.catch(function (error) {
					console.log(error);
                });
                toggle()
		}
	};

	useEffect(() => {
		if (props?.showModel) {
			setModel(props.showModel);
		}
		console.log('AddOrg----', props);
	}, [props]);

	return (
		<div>
			<Modal isOpen={model} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Organization</ModalHeader>
				<ModalBody>
                    
					<Form
						onSubmit={(e) => {
							onSubmit(e);
						}}
					>
						<Row form>
							<Col md={6}>
								<FormGroup>
									<Label for="company_name">Organization Name</Label>
									<Input
										type="text"
										name="text"
										id="company_name"
										placeholder="Enter Name"
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</FormGroup>
							</Col>
						</Row>

						<Button color="primary">Submit</Button>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default AddOrg;
