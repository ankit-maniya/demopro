import React, { Component } from 'react'
import AppRouter from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux' 
import store from './redux/store'

export default class App extends Component {

    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        )
    }
}

