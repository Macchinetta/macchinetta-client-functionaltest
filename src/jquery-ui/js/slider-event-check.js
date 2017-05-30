/*
 * Copyright(c) 2017 NTT Corporation.
 */
// slider-event-check.js

'use strict';

$(function () {
  
  $('#change_button').on('click', function () {
    $('#slider-event').slider('option', 'value', 2);
  });
  
  $('#slider-event').slider({
    
    // 最大値の設定
    max: 2,
    
    // ハンドルが移動する度に発生する関数を設定
    slide: function (event, ui) {
      $('#status').val(document.getElementById('status').value + ', slide');
    },
    
    // ハンドルの移動を始める際に発生する関数を設定
    start: function (event, ui) {
      $('#status').val(document.getElementById('status').value + ', start');
    },
    
    // ハンドルの移動を止める際に発生する関数を設定
    stop: function (event, ui) {
      $('#status').val(document.getElementById('status').value + ', stop');
    },
    
    // ハンドルの値を変更する際に発生する関数を設定
    change: function (event, ui) {
      $('#status').val(document.getElementById('status').value + ', change');
    },
    
    // ハンドルの生成時に発生する関数を設定
    create: function (event, ui) {
      $('#status').val('create');
    },
  });
  
});