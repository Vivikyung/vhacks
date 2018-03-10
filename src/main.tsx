import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import AppState from './AppState';
import App from './App';
import Login from './Login';
import MapPage from './Map';
import VideoView from './VideoView';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/map' component={MapPage}/>
      <Route path='/livestream' component={VideoView}/>
    </Switch>
  </main>
)

export default Main