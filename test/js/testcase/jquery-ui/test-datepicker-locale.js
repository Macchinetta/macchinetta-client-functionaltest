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

  describe('UICP10 jQuery UIを用いてカレンダーのロケール設定ができること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_DATEPICKER_LOCALE;

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
    it('UICP1006 001-002 カレンダーのロケールにen-GBを設定できる', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-localize-en-GB');

      // 試験日
      var today = new Date();
      var year = today.getFullYear();
      var month = ('00' + (today.getMonth() + 1)).slice(-2);
      var date = ('00' + today.getDate()).slice(-2);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));
        },
        function () {

          /**
            * ■確認項目1:カレンダーの日付がen-GBのロケール設定であることを確認する
            * 1)月曜日のタイトルが'Mo'であること
            */
          var calenderViewFirst = testObj.doc.querySelector('.ui-datepicker-calendar th:nth-child(1) span');
          var calenderViewFirstText = calenderViewFirst.textContent;
          assert.equal(calenderViewFirstText, 'Mo', 'UICP1006 001');
        },
        function () {

          // 2.カレンダーの試験実施日をクリックする
          var calenderToday = testObj.doc.querySelector('.ui-datepicker-today');
          calenderToday.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2:テキストエリアに反映された日付のフォーマットがDD/MM/YYYYであることを確認する
            * 1)試験日の日付がDD/MM/YYYY形式でテキストボックスに反映されること
            */
          var textBoxValue = textBox.value;
          var todayStr = date + '/' + month + '/' + year;
          assert.equal(textBoxValue, todayStr, 'UICP1006 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    it('UICP1006 003-004 カレンダーのロケールにjpを設定できる', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-localize-ja');

      // 試験日
      var today = new Date();
      var year = today.getFullYear();
      var month = ('00' + (today.getMonth() + 1)).slice(-2);
      var date = ('00' + today.getDate()).slice(-2);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));
        },
        function () {

          /**
            * ■確認項目1:カレンダーの日付がen-GBのロケール設定であることを確認する
            * 1)月のタイトルが'～月'（試験日の月）であること
            */
          var japaneseMonth = (today.getMonth() + 1) + '月';
          var monthTextContent = testObj.doc.querySelector('.ui-datepicker-month').textContent;
          assert.equal(monthTextContent, japaneseMonth, 'UICP1006 003');
        },
        function () {

          // 2.カレンダーの試験実施日をクリックする
          var calenderToday = testObj.doc.querySelector('.ui-datepicker-today');
          calenderToday.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2:テキストエリアに反映された日付のフォーマットがDD/MM/YYYYであることを確認する
            * 1)試験日の日付がDD/MM/YYYY形式でテキストボックスに反映されること
            */
          var textBoxValue = textBox.value;
          var todayStr = year + '/' + month + '/' + date;
          assert.equal(textBoxValue, todayStr, 'UICP1006 004');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
