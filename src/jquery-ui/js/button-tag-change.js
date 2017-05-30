/*
 * Copyright(c) 2017 NTT Corporation.
 */
// button-tag-change.js

'use strict';

// ボタンを生成する対象に対して、buttonメソッドを実行する
$(function () {
  $('.buttonClass').button({
  });

  $('.buttonClass').keypress(function (e) {
    $('#keypress-status').val(document.activeElement.id + ':keypress');
  });
  $('.buttonClass').keydown(function (e) {
    $('#keydown-status').val(document.activeElement.id + ':keydown');
  });
  $('.buttonClass').keyup(function (e) {
    $('#keyup-status').val(document.activeElement.id + ':keyup');
  });
});
