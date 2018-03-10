import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import AppState from './AppState';
import App from './App';

const appState = new AppState();
ReactDOM.render(<App appState={appState} />, document.getElementById('root'));