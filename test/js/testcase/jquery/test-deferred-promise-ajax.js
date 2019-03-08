/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
/* depends on
 * - consts.js, which define constants
  * - utils.js, which define utility functions
   * - file-path.js, which define file path of sample programs
 * */
'use strict';
(function () {

  // テスト用オブジェクト
  var assert = chai.assert;
  var testObj = {
    sandboxEl: null,
    win: null,
    doc: null
  };

  describe('ASNC01 非同期通信にDeferredを適用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.DEFERRED_PROMISE_AJAX;
    var MSG_DEFERRED_PROMISE_AJAX = 'jquery-deferred-promise-ajax.';

    before('create sandbox', function (done) {
      m.testCommonBefore(done, testObj);
    });

    after('remove sandbox', function (done) {
      m.testCommonAfter(done, testObj);
    });

    beforeEach(function (done) {
      m.testCommonBeforeEach(sampleFileName, done, testObj);
    });

    // ----------------------- テストケース -----------------------
    it('ASNC0105 001 非同期通信の結果に応じてメッセージが表示されること', function (done) {
      this.timeout(0);

      var startButton = testObj.doc.querySelector('#deferred-start');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.「start」ボタンを押下する
          startButton.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:非同期通信の結果に応じてメッセージが表示されることを確認する
            */
          var innerText = testObj.doc.querySelector('#deferred-area').innerText;
          assert.include(innerText, 'data/dataA.jsonの取得に成功しました。', MSG_DEFERRED_PROMISE_AJAX);
          assert.include(innerText, 'data/dataA.jsonの読み込みが成功しました。', MSG_DEFERRED_PROMISE_AJAX);
          assert.include(innerText, 'list1 : リスト1', MSG_DEFERRED_PROMISE_AJAX);
          assert.include(innerText, 'list2 : リスト2', MSG_DEFERRED_PROMISE_AJAX);
          assert.include(innerText, 'list3 : リスト3', MSG_DEFERRED_PROMISE_AJAX);
          assert.include(innerText, 'list4 : リスト4', MSG_DEFERRED_PROMISE_AJAX);
          assert.include(innerText, 'data/dataB_dummy.jsonの取得に失敗しました。', MSG_DEFERRED_PROMISE_AJAX);
          assert.include(innerText, 'data/dataB_dummy.jsonの読み込みに失敗しました。', MSG_DEFERRED_PROMISE_AJAX);
        },
        function () {
          done();
        }
      ], 500);
    });

    // ----------------------- テストケース -----------------------
  });
}());
