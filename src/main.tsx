import * as React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import AppState from './AppState';
import App from './App';
import Login from './Login';
import MapPage from './Map';
import VideoView from './VideoView';


class Main extends React.Component<{ appState: AppState }, {}> {
  constructor(props) {
    super(props)
  }

  render() {
      return (
        <main>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={() => (<Login  appState={this.props.appState} />)}/>
              <Route path='/map' component={() => (<MapPage  appState={this.props.appState} />)}/>
              <Route path='/livestream' component={() => (<VideoView  appState={this.props.appState} />)}/>
            </Switch>
          </BrowserRouter>
        </main>
    )
  }
}
export default Main
