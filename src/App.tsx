import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import AppState from './AppState';
import VideoView from './VideoView'
import * as css from '../node_modules/bulma/css/bulma.css'
import { hot } from 'react-hot-loader'

@observer
class App extends React.Component<{ appState: AppState }, {}> {
    render() {
        return (
            <VideoView appState={this.props.appState} />
        );
    }
};

export default hot(module)(App)
