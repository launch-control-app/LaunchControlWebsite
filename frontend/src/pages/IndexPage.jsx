/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan
 * Contents of file: Serves as the landing page that shows authorization information (sign up/log in)
 */
import React, {Component} from 'react';
import AuthBox from '../components/AuthBox'
import './IndexPage.css';

class IndexPage extends Component {

  render() {
    return (
      <div className="appcontent" style={{background: "#1F1F28"}}>
        <p>Home page</p>
        <AuthBox></AuthBox>
      </div>
    );
  }
}

export default IndexPage;