import * as React from 'react'
import * as Peer from 'simple-peer'
import { observer } from 'mobx-react'
import AppState from './AppState'
import autobind from 'autobind-decorator'
import { Stream } from 'stream';

navigator.getUserMedia = (navigator.getUserMedia ||
  (navigator as any).webkitGetUserMedia ||
  (navigator as any).mozGetUserMedia ||
  (navigator as any).msGetUserMedia);

@observer
export default class VideoView extends React.Component<{ appState: AppState }, {}> {

  peer: Peer.Instance

  constructor() {
    super()
    if (location.hash === '#1')
      navigator.getUserMedia({ video: true, audio: true }, this.initStreamer, function () { })
    else
      this.initListener()
  }

  @autobind
  initListener() {
    this.peer = new Peer({ initiator: false, trickle: false })
    this.peer.on('error', this.error)
    this.peer.on('signal', this.signal)
    this.peer.on('connect', this.connect)
    this.peer.on('data', this.data)
    this.peer.on('stream', this.stream)
  }

  @autobind
  initStreamer(stream) {
    this.peer = new Peer({ initiator: location.hash === '#1', stream: stream, trickle: false })
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
  stream(stream) {
    console.log("on stream")
    this.props.appState.videoStreamSrc = window.URL.createObjectURL(stream);
    (this.refs.vidRef as HTMLVideoElement).play();
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
      <video ref="vidRef" src={this.props.appState.videoStreamSrc} />
      <pre id="outgoing"></pre>
    </div>
  }
}