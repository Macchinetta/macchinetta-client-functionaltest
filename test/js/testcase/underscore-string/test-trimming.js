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

  describe('APND02 underscore形式でトリミングが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.UNDERSCORE_STRING_TRIMMING;
    var MSG_UNDERSCORE_STRING_TRIMMING = 'underscore-string_trimming.';

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
    it('APND0204 001 テキストボックスの値が「456」になっていることを確認する', function (done) {
      this.timeout(0);

      var bothTrim = testObj.doc.querySelector('#both-trim');


      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // テキストボックスにフォーカスを当てる
          bothTrim.value = '   456   ';
          bothTrim.dispatchEvent(m.simulateEvent('input'));
          bothTrim.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「456」になっていることを確認する
          assert.equal(bothTrim.value, '456', MSG_UNDERSCORE_STRING_TRIMMING);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('APND0204 002 テキストボックスの値が「　　　456」になっていることを確認する', function (done) {
      this.timeout(0);

      var rightTrim = testObj.doc.querySelector('#right-trim');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          rightTrim.value = '　　　456　　　';
          rightTrim.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          rightTrim.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「　　　456」になっていることを確認する
          assert.equal(rightTrim.value, '　　　456', MSG_UNDERSCORE_STRING_TRIMMING);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('APND0204 003 テキストボックスの値が「456-_^」になっていることを確認する', function (done) {
      this.timeout(0);

      var leftTrim = testObj.doc.querySelector('#left-trim');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          leftTrim.value = '-_^456-_^';
          leftTrim.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          leftTrim.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「456-_^」になっていることを確認する
          assert.equal(leftTrim.value, '456-_^', MSG_UNDERSCORE_STRING_TRIMMING);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());