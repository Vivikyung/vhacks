import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import AppState from './AppState';
import VideoView from './VideoView'
import Map from './Map'
import * as css from '../node_modules/bulma/css/bulma.css'
import { hot } from 'react-hot-loader'

@observer
class App extends React.Component<{ appState: AppState }, {}> {
    render() {
        return (
            <div>
                <VideoView appState={this.props.appState} />
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.appState.timer}
                </button>
                <Map appState={this.props.appState} />
                <DevTools />
            </div>
        );
    }

    onReset = () => {
        this.props.appState.resetTimer();
    }
};

export default hot(module)(App)