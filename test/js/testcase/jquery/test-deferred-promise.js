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

  describe('ASNC01 jQuery形式で1秒毎にメッセージを出力（Deferred化）できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.DEFERRED_PROMISE;
    var MSG_DEFERRED_PROMISE = 'jquery-deferred-promise.';

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
    it('ASNC0102 001 1秒毎にメッセージを出力（Deferred化）できること', function (done) {
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
              * ■確認項目1-1:1秒毎に「1、2、3」のメッセージ表示されることを確認する
              * 1)メッセージ「1」が存在すること
              * 2)メッセージ「2」が存在しないこと
              * 3)メッセージ「3」が存在しないこと
              * 4)メッセージ「1」が'1'であること
              */
            var p1 = testObj.doc.querySelector('#deferred-area > p:nth-child(2)');
            var p2 = testObj.doc.querySelector('#deferred-area > p:nth-child(3)');
            var p3 = testObj.doc.querySelector('#deferred-area > p:nth-child(4)');
            assert.isNotNull(p1, MSG_DEFERRED_PROMISE);
            assert.isNull(p2, MSG_DEFERRED_PROMISE);
            assert.isNull(p3, MSG_DEFERRED_PROMISE);
            assert.equal(p1.textContent, '1', MSG_DEFERRED_PROMISE);
          },

          // まれに描画される前に判定されることがあるため100ms遅延させている。
          delay:1100
        },
        {
          fn: function () {

            /**
              * ■確認項目1-2:1秒毎に「1、2、3」のメッセージ表示されることを確認する
              * 1)メッセージ「1」が存在すること
              * 2)メッセージ「2」が存在すること
              * 3)メッセージ「3」が存在しないこと
              * 4)メッセージ「2」が'2'であること
              */
            var p1 = testObj.doc.querySelector('#deferred-area > p:nth-child(2)');
            var p2 = testObj.doc.querySelector('#deferred-area > p:nth-child(3)');
            var p3 = testObj.doc.querySelector('#deferred-area > p:nth-child(4)');
            assert.isNotNull(p1, MSG_DEFERRED_PROMISE);
            assert.isNotNull(p2, MSG_DEFERRED_PROMISE);
            assert.isNull(p3, MSG_DEFERRED_PROMISE);
            assert.equal(p2.textContent, '2', MSG_DEFERRED_PROMISE);
          },
          delay:1000
        },
        {
          fn: function () {

            /**
              * ■確認項目1-3:1秒毎に「1、2、3」のメッセージ表示されることを確認する
              * 1)メッセージ「1」が存在すること
              * 2)メッセージ「2」が存在すること
              * 3)メッセージ「3」が存在すること
              * 4)メッセージ「3」が'3'であること
              */
            var p1 = testObj.doc.querySelector('#deferred-area > p:nth-child(2)');
            var p2 = testObj.doc.querySelector('#deferred-area > p:nth-child(3)');
            var p3 = testObj.doc.querySelector('#deferred-area > p:nth-child(4)');
            assert.isNotNull(p1, MSG_DEFERRED_PROMISE);
            assert.isNotNull(p2, MSG_DEFERRED_PROMISE);
            assert.isNotNull(p3, MSG_DEFERRED_PROMISE);
            assert.equal(p3.textContent, '3', MSG_DEFERRED_PROMISE);
            done();
          },
          delay:1000
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
