/* Creation Date: Saturday, March 31st 2019
 * Original Author: Nathan
 * Contents of file: Component to show the navigation bar
 */

import React, {Component} from 'react';
import { Menu, Button } from 'semantic-ui-react';
import User from "../models/User";
import { Redirect } from "react-router-dom";

import './Navbar.css';


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
            (window.location.pathname === "/dashboard" || 
                window.location.pathname === "/dashboard/")) {
            this.setState({
                shouldGoToAnalytics: false
              });
            return <Redirect to='/analytics' />
        } else if (this.state.shouldGoToDashboard && 
            (window.location.pathname === "/analytics" ||
                window.location.pathname === "/analytics/")) {
            this.setState({
                shouldGoToDashboard: false
            });
            return <Redirect to='/dashboard' />
        }

        // Build up real time element
        let realTime = <Menu.Item className='navbarText'
                            onClick={this.goToDashboard}>
                            Real Time
                        </Menu.Item>
        if (window.location.pathname === "/dashboard"
            || window.location.pathname === "/dashboard/") {
            realTime = <Menu.Item className='navbarText activeNavbar'
                onClick={this.goToDashboard}>
                Real Time
            </Menu.Item>
        }

        // Build up Analytics element
        let analytics = <Menu.Item className='navbarText'
                            onClick={this.goToAnalytics}>
                            Analytics
                        </Menu.Item>
        if (window.location.pathname === "/analytics"
            || window.location.pathname === "/analytics/") {
            analytics = <Menu.Item className='navbarText activeNavbar'
                onClick={this.goToAnalytics}>
                Analytics
            </Menu.Item>
        }

        return (
            <Menu className="navbar" stackable inverted height='80px'>
                <Menu.Item>
                    <h1 className="navbarTitleText">Launch Control</h1>
                </Menu.Item>                
                {realTime}
                {analytics}
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button 
                            basic 
                            inverted 
                            color="violet" 
                            size="huge" 
                            className='logoutButton' 
                            onClick={this.logout}>
                            Log Out
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Navbar;
