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

  describe('ASNC01 jQuery形式でコールバックの切り替え（done・fail）が利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.DEFERRED_PROMISE_BRANCH_DONE;
    var MSG_DEFERRED_PROMISE_BRANCH_DONE = 'jquery-deferred-promise-branch-done.';

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
    it('ASNC0104 001 done・failを利用してコールバックの切り替えができること', function (done) {
      this.timeout(0);

      var startButton = testObj.doc.querySelector('#deferred-start');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {

            for (var j = 0;j <= 100; j++) {

              // 1.「開始」ボタンを押下する
              startButton.dispatchEvent(m.simulateEvent('click'));

            }
          }

        },
        {
          fn: function () {

            // ■確認項目1:「成功」と「失敗」のメッセージが表示されることを確認する
            var trueFlag = false;
            var falseFlag = false;
            var div = testObj.doc.querySelector('#deferred-area');
            for (var i = 0; i < div.childElementCount; i++) {
              var pv = div.children[i].textContent;
              if (pv === '成功' || pv === '失敗') {
                if (pv === '成功') {
                  trueFlag = true;
                } else {
                  falseFlag = true;
                }
              }
            }
            if (trueFlag && falseFlag) {
              assert.isTrue(true, MSG_DEFERRED_PROMISE_BRANCH_DONE);
              done();
            } else {
              console.log('random values are all true/false.');
              throw new Error('random values are all true/false,please try again.');
            }
          },
          delay:3000
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());