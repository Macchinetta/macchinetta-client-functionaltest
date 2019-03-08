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

  describe('UICP01 jQuery UI形式の基本的なボタンが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_BUTTONBASIC;
    var MSG_JQUERY_UI_BUTTONBASIC = 'jquery-ui_button-basic.';

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
    it('UICP0101 001 ボタンが表示される', function (done) {
      this.timeout(0);

      var buttons = testObj.doc.querySelectorAll('.buttonClass');
      var checkradio = testObj.doc.querySelectorAll('.checkClass');
      var buttonSubmitStyle = testObj.win.getComputedStyle(buttons[0]).display;
      var inputButtonStyle = testObj.win.getComputedStyle(buttons[1]).display;
      var inputSubmitStyle = testObj.win.getComputedStyle(buttons[2]).display;
      var aStyle = testObj.win.getComputedStyle(buttons[3]).display;
      var inputCheckboxStyle = testObj.win.getComputedStyle(checkradio[0]).display;
      var radio1Style = testObj.win.getComputedStyle(checkradio[1]).display;
      var radio2Style = testObj.win.getComputedStyle(checkradio[2]).display;

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * ■確認項目1　: ボタンが7つ表示されていることを確認する
            * 1)include : displayが「block」である（を含む）こと。
            */
          assert.include(buttonSubmitStyle, 'block', MSG_JQUERY_UI_BUTTONBASIC);
          assert.include(inputButtonStyle, 'block', MSG_JQUERY_UI_BUTTONBASIC);
          assert.include(inputSubmitStyle, 'block', MSG_JQUERY_UI_BUTTONBASIC);
          assert.include(aStyle, 'block', MSG_JQUERY_UI_BUTTONBASIC);
          assert.include(inputCheckboxStyle, 'block', MSG_JQUERY_UI_BUTTONBASIC);
          assert.include(radio1Style, 'block', MSG_JQUERY_UI_BUTTONBASIC);
          assert.include(radio2Style, 'block', MSG_JQUERY_UI_BUTTONBASIC);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
