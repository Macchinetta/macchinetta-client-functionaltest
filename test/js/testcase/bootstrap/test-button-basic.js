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
      var buttonSubmit = testObj.doc.querySelector('button[type=\'submit\']');
      var inputButton = testObj.doc.querySelector('input[type=\'button\']');
      var inputSubmit = testObj.doc.querySelector('input[type=\'submit\']');
      var a = testObj.doc.querySelector('a');
      var inputCheckbox = testObj.doc.querySelector('input[type=\'checkbox\']');
      var radio1 = testObj.doc.querySelector('#radio1');
      var radio2 = testObj.doc.querySelector('#radio2');
      var buttonSubmitStyle = testObj.win.getComputedStyle(buttonSubmit).display;
      var inputButtonStyle = testObj.win.getComputedStyle(inputButton).display;
      var inputSubmitStyle = testObj.win.getComputedStyle(inputSubmit).display;
      var aStyle = testObj.win.getComputedStyle(a).display;
      var inputCheckboxStyle = testObj.win.getComputedStyle(inputCheckbox).display;
      var radio1Style = testObj.win.getComputedStyle(radio1).display;
      var radio2Style = testObj.win.getComputedStyle(radio2).display;
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
          * ■確認項目1　: ボタンが生成できることを確認する
          * 1)isNotNull : 画面初期表示した後、各要素が存在することを確認する。
          * 2)equal : 画面要素の内容が正しいかどうかを確認する。
          * 3)expect : classがブラウザによって順番と内容が違うので、containを使用する。
          *            スタイルの中身が「block」であればOK。
          */
          assert.isNotNull(buttonSubmit, MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.isNotNull(inputButton, MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.isNotNull(inputSubmit, MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.isNotNull(a, MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.isNotNull(inputCheckbox, MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.isNotNull(radio1, MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.isNotNull(radio2, MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.equal(buttonSubmit.className, 'btn btn-default', MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.equal(buttonSubmitStyle, 'inline-block', MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.equal(inputButtonStyle, 'inline-block', MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.equal(inputSubmitStyle, 'inline-block', MSG_BOOTSTRAP_BUTTON_BASIC);
          assert.equal(aStyle, 'inline-block', MSG_BOOTSTRAP_BUTTON_BASIC);
          expect(inputCheckboxStyle, MSG_BOOTSTRAP_BUTTON_BASIC).to.contain('block');
          expect(radio1Style, MSG_BOOTSTRAP_BUTTON_BASIC).to.contain('block');
          expect(radio2Style, MSG_BOOTSTRAP_BUTTON_BASIC).to.contain('block');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
