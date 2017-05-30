/*
 * Copyright(c) 2017 NTT Corporation.
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

  describe('ASNC01 jQuery形式でAjaxの再利用ができる', function () {

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
    it('ASNC0106 001 非同期通信のコールバック関数が呼び出し順で実行されること', function (done) {
      this.timeout(0);

      var startButton = testObj.doc.querySelector('#deferred-start');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {

            // 1.「start」ボタンを押下する
            startButton.dispatchEvent(m.simulateEvent('click'));
          }

        },
        {
          fn: function () {

            /**
              * ■確認項目1:「function A を実行します。」、「function B を実行します。」のメッセージが表示されることを確認する
              * 1)'function A を実行します。'のメッセージが表示されていること
              * 2)'function B を実行します。'のメッセージが表示されていること
              */
            var p1 = testObj.doc.querySelector('#deferred-area > p:nth-child(2)');
            var p2 = testObj.doc.querySelector('#deferred-area > p:nth-child(3)');
            assert.equal(p1.textContent, 'function A を実行します。', MSG_DEFERRED_PROMISE_AJAX);
            assert.equal(p2.textContent, 'function B を実行します。', MSG_DEFERRED_PROMISE_AJAX);
            done();
          },
          delay:500
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
