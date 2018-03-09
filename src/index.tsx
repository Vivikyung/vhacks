import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import AppState from './AppState';
import VideoView from './VideoView'
import Map from './Map'

@observer
class TimerView extends React.Component<{ appState: AppState }, {}> {
    render() {
        return (
            <div>
                <VideoView appState={appState} />
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.appState.timer}
                </button>
                <Map appState={appState} />
                <DevTools />
            </div>
        );
    }

    onReset = () => {
        this.props.appState.resetTimer();
    }
};

const appState = new AppState();
ReactDOM.render(<TimerView appState={appState} />, document.getElementById('root'));
