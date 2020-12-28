import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddData from './popUp/AddData/AddData';
import UpdateData from './popUp/UpdateData/UpdateData';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
	baseURL: `http://localhost:7000/`,
});

const Dashboard = (props) => {
	const showToast = () => {
		toast.success('Deleted Successfully!');
	};
	const [modal, setModal] = useState(false);
	const [modal2, setModal2] = useState(false);
	const [alldata, setAllData] = useState('');
	const [upData, setUpdata] = useState('');
	const [delId, setDelId] = useState('');

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
	return (
		<div style={{ flex: 1 }}>
			<Row style={{ margin: 0 }}>
				<Col xs="3">
					<Button className="m-1" color="primary" onClick={() => setModal(true)} outline size="sm">
						Add
					</Button>
				</Col>
				<Col xs="9" className="m-auto justify-content-center text-center">
					<h3>Party Table</h3>
				</Col>
			</Row>
			<Table hover responsive>
				<thead>
					<tr>
						<th>#</th>
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
									<tr key={key}>
										<th scope="row">{key + 1}</th>
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
			<AddData showModal={modal} setToggle={() => setModal(false)} GetData={() => GetData(orgId)} />
			<UpdateData updateData={upData} showModal={modal2} setToggle={() => setModal2(false)} GetData={()=>GetData(orgId)} />
		</div>
	);
};

export default Dashboard;
