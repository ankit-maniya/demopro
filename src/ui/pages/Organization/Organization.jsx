import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Button, Row, Col } from 'reactstrap';
import './Organization.css';
import AddOrg from '../Dashboard/popUp/AddOrg/AddOrg';

const api = axios.create({
	baseURL: `http://localhost:7000`,
});
const Organization = (props) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		GetData();
	}, []);

	const GetData = () => {
		api.get('/organization', {
			withCredentials: true,
		})
			.then(function (response) {
				// handle success
				console.log(response);
				setData(response?.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	};

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedOrg, setSelectedOrg] = useState('');
	const [model, setModel] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);

	const loadTable = () => {
		if (!selectedOrg) {
			alert('Please Select Organization');
		} else {
			props.history.push({
				pathname: '/dashboard',
				data: selectedOrg?.cId, // your data array of objects
			});

			localStorage.setItem('orgId', selectedOrg?.cId);
		}
	};

	return (
		<div>
			<Row className="m-0">
				<Col className="d-flex text-center">
					<Button color="primary"  onClick={() => setModel(true)}>
						Add Organization
					</Button>
				</Col>
			</Row>
			<Container className="d-full justify-content-center text-center">
				<Dropdown isOpen={dropdownOpen} size="lg" toggle={toggle}>
					<DropdownToggle color="danger" caret>
						{selectedOrg?.cName ? selectedOrg?.cName : 'Select Organization'}
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem header>Select Organization</DropdownItem>
						{data &&
							data?.length > 0 &&
							data.map((d, i) => {
								return (
									<DropdownItem
										onClick={() => setSelectedOrg({ cName: d?.company_name, cId: d?._id })}
										key={i}
									>
										{d?.company_name}
									</DropdownItem>
								);
							})}
					</DropdownMenu>
				</Dropdown>
				<Button color="primary" onClick={loadTable} className=" d-btn">
					Continue
				</Button>
			</Container>
			<AddOrg
				showModel={model}
				onClose={(toggle) => {
					setModel(toggle);
                }}
                GetData={()=>{GetData()}}
			/>
		</div>
	);
};

export default Organization;
