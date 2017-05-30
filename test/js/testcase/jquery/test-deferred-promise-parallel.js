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

  describe('ASNC01 jQuery形式で非同期処理の待ち合わせが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.DEFERRED_PROMISE_PARALLEL;
    var MSG_DEFERRED_PROMISE_PARALLEL = 'jquery-test-deferred-promise-parallel.';

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
    it('ASNC0105 001 設定した順序で非同期処理が完了すること', function (done) {
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
              * ■確認項目1-1:500ms毎に「Function A が終了しました」、「Function B が終了しました」のメッセージが表示されることを確認する
              * 1)'Function A が終了しました'のメッセージが表示されていること
              */
            var p1 = testObj.doc.querySelector('#deferred-area > p:nth-child(2)');
            assert.equal(p1.textContent, 'Function A が終了しました', MSG_DEFERRED_PROMISE_PARALLEL);
          },
          delay:1000
        },
        {
          fn: function () {

            /**
              * ■確認項目1-2:500ms毎に「Function A が終了しました」、「Function B が終了しました」のメッセージが表示されることを確認する
              * 1)'Function B が終了しました'のメッセージが表示されていること
              */
            var p2 = testObj.doc.querySelector('#deferred-area > p:nth-child(3)');
            assert.equal(p2.textContent, 'Function B が終了しました', MSG_DEFERRED_PROMISE_PARALLEL);
          },
          delay:1500
        },
        {
          fn: function () {

            /**
              * ■確認項目1-3:上記メッセージの表示後、「Function C が終了しました」、「全ての処理が終了しました」のメッセージが表示されることを確認する
              * 1)'Function C が終了しました'のメッセージが表示されていること
              * 2)'全ての処理が終了しました'のメッセージが表示されていること
              */
            var p3 = testObj.doc.querySelector('#deferred-area > p:nth-child(4)');
            var p4 = testObj.doc.querySelector('#deferred-area > p:nth-child(5)');

            assert.equal(p3.textContent, 'Function C が終了しました', MSG_DEFERRED_PROMISE_PARALLEL);
            assert.equal(p4.textContent, '全ての処理が終了しました', MSG_DEFERRED_PROMISE_PARALLEL);
            done();
          },
          delay:2000
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
