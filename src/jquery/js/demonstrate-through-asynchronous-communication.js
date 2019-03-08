/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// demonstrate-through-asynchronous-communication.js

'use strict';

$(function() {

  // ボタン押下を契機に処理を開始する
  $('#executeService').click(function() {
  
    // ボタンを非活性に変更
    $('#executeService').prop('disabled', true);
    
    // 処理中に表示させる文言をフェードイン
    $('#loadingLabel').fadeIn();
    
    // 非同期通信処理の実行
    $(function() {
      $.ajax({
      'type' : 'GET',
      'url' : 'data/dummy-data.json',
      'dataType' : 'json'
      })
      
      .then(function () {
        console.log("成功")
      })

      .catch(function() {
        console.log("失敗")
      })

      .then(function() {
        // 処理完了後にボタンを再度活性化
        $('#executeService').prop('disabled', false);
        
        // 処理中に表示していた文言をフェードアウト
        $('#loadingLabel').fadeOut();
      });
    });
  });
});
