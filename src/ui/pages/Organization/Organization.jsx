import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Button } from 'reactstrap';
import './Organization.css';

const api = axios.create({
	baseURL: `http://localhost:7000`,
});
const Organization = (props) => {
	const [data, setData] = useState([]);

	useEffect(() => {
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
	}, []);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedOrg, setSelectedOrg] = useState('');

	const toggle = () => setDropdownOpen((prevState) => !prevState);

	const loadTable = () => {
		if (!selectedOrg) {
            alert('Please Select Organization');
		} else {
			props.history.push({
				pathname: '/dashboard',
				data: selectedOrg?.cId, // your data array of objects
            });    
		}
	};

	return (
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
	);
};

export default Organization;
