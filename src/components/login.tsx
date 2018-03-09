import * as React from 'react';
import AppState from '../AppState'
import { Router, Route, Switch } from 'react-router'

export default class Header extends React.Component<{ appState: AppState }, {}>{
  constructor(props) {
    super(props)
    this.state = {user : ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({user: event.target.user});
  }

  handleSubmit(event) {
    console.log("this ", this)
    console.log("this.state ", this.props.appState)
    const data = {username : this.state.user};
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
                <input type="text" value={this.state.user} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
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