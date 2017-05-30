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

  // message用定数定義
  var MSG_DEMONSTRATE_THROUGH_ASYNCHRONOUS_COMMUNICATION = 'jquery-demonstrate-through-asynchronous-communication.';

  describe('CTRL04 jQuery形式の非同期通信が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.DEMONSTRATE_THROUGH_ASYNCHRONOUS_COMMUNICATION;

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
    it('CTRL0403 001 Loading…と表示された後、表示が消えること', function (done) {

      var executeService = testObj.doc.querySelector('#executeService');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {

            // リンクを押下する
            executeService.dispatchEvent(m.simulateEvent('click'));
          }
        },
        {
          fn: function () {

            // ■確認項目1 : Loading…と表示されたことを確認する。
            var loadingLabel = testObj.doc.querySelector('#loadingLabel');
            assert.equal(loadingLabel.style.opacity > 0, true, MSG_DEMONSTRATE_THROUGH_ASYNCHRONOUS_COMMUNICATION);
            assert.equal(testObj.win.getComputedStyle(loadingLabel).display, 'inline', MSG_DEMONSTRATE_THROUGH_ASYNCHRONOUS_COMMUNICATION);
          },
          delay: 260
        },
        {
          fn: function () {

            // 表示が消えることを確認する
            var loadingLabel = testObj.doc.querySelector('#loadingLabel');
            assert.equal(loadingLabel.style.display, 'none', MSG_DEMONSTRATE_THROUGH_ASYNCHRONOUS_COMMUNICATION);
            done();
          },
          delay: 1000
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
