/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Component to handle login and signup on the website
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Tab, Form, Button, Message} from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
import User from "../models/User";
import './AuthBox.css';

class AuthBox extends Component {

    state = {
        email: '',
        password: '',
        vin: '',
        toDashboard: false,
        error: null
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    login = () => {
        let loginUrl;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            loginUrl = 'http://localhost:4000/login';
        } else {
            loginUrl = window.location.protocol + '//' + window.location.host + '/login';
        }
        const {email, password} = this.state;
        axios
            .post(loginUrl, {
            email: email,
            password: password
        })
            .then(response => {
                User.authenticate(response.data.token);
                this.setState({toDashboard: true});
            })
            .catch(error => {
                this.setState({error: error.message});
            });
    }

    signup = () => {
        let signupUrl;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            signupUrl = 'http://localhost:4000/signup';
        } else {
            signupUrl = window.location.protocol + '//' + window.location.host + '/signup';
        }
        const {email, password, vin} = this.state;
        axios
            .post(signupUrl, {
            email: email,
            password: password,
            vin: vin
        })
            .then(response => {
                User.authenticate(response.data.token);
                this.setState({toDashboard: true});
            })
            .catch(error => {
                this.setState({error: error.message});
            });
    }
    render() {

        const {email, password, vin, toDashboard} = this.state;

        if (toDashboard) {
            return <Redirect to='dashboard/' />
        }

        let errors = null
        if (this.state.error != null) {
            errors = <Message error header='Error' content={this.state.error}/>
        }

        const panes = [
            {
                menuItem: 'Sign Up',
                render: () => <Form inverted>

                            <Form.Input
                                fluid
                                label='VIN #'
                                name='vin'
                                value={vin}
                                onChange={this.handleChange}/>
                            <Form.Input
                                fluid
                                label='Email'
                                type='email'
                                name='email'
                                value={email}
                                onChange={this.handleChange}/>
                            <Form.Input
                                fluid
                                label='Password'
                                type='password'
                                name='password'
                                value={password}
                                onChange={this.handleChange}/>

                        {errors}
                        <br/>
                        <Button className="lcButton" onClick={this.signup}>Sign Up</Button>
                    </Form>
            }, {
                menuItem: 'Log In',
                render: () => <Form inverted>

                            <Form.Input
                                fluid
                                label='Email'
                                type='email'
                                name='email'
                                value={email}
                                onChange={this.handleChange}/>
                            <Form.Input
                                fluid
                                label='Password'
                                type='password'
                                name='password'
                                value={password}
                                onChange={this.handleChange}/>

                        {errors}
                        <br/>
                        <Button className="lcButton" onClick={this.login}>Log In</Button>
                    </Form>
            }
        ]
        return (<div className="AuthBox">
            <Tab
                menu={{
                    secondary: true,
                    pointing: true}}
                panes={panes}/>
            </div>);
    }
}

export default AuthBox;
