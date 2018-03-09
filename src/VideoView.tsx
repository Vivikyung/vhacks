import * as React from 'react'
import * as Peer from 'simple-peer'
import { observer } from 'mobx-react'
import AppState from './AppState'
import autobind from 'autobind-decorator'

@observer
export default class VideoView extends React.Component<{ appState: AppState }, {}> {

  peer: Peer.Instance

  constructor() {
    super()
    this.init()
  }

  @autobind
  init() {
    this.peer = new Peer({ initiator: location.hash === '#1', trickle: false })
    this.peer.on('error', this.error)
    this.peer.on('signal', this.signal)
    this.peer.on('connect', this.connect)
    this.peer.on('data', this.data)
  }

  @autobind
  signal(data) {
    console.log('SIGNAL', JSON.stringify(data))
    document.querySelector('#outgoing').textContent = JSON.stringify(data)
  }

  @autobind
  data(data) {
    console.log('data: ' + data)
  }

  @autobind
  connect() {
    console.log('CONNECT')
    this.peer.send('whatever' + Math.random())
  }

  @autobind
  error(err) {
    console.log('error', err)
  }

  @autobind
  submit(event) {
    event.preventDefault()
    this.peer.signal(JSON.parse(this.props.appState.videoBox))
  }

  @autobind
  onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    this.props.appState.videoBox = event.currentTarget.value
  }

  render() {
    return <div>Video
         <form onSubmit={this.submit}>
        <textarea id="incoming" onChange={this.onChange}></textarea>
        <button type="submit">submit</button>
      </form>
      <pre id="outgoing"></pre>
    </div>
  }
}