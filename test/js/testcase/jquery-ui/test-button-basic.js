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

      var buttonSubmit = testObj.doc.querySelector('button');
      var inputButton = testObj.doc.querySelector('input[type=\'button\']');
      var inputSubmit = testObj.doc.querySelector('input[type=\'submit\']');
      var a = testObj.doc.querySelector('a');
      var inputCheckbox = testObj.doc.querySelector('#checkbox1');
      var radio1 = testObj.doc.querySelector('#radio1');
      var radio2 = testObj.doc.querySelector('#radio2');
      var buttonSubmitStyle = testObj.win.getComputedStyle(buttonSubmit).display;
      var inputButtonStyle = testObj.win.getComputedStyle(inputButton).display;
      var inputSubmitStyle = testObj.win.getComputedStyle(inputSubmit).display;
      var aStyle = testObj.win.getComputedStyle(a).display;
      var inputCheckboxStyle = testObj.win.getComputedStyle(inputCheckbox).display;
      var radio1Style = testObj.win.getComputedStyle(radio1).display;
      var radio2Style = testObj.win.getComputedStyle(radio2).display;

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          /**
            * ■確認項目1　: ボタンが生成できることを確認する
            * 1)isNotNull : 画面初期表示した後、各要素が存在することを確認する。
            * 2)equal : 画面要素の内容が正しいかどうかを確認する。
            * 3)expect : classがブラウザによって順番と内容が違うので、containを使用する。
            *            スタイルの中身に「block」があればOK。
            */
          assert.isNotNull(buttonSubmit, MSG_JQUERY_UI_BUTTONBASIC);
          assert.isNotNull(inputButton, MSG_JQUERY_UI_BUTTONBASIC);
          assert.isNotNull(inputSubmit, MSG_JQUERY_UI_BUTTONBASIC);
          assert.isNotNull(a, MSG_JQUERY_UI_BUTTONBASIC);
          assert.isNotNull(inputCheckbox, MSG_JQUERY_UI_BUTTONBASIC);
          assert.isNotNull(radio1, MSG_JQUERY_UI_BUTTONBASIC);
          assert.isNotNull(radio2, MSG_JQUERY_UI_BUTTONBASIC);
          assert.equal(buttonSubmitStyle, 'inline-block', MSG_JQUERY_UI_BUTTONBASIC);
          assert.equal(inputButtonStyle, 'inline-block', MSG_JQUERY_UI_BUTTONBASIC);
          assert.equal(inputSubmitStyle, 'inline-block', MSG_JQUERY_UI_BUTTONBASIC);
          assert.equal(aStyle, 'inline-block', MSG_JQUERY_UI_BUTTONBASIC);
          expect(inputCheckboxStyle, MSG_JQUERY_UI_BUTTONBASIC).to.contain('block');
          expect(radio1Style, MSG_JQUERY_UI_BUTTONBASIC).to.contain('block');
          expect(radio2Style, MSG_JQUERY_UI_BUTTONBASIC).to.contain('block');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
