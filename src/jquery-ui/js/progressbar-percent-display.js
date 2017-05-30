/*
 * Copyright(c) 2017 NTT Corporation.
 */
// progressbar-percent-display.js

'use strict';

$(function () {
  var progressbar = $('#progressbar');
  var progresslabel = $('.progress-label');
  var progressTimer;
  var per;

  $('#execute-progressbar').on('click', function () {
    progressTimer = progress();
  });
  $('#reset-progressbar').on('click', function () {
    clearTimeout(progressTimer);
    progressbar.progressbar('value', false);
    progresslabel.text('Loading...');
  });

  // プログレスバーの定義
  progressbar.progressbar({
    value: false,
    max: 150,
    change: function () {
      per = progressbar.progressbar('value') / progressbar.progressbar('option', 'max');
      progresslabel.text(Math.ceil(per * 100) + '％');
    },
    complete: function () {
      progresslabel.text('Complete!');
    }
  });

  // プログレスバーの進捗を更新する
  function progress() {
    // progressbarのvalueの現在値を取得する。falseの場合は0を設定する
    var val = progressbar.progressbar('value') || 0;
    // progressbarの第1引数に'value'を指定し、第2引数に更新する値を設定する
    progressbar.progressbar('value', val + 1);

    if (val < 150) {
      progressTimer = setTimeout(progress, 50);
    }
  }

});
