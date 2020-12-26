import React, { useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { useState } from 'react';
import AddData from './popUp/AddData/AddData';

const api = axios.create({
	baseURL: `http://localhost:7000/`,
});

const Dashboard = (props) => {
	const [org, setOrg] = useState();
    // let { data } = props.location;
    const [modal,setModal] = useState(false);

	const [alldata, setAllData] = useState('');

	useEffect(() => {
		if (props?.location?.data) {
			setOrg(props?.location?.data);
		}
	}, [props]);

	useEffect(() => {
       if(org && org!== ''){ 
		api.post(
			'/party/getAllParty',
			{
				partyId: org,
			},
			{
				withCredentials: true,
			}
		)
			.then(function (response) {
				// handle success
				if (response?.data !== 'Not Found') {
                    setAllData(response?.data);
                    console.log("res====",response?.data)
                    
				}
			})
			.catch(function (error) {
				// handle error
				console.log(error);
            });
        }
	}, [org]);

	return (
        <div style={{flex:1}}>
		<Table hover responsive>
			<thead>
				<tr>
					<th>#</th>
					<th>Party Name</th>
					<th>Contact</th>
					{/* <th>Username</th> */}
					<th>Edit</th>
					<th>Delete</th>
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
									<td>@mdo</td>
									<td>
										<Button color="warning" onClick={()=>setModal(true)} outline size="sm">
											Edit
										</Button>
									</td>
									<td>
										<Button color="danger" outline size="sm">
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
        showModal={modal}
        setToggle={()=>setModal(false)}
        />
        </div>
	);
};

export default Dashboard;
