/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// disable-input-select-element.js
'use strict';

window.onload = function () {

  // Ctrl + c 操作を変更
  Mousetrap.bind('ctrl+c', function () {

    // 無効化
    return false;
  });

  // Ctrl + v 操作を変更
  Mousetrap.bind('ctrl+v', function () {

    // 無効化
    return false;
  });

  // Ctrl + s 操作を変更
  Mousetrap.bind('ctrl+s', function () {
    // フォーカスが  #input3 にある場合のみ処理を変更
    if (document.activeElement.id === 'input3') {
      document.getElementById('input-target').value = 'change';
      return false;
    }
    // フォーカスが select3 にある場合のみ処理を変更
    else if (document.activeElement.id === 'select3') {
      document.getElementById('select-target').value = 'change';
      return false;
    }

    return true;
  });

};