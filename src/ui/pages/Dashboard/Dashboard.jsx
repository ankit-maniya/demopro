import React, { useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { useState } from 'react';
import AddData from './popUp/AddData/AddData';
import UpdateData from './popUp/UpdateData/UpdateData';

const api = axios.create({
	baseURL: `http://localhost:7000/`,
});

const Dashboard = (props) => {
	const [modal, setModal] = useState(false);
	const [modal2, setModal2] = useState(false);

	const [alldata, setAllData] = useState('');
	const [upData, setUpdata] = useState('');

	const orgId = localStorage.getItem('orgId') ? localStorage.getItem('orgId') : '';

	useEffect(() => {
		if (orgId && orgId !== '') {
			api.post(
				'/party/getAllParty',
				{
					orgId: orgId,
				},
				{
					withCredentials: true,
				}
			)
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
				});
		}
	}, [orgId]);

	return (
		<div style={{ flex: 1 }}>
			<Table hover responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Party Name</th>
						<th>Contact</th>
						{/* <th>Username</th> */}
						{/* <th>Edit</th> */}
						<th>
							Actions
							<Button className="m-1" color="primary" onClick={() => setModal(true)} outline size="sm">
								Add
							</Button>
						</th>
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
												onClick={() => {setModal2(true);setUpdata(data);}}
												outline
												size="sm"
											>
												Edit
											</Button>
											<Button className="m-1" color="danger" outline size="sm">
												Delete
											</Button>
										</td>
									</tr>
								);
						  })
						: null}
				</tbody>
			</Table>
			<AddData  showModal={modal} setToggle={() => setModal(false)} />
			<UpdateData updateData={upData} showModal={modal2} setToggle={() => setModal2(false)} />
		</div>
	);
};

export default Dashboard;
