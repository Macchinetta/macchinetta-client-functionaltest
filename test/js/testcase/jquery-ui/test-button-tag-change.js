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

  describe('UICP01 jQuery UI形式のspan要素やdiv要素でのボタンが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_BUTTON_TAG_CHANGE;
    var MSG_JQUERY_UI_BUTTON_TAG_CHANGE = 'jquery_ui_button_tag_change.';

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
    it('UICP0103 001 ボタンが4つ表示されていることを確認する', function (done) {
      this.timeout(0);

      var divspans = testObj.doc.querySelectorAll('.buttonClass');
      var div1Style = testObj.win.getComputedStyle(divspans[0]).display;
      var span1Style = testObj.win.getComputedStyle(divspans[1]).display;
      var div2Style = testObj.win.getComputedStyle(divspans[2]).display;
      var span2Style = testObj.win.getComputedStyle(divspans[3]).display;

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * ■確認項目1　: ボタンが4つ表示されていることを確認する。
            * 1)include : displayが「block」である（を含む）こと。
            */
          assert.include(div1Style, 'block', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.include(span1Style, 'block', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.include(div2Style, 'block', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.include(span2Style, 'block', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
