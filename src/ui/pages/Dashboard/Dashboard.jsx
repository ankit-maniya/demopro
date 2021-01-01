import React, { useEffect, useState } from 'react';
import {
	Table,
	Button,
	Row,
	Col,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Label,
	Input,
	FormGroup,
} from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddData from './popUp/AddData/AddData';
import Demo from './popUp/Demo/Demo';
import UpdateData from './popUp/UpdateData/UpdateData';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
	baseURL: `http://localhost:7000/`,
});

const Dashboard = (props) => {
	const [modal, setModal] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isBatch, setIsBatch] = useState([]);
	const [isBatchUpdate, setIsBatchUpdate] = useState([]);
	const [checklist, setCheckList] = useState(0);
	const [modal2, setModal2] = useState(false);
	const [alldata, setAllData] = useState('');
	const [upData, setUpdata] = useState('');
	const [delId, setDelId] = useState('');

	const showToast = (msg = '') => {
		var msgExternal = '';
		if (msg !== '') {
			msgExternal = msg;
		} else {
			msgExternal = 'Deleted Successfully!';
		}
		// var msgExternal = 'Deleted Successfully!';
		console.log('---------', msgExternal);

		toast.success(msgExternal);
	};

	const orgId = localStorage.getItem('orgId') ? localStorage.getItem('orgId') : '';
	useEffect(() => {
		if (orgId && orgId !== '') {
			GetData(orgId);
		}
	}, [orgId, delId]);

	const GetData = (getId) => {
		api.post('/party/getAllParty', { orgId: getId }, { withCredentials: true })
			.then(function (response) {
				// handle success
				if (response?.data !== 'Not Found') {
					setAllData(response?.data);
					console.log('res====', response?.data);
				}
			})
			.catch(function (error) {
				// handle error
				console.log(error);
				toast.error('An Error Occure!');
			});
	};
	const RemoveData = (delId) => {
		api.delete('party/' + delId, { withCredentials: true })
			.then(function (response) {
				// handle success
				showToast();
				GetData(orgId);
				// showToast();
			})
			.catch(function (error) {
				// handle error
				showToast();
				console.log(error);
				// showToast();
			});
	};

	const RemoveBetchData = () => {
		api.post(
			'party/isBatchDelete/',
			{
				deleteBatch: isBatch,
			},
			{ withCredentials: true }
		)
			.then(function (response) {
				// handle success
				setCheckList(0);
				showToast();
				GetData(orgId);
				// showToast();
			})
			.catch(function (error) {
				// handle error
				showToast();
				console.log(error);
				// showToast();
			});
	};

	const _handleChange = (e, data) => {
		var value = isBatch;
		if (e.target.checked) {
			value.push(data._id);
			isBatchUpdate.push(data);
			setCheckList(checklist + 1);
		} else if (!e.target.checked) {
			value.splice(data._id, 1);
			isBatchUpdate.splice(data, 1);
			setCheckList(checklist - 1);
		}

		setIsBatch(value);
	};

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div style={{ flex: 1 }}>
			<Row style={{ margin: 0 }}>
				<Col xs="3">
					<Button
						className="m-1"
						color="primary"
						onClick={() => {
                            setModal(true);
						}}
						outline
						size="sm"
					>
						Add
					</Button>
				</Col>
				<Col xs="7" className="m-auto justify-content-center text-center">
					<h2>Party Table</h2>
				</Col>
				<Col xs="2" className="m-auto justify-content-center text-center">
					<ButtonDropdown isOpen={isOpen} toggle={toggle}>
						<Button id="caret" color="primary">
							{checklist ? checklist : 'Operations'}
						</Button>
						<DropdownToggle split color="primary" />
						<DropdownMenu>
							<DropdownItem
								onClick={() => {
									RemoveBetchData();
								}}
							>
								Delete Batch
							</DropdownItem>
							<DropdownItem
								onClick={() => {
									if (checklist !== 0) {
										setModal(true);
									} else {
										showToast('Please Select Fields First');
									}
								}}
							>
								Edit Batch
							</DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>
				</Col>
			</Row>
			<Table hover responsive>
				<thead>
					<tr>
						<th>Id</th>
						<th>Party Name</th>
						<th>Contact</th>
						{/* <th>Username</th> */}
						{/* <th>Edit</th> */}
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{alldata
						? alldata?.length > 0 &&
						  alldata.map((data, key) => {
								return (
									<tr key={data._id}>
										<th scope="row">
											<FormGroup check>
												<Label check>
													<Input
														type="checkbox"
														onChange={(e) => {
															_handleChange(e, data);
														}}
													/>
													{key + 1}
												</Label>
											</FormGroup>
										</th>
										<td>{data.name}</td>
										<td>{data.contact}</td>
										{/* <td>{data.contact}</td> */}
										{/* <td>@mdo</td> */}
										<td>
											<Button
												className="m-1"
												color="warning"
												onClick={() => {
													setModal2(true);
													setUpdata(data);
												}}
												outline
												size="sm"
											>
												Edit
											</Button>
											<Button
												className="m-1"
												color="danger"
												onClick={() => RemoveData(data._id)}
												outline
												size="sm"
											>
												Delete
											</Button>
										</td>
									</tr>
								);
						  })
						: null}
				</tbody>
			</Table>
			<AddData
				updateBetchData={isBatchUpdate}
				showModal={modal}
				setToggle={() => setModal(false)}
				GetData={() => GetData(orgId)}
			/>
			{/* <Demo showModal={modal} setToggle={() => setModal(false)} GetData={() => GetData(orgId)} /> */}
			<UpdateData
				setCheckList={() => setCheckList()}
				updateData={upData}
				showModal={modal2}
				setToggle={() => setModal2(false)}
				GetData={() => GetData(orgId)}
			/>
		</div>
	);
};

export default Dashboard;
