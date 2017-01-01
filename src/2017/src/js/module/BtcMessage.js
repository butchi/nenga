export default class BtcMessage {
  constructor(opts = {}) {
    this.$elm = opts.$elm || $('.btc-message');

    this.initialize();
  }

  initialize() {
    this.$to = this.$elm.find('.to');
    this.$body = this.$elm.find('.body');

    this.$form = this.$elm.find('.form');

    this.$mainMessage = this.$elm.find('.main-message');

    this.$beforeLoad = this.$elm.find('.area-before-load');

    this.$beforeLoadMessage = this.$beforeLoad.find('.text');

    this.$form.on('submit', (evt) => {
      evt.preventDefault();

      this.$beforeLoadMessage.text('読み込み中です。');

      let lastname = this.$form.find('[name="lastname"]').val();
      let code = this.$form.find('[name="code"]').val();

      ga('send', 'event', 'nenga-2017', 'submit', `${lastname}-${code}`);

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
          this.$beforeLoad.hide();
          this.$mainMessage.fadeIn(500);

          this.$to.text(data.to);
          this.$body.html(data.body);
        } else {
          this.$beforeLoadMessage.text('読み込めませんでした。');
        }

      }).fail((err) => {
        this.$beforeLoadMessage.text('読み込めませんでした。');
      });
    });
  }
}