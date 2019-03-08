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

  describe('UICP01 Bootstrap形式の基本的なボタンが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_BUTTONBASIC;
    var MSG_BOOTSTRAP_BUTTON_BASIC = 'bootstrap_button_basic.';

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
    it('UICP0104 001 ボタンが7つ表示されていることを確認する', function (done) {
      this.timeout(0);

      var buttons = testObj.doc.querySelectorAll('.btn');
      var buttonSubmitStyle = testObj.win.getComputedStyle(buttons[0]).display;
      var inputButtonStyle = testObj.win.getComputedStyle(buttons[1]).display;
      var inputSubmitStyle = testObj.win.getComputedStyle(buttons[2]).display;
      var aStyle = testObj.win.getComputedStyle(buttons[3]).display;
      var inputCheckboxStyle = testObj.win.getComputedStyle(buttons[4]).display;
      var radio1Style = testObj.win.getComputedStyle(buttons[5]).display;
      var radio2Style = testObj.win.getComputedStyle(buttons[6]).display;

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * ■確認項目1　: ボタンが7つ表示されていることを確認する
            * 1)include : displayが「block」である（を含む）こと。
            */
          assert.include(buttonSubmitStyle, 'block', MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.include(inputButtonStyle, 'block', MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.include(inputSubmitStyle, 'block', MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.include(aStyle, 'block', MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.include(inputCheckboxStyle, 'block', MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.include(radio1Style, 'block', MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.include(radio2Style, 'block', MSG_BOOTSTRAP_BUTTON_BASIC);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
