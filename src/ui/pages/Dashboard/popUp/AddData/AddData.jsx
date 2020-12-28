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
import Inputs from '../../Inputs/Inputs';

const AddData = (props) => {
	const [inputs, addInputs] = useState([{ value: null }]);
    console.log(inputs);
    
    function updateInputsArray(index, newValue) {
        //copy the array first
       const updatedArray = [...inputs];
       updatedArray[index] = newValue;
       addInputs({
            inputs: updatedArray,
        });
    }

    const addOne = () => {
        
    }

	const showToast = () => {
		toast.success('Added Successfully!');
	};

	const { className } = props;

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
	}, [props]);


    const [fields, setFields] = useState([{ name: "" ,contact:""}]);

    function handleChange(i, event) {
        
        const values = [...fields];
        console.log("handle change event =====",event.target);
        values[i].name = event.target.name;
        values[i].contact = event.target.contact;
        console.log("handlechnage-----",values);
        
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ name: "" ,contact:""});
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

	const onSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (!form.checkValidity()) {
			e.stopPrapogation();
		} else {
            
            

			// api.post(
			// 	'/party/',
			// 	{
			// 		name: name,
			// 		contact: contact,
			// 		orgId: orgId,
			// 	},
			// 	{
			// 		withCredentials: true,
			// 		headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
			// 	}
			// )
			// 	.then(function (response) {
			// 		props.GetData();
			// 		showToast();
			// 		console.log('========>>>>>>>>>>>>>>>', response);
			// 		// window.location.reload();
			// 	})
			// 	.catch(function (error) {
			// 		console.log(error);
			// 	});

			toggle();
		}
	};
	return (
		<div>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Add Data</ModalHeader>
				<ModalBody>
					<Button color="success" onClick={() => handleAdd()}>Add More +</Button>
					<Form
						onSubmit={(e) => {
							onSubmit(e);
						}}
					>
						{fields
							? fields?.length > 0
								? fields?.map((field,idx) => {
										return (
											<Inputs key={`${field}-${idx}`} field = {field} idx={idx} handleChange={(idx,e)=>handleChange(idx,e)} handleRemove={()=>{handleRemove(idx)}}/>
										);
								  })
								: null
							: ''}

						<Button color="primary">Submit</Button>
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
