/*
 * Copyright(c) 2017 NTT Corporation.
 */
/*
 * 共通js。
 */
'use strict';
window.m = {
  /**
   * 指定したパスを新規画面で開く。
   * @param {string} path 新規画面で開くパス
   */
  openNewWindow: function (path) {
    window.open(path, '_blank', 'width=800, height=800, scrollbars=yes, resizable');
  }

};