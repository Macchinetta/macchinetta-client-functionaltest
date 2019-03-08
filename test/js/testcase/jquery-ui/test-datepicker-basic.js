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

  describe('UICP10 jQuery UI形式の基本的なカレンダーが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_DATEPICKER_BASIC;

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
    it('UICP1001 001-003 カレンダーで選択した日付を取得できる(基本的な使用方法のカレンダー)', function (done) {
      this.timeout(0);

      var calenderView = testObj.doc.querySelector('#ui-datepicker-div');
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.初期表示
          /**
            * ■確認項目1:カレンダーが初期表示されていないことを確認する
            * 1)カレンダーの表示状態が'none'であること
            */
          var calenderViewStyle = testObj.win.getComputedStyle(calenderView).display;
          assert.equal(calenderViewStyle, 'none', 'UICP1001 001');
        },
        function () {

          // 2.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));
        },
        function () {

          /**
            * ■確認項目2:カレンダーがポップアップ表示されることを確認する
            * 1)カレンダーの表示状態が'block'であること
            */
          var calenderViewStyle = testObj.win.getComputedStyle(calenderView).display;
          assert.equal(calenderViewStyle, 'block', 'UICP1001 002');
        },
        function () {

          // 3.カレンダーの試験実施日をクリックする
          var calenderToday = testObj.doc.querySelector('.ui-datepicker-today');
          calenderToday.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目3:テキストエリアに選択した日付が反映されることを確認する
            * 1)テキストボックスの値が試験実施日の日付であること
            */
          var textBoxValue = textBox.value;
          var today = new Date();
          var year = today.getFullYear();
          var month = ('00' + (today.getMonth() + 1)).slice(-2);
          var date = ('00' + today.getDate()).slice(-2);
          var todayStr = year + '/' + month + '/' + date;
          assert.equal(textBoxValue, todayStr, 'UICP1001 003');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
