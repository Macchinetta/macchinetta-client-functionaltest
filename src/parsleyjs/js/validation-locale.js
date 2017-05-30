/*
 * Copyright(c) 2017 NTT Corporation.
 */
// validation-locale.js

'use strict';

var locale = (navigator.language || navigator.userLanguage).substring(0, 2);
try {
  window.ParsleyValidator.setLocale(locale);
  $('#lang').val(locale);
} catch (e) {
  window.ParsleyValidator.setLocale('en');
  $('#lang').val(locale);
}
window.ParsleyValidator
  .addValidator('multipleof', function (value, requirement) {
    return 0 === value % requirement;
  }, 32)
  .addMessage('en', 'multipleof', 'This value should be a multiple of %s')
  .addMessage('ja', 'multipleof', '%s の倍数である必要があります。');
$(function () {

  // バリデーションを有効化
  $('#form').parsley({

    // 検証対象の要素を指定 (セレクタ文字列、またはjQueryオブジェクト)
    inputs: 'input, textarea, select',

    // 検証対象から除外する要素を指定 (セレクタ文字列、またはjQueryオブジェクト)
    excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',

    // 検証エラー時に付与するクラス名を指定
    errorClass: 'has-error',

    // 検証成功時に付与するクラス名を指定
    successClass: '',

    // 検証結果に応じてクラスを付与する要素を指定
    // (セレクタ文字列、jQueryオブジェクト、またはそれらを返す関数)
    classHandler: function (ParsleyField) {

      // 検証エラーが起きた input 要素の親要素に has-error クラスを付与する。
      return ParsleyField.$element.parent();
    },

    // エラーメッセージを追加する要素を指定
    // (文字列、jQueryオブジェクト、またはそれらを返す関数)
    errorsContainer: function (ParsleyField) {

      // 実装なし
      // ※ オプション未指定時や undefined を返すと、input 要素の次に作られる。
    },

    // エラーメッセージの親要素に用いるHTML文字列を指定
    errorsWrapper: '<ul class="parsley-errors-list"></ul>',

    // エラーメッセージ表示に用いるHTML文字列を指定
    errorTemplate: '<li></li>'
  });

});