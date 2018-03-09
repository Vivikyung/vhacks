import * as React from 'react'
import * as Peer from 'simple-peer'
import { observer } from 'mobx-react'
import AppState from './AppState'
import autobind from 'autobind-decorator'
import { Stream } from 'stream'
import View3D from './3DView'

navigator.getUserMedia = (navigator.getUserMedia ||
  (navigator as any).webkitGetUserMedia ||
  (navigator as any).mozGetUserMedia ||
  (navigator as any).msGetUserMedia);

@observer
export default class VideoView extends React.Component<{ appState: AppState }, {}> {

  peer: Peer.Instance
  ws: WebSocket
  initiator: boolean = location.hash === '#1'

  constructor() {
    super()
    if (this.initiator)
      navigator.getUserMedia({ video: true, audio: true }, this.initStreamer, function () { })
    else
      this.initListener()
    this.ws = new WebSocket('ws://localhost:8085')
    this.ws.onmessage = (event: any) => {
      var parsed = JSON.parse(event.data)
      if (this.initiator && parsed.type == "answer")
        this.peer.signal(parsed)
      else if (!this.initiator && parsed.type == "offer")
        this.peer.signal(parsed)
    }
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
    let signal = JSON.stringify(data)
    console.log('SIGNAL', signal)
    this.ws.send(signal)
    document.querySelector('#outgoing').textContent = signal
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
    return <div>Video3
         <form onSubmit={this.submit}>
        <textarea id="incoming" onChange={this.onChange}></textarea>
        <button type="submit">submit</button>
      </form>
      <video ref="vidRef" src={this.props.appState.videoStreamSrc} />
      <pre id="outgoing"></pre>
      <View3D appState={this.props.appState} />
    </div>
  }
}