import { observable } from 'mobx';
import autobind from 'autobind-decorator';

export default class AppState {
  @observable timer = 0;

  @observable videoBox = ""

  @observable markers = []

  @observable videoStreamSrc: string = null

  @observable videoElement: HTMLVideoElement = null


  ws: WebSocket

  username = location.hash === '#1' ? "metamaster" : "follower"

  constructor() {

    setInterval(() => {
      this.timer += 1;
    }, 1000);

    this.ws = new WebSocket('ws://192.168.200.86:4567/chat')
    this.ws.onmessage = this.onMessage
    this.ws.onopen = () => {
      console.log("onopen")
      this.ws.send(JSON.stringify({
        command: "RegisterCommand",
        userIdx: this.username
      }))
    }
  }

  resetTimer() {
    this.timer = 0;
  }

  onOffer: (data: any) => void

  @autobind
  onMessage(event: MessageEvent) {
    console.log(event)
    let data = JSON.parse(event.data)
    switch (data.command) {
      case 'OfferStream':
        this.onOffer(data.data)
        break;
      default:
        break;
    }
  }
}