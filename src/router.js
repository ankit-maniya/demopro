import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './ui/pages/Login/Login';
import Signup from './ui/pages/Signup/Signup';
import Dashboard from './ui/pages/Dashboard/Dashboard';
import Organization from './ui/pages/Organization/Organization';
import { ToastContainer } from 'react-toastify';

export default class AppRouter extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Router>
				<Switch>
					<PublicRoute exact path="/" component={Login} />
                    <PublicRoute exact path="/signup" component={Signup} />

                    <UserRoute exact path="/dashboard" component={Dashboard} />
                    <UserRoute exact path="/organization" component={Organization} />
				</Switch>
                <ToastContainer />
			</Router>
		);
	}
}

const PublicRoute = ({ component: Component }) => {
	return (
		<Route
			render={(props) => {
				let me = false;
                return me ? <Redirect to={{ pathname: '/register' }} /> : <Component {...props} />;
			}}
		/>
	);
};


const UserRoute = ({component: Component}) =>{
    return (
        <Route render= {(props)=>{
            return <Component {...props} />;
        } } />
    )
}