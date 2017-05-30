/*
 * Copyright(c) 2017 NTT Corporation.
 */
// prevent-continuous-click_for_a.js

'use strict';

// 押下未済判定用
var clicked = false;

$(function () {

  // aタグが押下された際のイベントハンドラ
  $('a').on('click', function () {

    // 押下済みの場合はfalseを返却しリンクを無効化する
    if (clicked) {
      $('#status').val('クリック無効です。');
      return false;
    };

    // 押下済みでない場合はフラグを立て押下済みとする
    clicked = true;

    // リンク押下時の動作を実装する
    $(function () {
      $('#status').val('クリックされました。');
    });
  });
});
