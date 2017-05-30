/*
 * Copyright(c) 2017 NTT Corporation.
 */
// accordion-collapsible.js

'use strict';

// 全てのパネルが閉じた状態のアコーディオン
$(function () {
  $('#accordion').accordion({
    active: false,
    collapsible: true
  });
});
