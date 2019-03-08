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

  describe('UICP10 jQuery UIを用いて休日設定（背景色・休日選択不可・休日定義）ができること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_DATEPICKER_HOLIDAY;

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
    it('UICP1002 001-002 カレンダーに選択不可の休日を設定できる(休日設定のカレンダー)', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-holiday');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.2016/04/02と入力する
          textBox.value = '2016/04/02';
          textBox.dispatchEvent(m.simulateEvent('input'));

          // 2.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));

        },
        function () {

          /**
            * ■確認項目1:2016-04-01の背景色が休日、選択不可、ラベル名が任意の休日であることを確認する
            * 1)2016-04-01ののclassNameに'class-holiday'、'ui-datepicker-unselectable'が含まれていること
            * 2)2016-04-01のラベル名が'任意の休日'であること
            * 3)2016-04-01の透明度が'0.35'であること
            * 4)2016-04-01の背景色が'rgb(255, 192, 203)'であること
            */
          var calenderView0401 = testObj.doc.querySelector('#ui-datepicker-div td:nth-child(6)');
          var calenderView0401ClassName = calenderView0401.className;
          var calenderView0401Title = calenderView0401.title;

          expect(calenderView0401ClassName, 'UICP1002 001').to.contain('class-holiday');
          expect(calenderView0401ClassName, 'UICP1002 001').to.contain('ui-datepicker-unselectable');
          assert.equal(calenderView0401Title, '任意の休日', 'UICP1002 001');

          var calenderView0401Opacity = testObj.win.getComputedStyle(calenderView0401).opacity;
          assert.equal(calenderView0401Opacity, '0.35', 'UICP1002 001');

          var calenderView0401Span = testObj.doc.querySelector('#ui-datepicker-div td:nth-child(6) span');
          var calenderView0401BgColor = testObj.win.getComputedStyle(calenderView0401Span).backgroundColor;
          assert.equal(calenderView0401BgColor, 'rgb(255, 192, 203)', 'UICP1002 001');
        },
        function () {

          // 3.2016年4月1日をクリックする
          var calenderView0401 = testObj.doc.querySelector('#ui-datepicker-div td:nth-child(6)');
          calenderView0401.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2:テキストエリアに2016/04/01が反映されないことを確認する
            * 1)テキストボックスの値が'2016/04/02'のままであること
            */
          var textBoxValue = textBox.value;
          assert.equal(textBoxValue, '2016/04/02', 'UICP1002 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    it('UICP1002 003-004 カレンダーに選択可の休日を設定できる(休日設定のカレンダー)', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-holiday');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.2016/01/02と入力する
          textBox.value = '2016/01/02';
          textBox.dispatchEvent(m.simulateEvent('input'));

          // 2.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));
        },
        function () {

          /**
            * ■確認項目1:2016-01-01の背景色が休日、選択可能、ラベル名が元旦であることを確認する
            * 1)2016-01-01ののclassNameに'class-holiday'、'ui-datepicker-unselectable'が含まれていること
            * 2)2016-01-01のラベル名が'元日'であること
            * 3)2016-01-01の透明度が'1'であること
            * 4)2016-01-01の背景色が'rgb(255, 192, 203)'であること
            */
          var calenderView0101 = testObj.doc.querySelector('#ui-datepicker-div td:nth-child(6)');
          var calenderView0101ClassName = calenderView0101.className;
          var calenderView0101Title = calenderView0101.title;

          expect(calenderView0101ClassName, 'UICP1002 003').to.contain('class-holiday');
          expect(calenderView0101ClassName, 'UICP1002 003').to.not.contain('ui-datepicker-unselectable');
          assert.equal(calenderView0101Title, '元日', 'UICP1002 003');

          var calenderView0101Span = testObj.doc.querySelector('#ui-datepicker-div td:nth-child(6) a');
          var calenderView0101Opacity = testObj.win.getComputedStyle(calenderView0101Span).opacity;
          assert.equal(calenderView0101Opacity, '1', 'UICP1002 003');
          var calenderView0101BgColor = testObj.win.getComputedStyle(calenderView0101Span).backgroundColor;
          assert.equal(calenderView0101BgColor, 'rgb(255, 192, 203)', 'UICP1002 003');

        },
        function () {

          // 3.2016年1月1日をクリックする
          var calenderView0101 = testObj.doc.querySelector('#ui-datepicker-div td:nth-child(6)');
          calenderView0101.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2:テキストエリアに2016/01/01が反映されることを確認する
            * 1)テキストボックスの値が'2016/01/01'であること
            */
          var textBoxValue = textBox.value;
          assert.equal(textBoxValue, '2016/01/01', 'UICP1002 004');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
