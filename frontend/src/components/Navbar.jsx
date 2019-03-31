import React, {Component} from 'react';
import { Menu } from 'semantic-ui-react';
import User from "../models/User";
import './Navbar.css';
import { Redirect } from "react-router-dom";


export class Navbar extends Component {
    state = {
        shouldLogout: false,
        shouldGoToAnalytics: false,
        shouldGoToDashboard: false,
    };

    logout = () => {
        User.deauthenticate();
        this.setState({
          shouldLogout: true
        });
    }

    goToAnalytics = () => {
        this.setState({
            shouldGoToAnalytics: true
        });
    }

    goToDashboard = () => {
        this.setState({
            shouldGoToDashboard: true
        });
    }

    render() {
        if (this.state.shouldLogout){
            this.setState({
                shouldLogout: false
              });
            return <Redirect to='/' />
        } else if (this.state.shouldGoToAnalytics && 
            (((window.location.href) === "http://localhost:3000/dashboard") || 
            ((window.location.href) === "http://localhost:3000/dashboard/"))) {
            this.setState({
                shouldGoToAnalytics: false
              });
            return <Redirect to='/analytics' />
        } else if (this.state.shouldGoToDashboard && 
            (((window.location.href) === "http://localhost:3000/analytics") ||
            ((window.location.href) === "http://localhost:3000/analytics/"))) {
            this.setState({
                shouldGoToDashboard: false
            });
            return <Redirect to='/dashboard' />
        }

        return (
            <Menu className="navbar" stackable inverted height='80px'>
                <Menu.Item>
                    <h1
                        style = {{
                            fontFamily: 'Poppins',
                            fontSize:'50px',
                            fontWeight:'200'
                        }}
                    >
                        Launch Control
                    </h1>
                </Menu.Item>                
                <Menu.Item
                    style = {{
                        fontFamily: 'Poppins',
                        fontSize:'20px',
                        fontWeight:'200',
                    }}
                    onClick={this.goToDashboard}
                >
                    Real Time
                </Menu.Item>
                <Menu.Item
                    style = {{
                        fontFamily: 'Poppins',
                        fontSize:'20px',
                        fontWeight:'200',
                    }}
                    onClick={this.goToAnalytics}
                >
                    Analytics
                </Menu.Item>
                <Menu.Item 
                    onClick={this.logout}
                >
                Log Out
                </Menu.Item>
            </Menu>
        );
    }
}

export default Navbar;
