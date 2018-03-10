import * as React from 'react';
import AppState from './AppState'
import autobind from 'autobind-decorator'
import { Router, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

export default class Login extends React.Component<{ appState: AppState }, {}>{
  constructor(props) {
    super(props)
    this.state = {user : ""};
    /*
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    */

  }

  @autobind
  handleChange(event) {
    this.setState({user: event.target.user});
  }

  @autobind
  handleSubmit(event) {
    console.log("this ", this)
    console.log("this.state ", this.props.appState)
    const data = {username : this.props.appState.user};
    this.props.appState.ws.send(JSON.stringify(data));
  }

  render() {
    return (
        <div className="wrapper">
          <div className="container">
            <h1>Welcome</h1>
            
            <form className="form" onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" value={this.props.appState.user} onChange={this.handleChange} />
              </label>
              <button type="submit"><a href="/map">Submit</a></button>
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