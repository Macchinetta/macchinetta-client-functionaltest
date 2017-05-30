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

  describe('CTRL07 moment形式で日付フォーマット変換が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.MOMENT_CONVERT_DATE;
    var MSG_MOMENT_CONVERT_DATE = 'moment-convert-date.';

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
    it('CTRL0701 001 テキストボックスの値が「20170101」になっていることを確認する', function (done) {
      this.timeout(0);

      var date = testObj.doc.querySelector('#date');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // テキストエリアにフォーカスをあてる
          date.dispatchEvent(m.simulateEvent('focus'));

        },

        function () {

          // テキストボックスの値が「20170101」になっていることを確認する
          assert.equal(date.value, '20170101', MSG_MOMENT_CONVERT_DATE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0701 002 テキストボックスの値が「2016/12/31」になっていることを確認する', function (done) {
      this.timeout(0);

      var date = testObj.doc.querySelector('#date');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          date.value = '20161231';
          date.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          date.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「2016/12/31」になっていることを確認する
          assert.equal(date.value, '2016/12/31', MSG_MOMENT_CONVERT_DATE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0701 003 テキストボックスの値が「Invalid date」になっていないことを確認する', function (done) {
      this.timeout(0);

      var date = testObj.doc.querySelector('#date');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          date.value = '2016/12/31';
          date.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          date.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「Invalid date」にならないことを確認する
          assert.equal(date.value, '2016/12/31', MSG_MOMENT_CONVERT_DATE);
          assert.notEqual(date.value, 'Invalid date', MSG_MOMENT_CONVERT_DATE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0701 004 テキストボックスの値が「Invalid date」になっていることを確認する', function (done) {
      this.timeout(0);

      var date = testObj.doc.querySelector('#date');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          date.value = 'aaa';
          date.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          date.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「Invalid date」になっていることを確認する
          assert.equal(date.value, 'Invalid date', MSG_MOMENT_CONVERT_DATE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());