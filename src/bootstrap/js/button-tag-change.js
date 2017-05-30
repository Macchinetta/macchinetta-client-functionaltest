/*
 * Copyright(c) 2017 NTT Corporation.
 */
// button-tag-change.js

'use strict';

// ボタンを生成する対象に対して、buttonメソッドを実行する
$(function () {
  $('.btn-default').button({
  });

  $('.btn-default').keypress(function (e) {
    $('#keypress-status').val(document.activeElement.id + ':keypress');
  });
  $('.btn-default').keydown(function (e) {
    $('#keydown-status').val(document.activeElement.id + ':keydown');
  });
  $('.btn-default').keyup(function (e) {
    $('#keyup-status').val(document.activeElement.id + ':keyup');
  });
});
