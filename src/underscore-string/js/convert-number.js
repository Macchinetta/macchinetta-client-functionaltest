/*
 * Copyright(c) 2017 NTT Corporation.
 */
// convert-number.js

'use strict';

$(function () {
  $('#number').on({

    // フォーカス時にイベントが発生する
    'focus' : function () {
      var number = $('#number').val();

      // カンマを除去する
      $('#number').val(s.replaceAll(number, ',', ''));
    },

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {

      // 数値型に変換する
      var number = parseFloat(s.replaceAll($('#number').val(), ',', ''), 10);

      // カンマ付きのフォーマットに変換する
      $('#number').val(s.numberFormat(number, 0));
    }
  });
});
