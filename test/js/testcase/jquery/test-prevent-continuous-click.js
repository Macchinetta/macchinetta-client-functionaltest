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

  describe('CTRL04 jQuery形式のボタン2度押し無効化ができること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.PREVENT_CONTINUOUS_CLICK;

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
    it('CTRL0401 001-002 ボタンの2度押しが無効化できる', function (done) {
      this.timeout(0);

      var textBox = testObj.doc.querySelector('input[type=\'text\']');
      var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {

            // 1.テキストボックスに入力して送信ボタンを押下する
            textBox.value = 'Macchinetta';
            textBox.dispatchEvent(m.simulateEvent('input'));
            submitBtn.dispatchEvent(m.simulateEvent('click'));
          }
        },
        {
          fn: function () {

            /**
              * 確認項目1:ボタン押下直後にボタンが非活性化し押下できないことを確認する
              * 1)送信ボタンのdisabled属性がtureであること
              */
            var btnDisabled = submitBtn.disabled;
            assert.isTrue(btnDisabled, 'CTRL0401 001');
          }
        },

        // 2.ボタンが活性化されるまでの時間 2秒待機する
        {
          fn: function () {

            /**
              * 確認項目2:ボタン押下後、一定時間後に活性化し押下できることを確認する
              * 1)送信ボタンのdisabled属性がfalseであること
              */
            var btnDisabled = submitBtn.disabled;
            assert.isFalse(btnDisabled, 'CTRL0401 002');
            done();
          },
          delay: 2100
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
