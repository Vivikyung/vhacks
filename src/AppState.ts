import { observable } from 'mobx';
import autobind from 'autobind-decorator';

export default class AppState {
  @observable timer = 0;

  @observable videoBox = ""

  @observable markers = []

  @observable videoStreamSrc: string = null

  @observable videoElement: HTMLVideoElement = null

  @observable user: string
  @observable userlat: 0.00;
  @observable userlng: 0.00;

  @observable recvlat: 0.00;
  @observable recvlng: 0.00;
  @observable removeP: boolean = null;
  @observable ID: 0;


  ws: WebSocket

  username = location.hash === '#1' ? "metamaster" : "follower"

  noMaps: boolean = location.search.indexOf('g=false') >= 0

  johnny: boolean = location.search.indexOf('j=true') >= 0

  constructor() {

    setInterval(() => {
      this.timer += 1;
    }, 1000);

    if (!this.johnny) {
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
  }

  resetTimer() {
    this.timer = 0;
  }

  onOffer: (data: any) => void

  @autobind
  onMessage(event: MessageEvent) {
    let data = JSON.parse(event.data)
    console.log(data)
    this.recvlat = data.latitude
    this.recvlng = data.longitude
    this.ID = data.markerIdx
    console.log("ID ",data.markerIdx)
    switch (data.command) {
      case "RemovePoint":
        this.removeP = true
        break;
      case "RequestPoint":
        this.removeP = false
        break;
      default:
        break;
    }
  }
}
