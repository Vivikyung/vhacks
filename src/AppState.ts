import { observable } from 'mobx';

export default class AppState {
  @observable timer = 0;

  @observable videoBox = ""

  @observable markers = []

  @observable videoStreamSrc: string = null

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }
}