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

  describe('APND02 underscore形式で数値フォーマット変換が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.UNDERSCORE_STRING_CONVERT_NUMBER;
    var MSG_UNDERSCORE_STRING_CONVERT_NUMBER = 'underscore-string_convert-number.';

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
    it('APND0202 001 テキストボックスの値が「10000000」になっていることを確認する', function (done) {
      this.timeout(0);

      var number = testObj.doc.querySelector('#number');


      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // テキストボックスにフォーカスを当てる
          number.dispatchEvent(m.simulateEvent('focus'));

        },

        function () {

          // テキストボックスの値が「10000000」になっていることを確認する
          assert.equal(number.value, '10000000', MSG_UNDERSCORE_STRING_CONVERT_NUMBER);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('APND0202 002 テキストボックスの値が「12,345,678」になっていることを確認する', function (done) {
      this.timeout(0);

      var number = testObj.doc.querySelector('#number');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          number.value = '12345678';
          number.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          number.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「12,345,678」になっていることを確認する
          assert.equal(number.value, '12,345,678', MSG_UNDERSCORE_STRING_CONVERT_NUMBER);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());