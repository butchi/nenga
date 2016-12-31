import ns from '../module/ns';
import BtcMessage from '../module/BtcMessage';

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    console.log('index page');

    this.BtcMessage = new BtcMessage();
  }
}