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
  var MSG_PREVENT_CONTINUOUS_CLICK_FOR_A = 'jquery-prevent-continuous-click-for-a.';

  describe('CTRL04 jQuery形式のリンク2度押し無効化ができること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.PREVENT_CONTINUOUS_CLICK_FOR_A;

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
    it('CTRL0402 001 リンクの2度押しが無効化できる', function (done) {

      var link = testObj.doc.getElementById('sample');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // リンクを押下する
          link.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目1 : テキストボックスの値が「クリックされました。」になることを確認する。
          //1)equal : テキストボックスの値が「クリックされました。」になること。
          var status = testObj.doc.getElementById('status');
          assert.equal(status.value, 'クリックされました。', MSG_PREVENT_CONTINUOUS_CLICK_FOR_A);
        },
        function () {

          // 再度リンクを押下する
          link.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目2 : テキストボックスの値が「クリック無効です。」になることを確認する。
          //1)equal : テキストボックスの値が「クリック無効です。」になること。
          var status = testObj.doc.getElementById('status');
          assert.equal(status.value, 'クリック無効です。', MSG_PREVENT_CONTINUOUS_CLICK_FOR_A);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
