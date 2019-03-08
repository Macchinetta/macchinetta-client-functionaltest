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

  describe('CTRL07 moment形式で時刻フォーマット変換が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.MOMENT_CONVERT_TIME;
    var MSG_MOMENT_CONVERT_TIME = 'moment-convert-time.';

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
    it('CTRL0703 001 テキストボックスの値が「123456」になっていることを確認する', function (done) {
      this.timeout(0);

      var time = testObj.doc.querySelector('#time');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // テキストエリアにフォーカスをあてる
          time.dispatchEvent(m.simulateEvent('focus'));

        },

        function () {

          // テキストボックスの値が「123456」になっていることを確認する
          assert.equal(time.value, '123456', MSG_MOMENT_CONVERT_TIME);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0703 002 テキストボックスの値が「10:20:30」になっていることを確認する', function (done) {
      this.timeout(0);

      var time = testObj.doc.querySelector('#time');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          time.value = '102030';
          time.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          time.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「10:20:30」になっていることを確認する
          assert.equal(time.value, '10:20:30', MSG_MOMENT_CONVERT_TIME);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0703 003 テキストボックスの値が「Invalid date」になっていないことを確認する', function (done) {
      this.timeout(0);

      var time = testObj.doc.querySelector('#time');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          time.value = '10:20:30';
          time.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          time.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「Invalid date」になっていないことを確認する
          assert.equal(time.value, '10:20:30', MSG_MOMENT_CONVERT_TIME);
          assert.notEqual(time.value, 'Invalid date', MSG_MOMENT_CONVERT_TIME);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0703 004 テキストボックスの値が「Invalid date」になっていることを確認する', function (done) {
      this.timeout(0);

      var time = testObj.doc.querySelector('#time');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          time.value = 'aaa';
          time.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          time.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「Invalid date」になっていることを確認する
          assert.equal(time.value, 'Invalid date', MSG_MOMENT_CONVERT_TIME);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());