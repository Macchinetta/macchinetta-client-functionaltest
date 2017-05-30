/*
 * Copyright(c) 2017 NTT Corporation.
 */
// trimming.js

'use strict';

$(function () {
  $('#both-trim').on({

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {
      var st = $('#both-trim').val();

      // 入力値の両側の空白を削除する
      $('#both-trim').val(s.trim(st));
    }
  });

  $('#right-trim').on({

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {
      var st = $('#right-trim').val();

      // 入力値の右側の空白(全角)を削除する
      $('#right-trim').val(s.rtrim(st, '　'));
    }
  });

  $('#left-trim').on({

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {
      var st = $('#left-trim').val();

      // 入力値の左側の特定文字を削除する
      $('#left-trim').val(s.ltrim(st, '-_^'));
    }
  });
});
