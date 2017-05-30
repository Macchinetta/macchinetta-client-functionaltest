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
  var expect = chai.expect;
  var testObj = {
    sandboxEl: null,
    win: null,
    doc: null
  };

  describe('UICP10 jQuery UIを用いて選択可能な日付の範囲制御ができること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_DATEPICKER_RANGE;

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
    it('UICP1005 001 入力フォームに反映可能なカレンダーの日付を設定できる', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-range');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.2016/01/12と入力する
          textBox.value = '2016/01/12';
          textBox.dispatchEvent(m.simulateEvent('input'));

          // 2.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));

        },
        function () {

          /**
            * ■確認項目1:2016-01-11が選択可能であることを確認する
            * 1)classNameに'ui-datepicker-unselectable'が含まれていること
            * 2)2016/01/11の要素の透明度が'1'であること
            */
          var calenderView0111 = testObj.doc.querySelector('#ui-datepicker-div tr:nth-child(3) td:nth-child(2)');
          var calenderView0111ClassName = calenderView0111.className;
          expect(calenderView0111ClassName, 'UICP0704 001').to.not.contain('ui-datepicker-unselectable');

          var calenderView0111Opacity = testObj.win.getComputedStyle(calenderView0111).opacity;
          assert.equal(calenderView0111Opacity, '1', 'UICP0704 001');
        },
        function () {

          // 3.2016年1月11日をクリックする
          var calenderView0111 = testObj.doc.querySelector('#ui-datepicker-div tr:nth-child(3) td:nth-child(2)');
          calenderView0111.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2:選択した日付が反映されること
            * 1)テキストボックスの値が'2016/01/11'であること
            */
          var textBoxValue = textBox.value;
          assert.equal(textBoxValue, '2016/01/11', 'UICP0704 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    it('UICP1005 002 入力フォームに反映できないカレンダーの日付を設定できる', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-range');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.2016/01/12と入力する
          textBox.value = '2016/01/12';
          textBox.dispatchEvent(m.simulateEvent('input'));

          // 2.テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));
        },
        function () {

          /**
            * ■確認項目1:2016/01/10が選択不可の状態であることを確認する
            * 1)classNameに'ui-datepicker-unselectable'、'ui-state-disabled'が含まれていること
            * 2)2016/01/11の要素の透明度が'0.35'であること
            */
          var calenderView0110 = testObj.doc.querySelector('#ui-datepicker-div tr:nth-child(3) td:nth-child(1)');
          var calenderView0110ClassName = calenderView0110.className;

          expect(calenderView0110ClassName, 'UICP0705 001').to.contain('ui-datepicker-unselectable');
          expect(calenderView0110ClassName, 'UICP0705 001').to.contain('ui-state-disabled');

          var calenderView0110Opacity = testObj.win.getComputedStyle(calenderView0110).opacity;
          assert.equal(calenderView0110Opacity, '0.35', 'UICP0705 001');
        },
        function () {

          // 3.2016年1月10日をクリックする
          var calenderView0110 = testObj.doc.querySelector('#ui-datepicker-div tr:nth-child(3) td:nth-child(1)');
          calenderView0110.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2:選択した日付が反映されないこと
            * 1)テキストボックスの値が'2016/01/12'のままであること
            */
          var textBoxValue = textBox.value;
          assert.equal(textBoxValue, '2016/01/12', 'UICP0705 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
