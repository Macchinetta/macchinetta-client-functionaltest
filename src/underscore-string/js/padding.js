/*
 * Copyright(c) 2017 NTT Corporation.
 */
// padding.js

'use strict';

$(function () {
  $('#right-padding').on({

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {
      var st = $('#right-padding').val();

      // 入力値の右側に「0」を10桁まで挿入する
      $('#right-padding').val(s.rpad(st, 10, '0'));
    }
  });

  $('#left-padding').on({

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {
      var st = $('#left-padding').val();

      // 入力値の左側に「x」を10桁まで挿入する
      $('#left-padding').val(s.lpad(st, 10, 'x'));
    }
  });
});
