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

  describe('UICP10 jQuery UI形式でカレンダーに選択不可の休日を設定ができること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_DATEPICKER_HOLIDAY_ADD;
    var MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD = 'jquery-ui_datepicker-holiday.';
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
    it('UICP1003 001 カレンダーに選択不可の休日初期表示状態を確認すること', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-holiday');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));

        },
        function () {

          /**
            * ■確認項目1:テキストボックスを押下した際、カレンダーが表示されることと、設定した日付がハイライトされていることを確認する
            * 1)カレンダーの表示状態が'block'であること
            * 2)背景色が'rgb(255, 192, 203)'であること
            * 3)土曜日のフォントが'rgb(0, 0, 255)'(青)であること
            * 4)日曜日のフォントが'rgb(255, 0, 0)'(赤)であること
            */
          var datePickerDiv = testObj.doc.querySelector('#ui-datepicker-div');
          var datePickerDivDisplay = datePickerDiv.style.display;
          var calenderView0101 = testObj.doc.querySelector('#ui-datepicker-div > table > tbody > ' +
          'tr:nth-child(1) > td.ui-datepicker-days-cell-over.class-holiday > a');
          var calenderView0101Back = testObj.win.getComputedStyle(calenderView0101).backgroundColor;
          var calenderViewSaturday = testObj.doc.querySelector('#ui-datepicker-div > table > tbody > ' +
          'tr:nth-child(1) > td.ui-datepicker-week-end.class-saturday > a');
          var calenderViewSaturdayFont = testObj.win.getComputedStyle(calenderViewSaturday).color;
          var calenderViewSunday = testObj.doc.querySelector('#ui-datepicker-div > table > tbody > ' +
          'tr:nth-child(2) > td.ui-datepicker-week-end.class-sunday > a');
          var calenderViewSundayFont = testObj.win.getComputedStyle(calenderViewSunday).color;
          assert.equal(datePickerDivDisplay, 'block', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
          assert.equal(calenderView0101Back, 'rgb(255, 192, 203)', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
          assert.equal(calenderViewSaturdayFont, 'rgb(0, 0, 255)', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
          assert.equal(calenderViewSundayFont, 'rgb(255, 0, 0)', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);

        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP1003 002 カレンダー非表示状態を確認すること', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-holiday');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));

          // 2.2016/01/01をクリックする
          var calenderView0101 = testObj.doc.querySelector('#ui-datepicker-div > table > tbody > ' +
          'tr:nth-child(1) > td.class-holiday');
          calenderView0101.dispatchEvent(m.simulateEvent('click'));
        },

        function () {

          /**
            * ■確認項目1:日付を選択した際、カレンダーが閉じ、テキストボックスに選択した日付が設定されることを確認する
            * 1)カレンダーの透明度が'0'であること
            * 2)テキストボックスの値が'2016/01/01'であること
            */
          var datePickerDiv = testObj.doc.querySelector('#ui-datepicker-div');
          var datePickerDivOpacity = testObj.win.getComputedStyle(datePickerDiv).opacity;
          var textBoxValue = textBox.value;
          assert.equal(parseInt(datePickerDivOpacity), '0', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
          assert.equal(textBoxValue, '2016/01/01', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP1003 003 選択不可の休日の状態確認(2016/04/01)', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-holiday');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * 1.2016/04/02と入力する
            * テキストボックスが空の状態でフォーカスを当てると、2016年1月の表示となるため、
            * 2016/04/02を入力することで2016年4月のカレンダーを表示して以降の手順を実施するようにしている。
            */
          textBox.value = '2016/04/02';
          textBox.dispatchEvent(m.simulateEvent('input'));

          // 2.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));

          // 3.2016/04/01をクリックする
          var calenderView0401 = testObj.doc.querySelector('#ui-datepicker-div > table > tbody > ' +
          'tr:nth-child(1) > td.ui-datepicker-unselectable.ui-state-disabled.class-holiday');
          calenderView0401.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:選択不可の休日を選択した際、カレンダーが閉じないこと。また、テキストボックスが2016/04/02のままであることを確認する
            * 1)カレンダーの表示状態が'block'であること
            * 2)テキストボックスの値が'2016/04/02'であること
            */
          var datePickerDiv = testObj.doc.querySelector('#ui-datepicker-div');
          var datePickerDivDisplay = datePickerDiv.style.display;
          var textBoxValue = textBox.value;
          assert.equal(datePickerDivDisplay, 'block', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
          assert.equal(textBoxValue, '2016/04/02', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP1003 004 選択可の休日の状態確認(2016/11/03)', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-holiday');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * 1.2016/11/02と入力する
            * テキストボックスが空の状態でフォーカスを当てると、2016年1月の表示となるため、
            * 2016/11/02を入力することで2016年11月のカレンダーを表示して以降の手順を実施するようにしている。
            */
          textBox.value = '2016/11/02';
          textBox.dispatchEvent(m.simulateEvent('input'));

          // 2.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));

          // 3.2016/11/03をクリックする
          var calenderView1103 = testObj.doc.querySelector('#ui-datepicker-div > table > tbody > tr:nth-child(1) > td.class-holiday');
          calenderView1103.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:選択可能な休日を選択した際、カレンダーが閉じること。また、テキストボックスに日付が設定されることを確認する
            * 1)カレンダーの透明度が'0'であること
            * 2)テキストボックスの値が'2016/11/03'であること
            */
          var datePickerDiv = testObj.doc.querySelector('#ui-datepicker-div');
          var datePickerDivOpacity = testObj.win.getComputedStyle(datePickerDiv).opacity;
          var textBoxValue = textBox.value;
          assert.equal(parseInt(datePickerDivOpacity), '0', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
          assert.equal(textBoxValue, '2016/11/03', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP1003 005 選択不可の休日の状態確認(2016/11/23)', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-holiday');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * 1.2016/11/02と入力する
            * テキストボックスが空の状態でフォーカスを当てると、2016年1月の表示となるため、
            * 2016/11/02を入力することで2016年11月のカレンダーを表示して以降の手順を実施するようにしている。
            */
          textBox.value = '2016/11/02';
          textBox.dispatchEvent(m.simulateEvent('input'));

          // 2.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));

          // 3.2016/11/23をクリックする
          var calenderView1123 = testObj.doc.querySelector('#ui-datepicker-div > table > tbody > ' +
          'tr:nth-child(4) > td.ui-datepicker-unselectable.ui-state-disabled.class-holiday');
          calenderView1123.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:選択不可の休日を選択した際、カレンダーが閉じないこと。また、テキストボックスが2016/11/02のままであることを確認する
            * 1)カレンダーの表示状態が'block'であること
            * 2)テキストボックスの値が'2016/11/02'であること
            */
          var datePickerDiv = testObj.doc.querySelector('#ui-datepicker-div');
          var datePickerDivDisplay = datePickerDiv.style.display;
          var textBoxValue = textBox.value;
          assert.equal(datePickerDivDisplay, 'block', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
          assert.equal(textBoxValue, '2016/11/02', MSG_JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
