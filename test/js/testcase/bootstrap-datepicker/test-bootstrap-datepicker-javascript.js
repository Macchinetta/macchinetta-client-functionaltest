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

  describe('UICP10 bootstrap-datepickerを用いたJavaScript形式のカレンダー表示ができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_DATEPICKER_JAVASCRIPT;

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
    it('UICP1008 001-003 bootstrap-datepickerを用いたJavaScript形式のカレンダー表示ができる', function (done) {
      this.timeout(0);
      var calenderView = testObj.doc.querySelector('.datepicker');
      var textBox = testObj.doc.querySelector('input#datepicker');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.初期表示
          /**
            * ■確認項目1:カレンダーが初期表示されていないことを確認する
            * カレンダーの要素が存在していないこと
            */
          assert.isNull(calenderView, 'UICP1008 001');

        },
        function () {

          // 2.テキストエリアをフォーカスする
          textBox.dispatchEvent(m.simulateEvent('focus'));
        },
        function () {

          /**
            * ■確認項目2:カレンダーが表示されること、カレンダー上段中央の年月日の形式が9月2014になっていることを確認する
            * 1)カレンダー要素の表示状態が'block'であること
            * 2)カレンダーの年月表示が'2014年09月'であること
            */
          var calenderDays = testObj.doc.querySelector('.datepicker-days');
          var calenderDaysStyle = testObj.win.getComputedStyle(calenderDays).display;
          assert.equal(calenderDaysStyle, 'block', 'UICP1008 002');
          var titleYearMonth = testObj.doc.querySelector('.datepicker-switch');
          var textYearMonth = titleYearMonth.textContent;
          assert.equal(textYearMonth, '2014年09月', 'UICP1008 002');
        },
        function () {

          // 3.2014年9月10日の日付をクリックする
          var dayBtn = testObj.doc.querySelector('td.active.day ~ td.day');
          dayBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目3:選択した日付がテキストエリアに2014/09/10と設定されること
            * 1)テキストボックスの値が'2014/09/10'であること
            */
          var dateValue = textBox.value;
          assert.equal(dateValue, '2014/09/10', 'UICP1008 003');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
