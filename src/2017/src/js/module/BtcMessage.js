export default class BtcMessage {
  constructor(opts = {}) {
    this.$elm = opts.$elm || $('.btc-message');

    this.initialize();
  }

  initialize() {
    this.$to = this.$elm.find('.to');
    this.$body = this.$elm.find('.body');

    this.$form = this.$elm.find('.form');

    this.$form.on('submit', (evt) => {
      evt.preventDefault();

      let lastname = this.$form.find('[name="lastname"]').val();
      let code = this.$form.find('[name="code"]').val();

      $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbws1vKfZR6in5KG4OfA1KiPFlcaRwsLtGY5oMtMDWmvdlC_gjbF/exec',
        type: 'GET',
        cache: false,
        data: {
          lastname,
          code,
        },
        dataType: 'jsonp',
      }).then((data) => {
        //成功

        if(data && data.to && data.body) {
          this.$to.text(data.to);
          this.$body.text(data.body);
        } else {
          console.log('error');
        }

      }).fail((err) => {
        console.log(err);
      });
    });
  }
}