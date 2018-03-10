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
  }

  @autobind
  initListener() {
    this.props.appState.onOffer = (signal) => {
      this.peer.signal(signal)
    }
    this.peer = new Peer({ initiator: false, trickle: false, config: { "iceServers": [{ "urls": "stun:stun.l.google.com:19302" }, { "urls": "stun:global.stun.twilio.com:3478" }] } })

    this.peer.on('error', this.error)
    this.peer.on('signal', this.signal)
    this.peer.on('connect', this.connect)
    this.peer.on('data', this.data)
    this.peer.on('stream', this.stream)
  }

  @autobind
  initStreamer(stream) {
    this.props.appState.onOffer = (signal) => {
      this.peer.signal(signal)
    }

    this.peer = new Peer({ initiator: location.hash === '#1', stream: stream, trickle: false, config: { "iceServers": [{ "urls": "stun:stun.l.google.com:19302" }, { "urls": "stun:global.stun.twilio.com:3478" }] } })
    this.peer.on('error', this.error)
    this.peer.on('signal', this.signal)
    this.peer.on('connect', this.connect)
    this.peer.on('data', this.data)
    this.props.appState.videoStreamSrc = window.URL.createObjectURL(stream);
    (this.refs.vidRef as HTMLVideoElement).play();
    (this.refs.vidRef as HTMLVideoElement).muted = true
  }

  @autobind
  signal(data) {
    let signal = JSON.stringify(data)
    /* if (this.props.appState.johnny) {
     */
    console.log('SIGNAL', signal)
    this.ws.send(signal)
    /* } else {
      if (this.props.appState.username == "metamaster") {
        this.props.appState.ws.send(JSON.stringify({
          command: 'OfferStream',
          userIdx: this.props.appState.username,
          targetIdx: 'follower',
          data: signal
        }));
      } else {
        this.props.appState.ws.send(JSON.stringify({
          command: 'AnswerStream',
          userIdx: this.props.appState.username,
          targetIdx: 'metamaster',
          data: signal
        }));
      }
    } */
    //document.querySelector('#outgoing').textContent = signal
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
    //this.peer.send('whatever' + Math.random())
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

  @autobind
  componentDidMount() {
    if (this.initiator)
      navigator.getUserMedia({ video: true, audio: true }, this.initStreamer, function () { })
    else
      this.initListener()
    this.ws = new WebSocket('ws://' + window.location.hostname + ':8085')
    this.ws.onmessage = (event: any) => {
      var parsed = JSON.parse(event.data)
      if (this.initiator && parsed.type == "answer")
        this.peer.signal(parsed)
      else if (!this.initiator && parsed.type == "offer")
        this.peer.signal(parsed)
    }
    this.props.appState.videoElement = this.refs.vidRef as HTMLVideoElement
  }

  render() {
    return <div style={{ height: "100%", width: "100%" }}>
      <View3D appState={this.props.appState} />
      <video ref="vidRef" src={this.props.appState.videoStreamSrc} style={{ height: "30px", width: "30px" }} />
    </div>
  }
}