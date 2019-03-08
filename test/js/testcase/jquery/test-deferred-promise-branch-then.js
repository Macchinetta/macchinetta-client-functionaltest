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

  describe('ASNC01 非同期処理のエラーハンドリングが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.DEFERRED_PROMISE_BRANCH_THEN;
    var MSG_DEFERRED_PROMISE_BRANCH_THEN = 'jquery-deferred-promise-branch-then.';

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
    it('ASNC0103 001 catchを利用したエラーハンドリングができること', function (done) {
      this.timeout(0);

      var startButton = testObj.doc.querySelector('#deferred-start');

      // テスト実行

      m.executeSequentialWithDelay([
        function () {
          for (var j = 0;j <= 100; j++) {

            // 1.「開始」ボタンを押下する
            startButton.dispatchEvent(m.simulateEvent('click'));
          }
        },
        function () {

          // ■確認項目1:「resolveが実行されました。成功です。」と「rejectが実行されました。失敗です。」のメッセージが表示されることを確認する
          var resolveStatus = false;
          var rejectStatus = false;
          var div = testObj.doc.querySelector('#deferred-area');
          for (var i = 0; i < div.childElementCount; i++) {
            var pv = div.children[i].textContent;
            if (pv === 'resolveが実行されました。成功です。') {
              resolveStatus = true;
            } else if (pv === 'rejectが実行されました。失敗です。') {
              rejectStatus = true;
            }

            /**
              * isTrue : 成功時と失敗時のメッセージが表示されること。
              * isFalse : 100回以内に(または何らかのエラーで)成功時と失敗時のメッセージを確認できなければ失敗とする。
              */
            if (resolveStatus && rejectStatus) {
              assert.isTrue(true, MSG_DEFERRED_PROMISE_BRANCH_THEN);

              // 成功時と失敗時のメッセージを確認できたらループを抜ける
              break;
            } else if (i === div.childElementCount - 1 && !(resolveStatus && rejectStatus)) {
              assert.isFalse(true, MSG_DEFERRED_PROMISE_BRANCH_THEN);
            }
          }
        },
        function () {
          done();
        }
      ], 2000);
    });

    // ----------------------- テストケース -----------------------
  });
}());
