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
  var expect = chai.expect;
  var testObj = {
    sandboxEl: null,
    win: null,
    doc: null
  };

  describe('CTRL07 moment形式で日付妥当性チェックが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.MOMENT_CHECK_DATE;
    var MSG_MOMENT_CHECK_DATE = 'moment_check-date.';

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
    it('CTRL0702 001 「/」区切りの日付入力がチェックできること', function (done) {
      this.timeout(0);

      var date = testObj.doc.querySelector('#date');


      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // テキストボックスに「2016/12/31」と入力し、フォーカスを外す
          date.value = '2016/12/31';
          date.dispatchEvent(m.simulateEvent('input'));
          date.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // ■確認項目1: 「/」区切りの日付入力がチェックできること
          // テキストボックスの右側に「入力値は正常です。」の文字列が表示されていることを確認する
          var dateCheck = testObj.doc.querySelector('#date-area > span');
          assert.equal(dateCheck.textContent, '入力値は正常です。', MSG_MOMENT_CHECK_DATE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0702 002 存在しない日付をチェックできること', function (done) {
      this.timeout(0);

      var date = testObj.doc.querySelector('#date');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          date.value = '2017/02/29';
          date.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          date.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // ■確認項目2: 存在しない日付をチェックできること
          // テキストボックスの右側に「入力値に誤りがあります。」の文字列が表示されていることを確認する
          var dateCheck = testObj.doc.querySelector('#date-area > span');
          assert.equal(dateCheck.textContent, '入力値に誤りがあります。', MSG_MOMENT_CHECK_DATE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0702 003 「-」区切りの日付入力をチェックできること', function (done) {

      this.timeout(0);

      var date = testObj.doc.querySelector('#date');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          date.value = '2017-01-01';
          date.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          date.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // ■確認項目3: 「-」区切りの日付入力をチェックできること
          // テキストボックスの右側に「入力値に誤りがあります。」の文字列が表示されていることを確認する
          var dateCheck = testObj.doc.querySelector('#date-area > span');
          expect(dateCheck.textContent, MSG_MOMENT_CHECK_DATE).to.contain('入力値に誤りがあります。');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------

    it('CTRL0702 004 数値以外の文字列をチェックできること', function (done) {
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

          // ■確認項目4: 数値以外の文字列をチェックできること
          // テキストボックスの右側に「入力値に誤りがあります。」の文字列が表示されていることを確認する
          var dateCheck = testObj.doc.querySelector('#date-area > span');
          expect(dateCheck.textContent, MSG_MOMENT_CHECK_DATE).to.contain('入力値に誤りがあります。');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());