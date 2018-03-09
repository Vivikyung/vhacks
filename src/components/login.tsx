import * as React from 'react';
import AppState from '../AppState'

export default class Header extends React.Component<{ appState: AppState }, {}>{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    //const { name, password, description } = this.props;

    

    return (
        <div className="wrapper">
          <div className="container">
            <h1>Welcome</h1>
            
            <form className="form">
              <input type="text" placeholder="Username"/>
              <input type="password" placeholder="Password"/>
              <button type="submit" id="login-button">Login</button>
            </form>
          </div>
          
          <ul className="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
    )
  }
}