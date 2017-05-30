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

  describe('APND02 underscore形式でパディングが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.UNDERSCORE_STRING_PADDING;
    var MSG_UNDERSCORE_STRING_PADDING = 'underscore-string_padding.';

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
    it('APND0203 001 テキストボックスの値が「4560000000」になっていることを確認する', function (done) {
      this.timeout(0);

      var rightPadding = testObj.doc.querySelector('#right-padding');


      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // テキストボックスにフォーカスを当てる
          rightPadding.value = '456';
          rightPadding.dispatchEvent(m.simulateEvent('input'));
          rightPadding.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「4560000000」になっていることを確認する
          assert.equal(rightPadding.value, '4560000000', MSG_UNDERSCORE_STRING_PADDING);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('APND0203 002 テキストボックスの値が「xxxxxxx456」になっていることを確認する', function (done) {
      this.timeout(0);

      var leftPadding = testObj.doc.querySelector('#left-padding');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          leftPadding.value = '456';
          leftPadding.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          leftPadding.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「xxxxxxx456」になっていることを確認する
          assert.equal(leftPadding.value, 'xxxxxxx456', MSG_UNDERSCORE_STRING_PADDING);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());