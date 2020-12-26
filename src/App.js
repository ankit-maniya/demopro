import React, { Component } from 'react'
import AppRouter from './router'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {

    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        return (
            <AppRouter/>
        )
    }
}

