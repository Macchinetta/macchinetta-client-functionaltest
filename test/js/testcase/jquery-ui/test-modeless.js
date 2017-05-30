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
  var testObj = {
    sandboxEl: null,
    win: null,
    doc: null
  };

  describe('UICP03 jQuery UI形式のモードレスダイアログが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UIMODELESS;

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
    it('UICP0301 001-003 モードレスダイアログが利用できる', function (done) {
      this.timeout(0);

      // UIダイアログ
      var uiDialog = testObj.doc.querySelector('.ui-dialog');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.初期表示
          /**
            * ■確認項目1:モードレスダイアログが開いていないことを確認する
            * 1)ダイアログの表示状態が'none'であること
            */
          var uiDialogStyleDdisplay = uiDialog.style.display;
          assert.equal(uiDialogStyleDdisplay, 'none', 'UICP0201 001');
        },
        function () {
          var launchBtn = testObj.doc.querySelector('#modeless-launch');

          // 1.モードレスダイアログ起動ボタンを押下する
          launchBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:モードレスダイアログが開いていることを確認する
            * 1)ダイアログの表示状態が'block'であること
            * 2)ダイアログのタイトルが'タイトル'であること
            */
          var uiDialogStyleDdisplay = uiDialog.style.display;
          assert.equal(uiDialogStyleDdisplay, 'block', 'UICP0201 002');
          var uiDialogTitleTextContent = testObj.doc.querySelector('#ui-id-1').textContent;
          assert.equal(uiDialogTitleTextContent, 'タイトル', 'UICP0201 002');
        },
        function () {
          var closeBtn = testObj.doc.querySelector('.ui-button-icon-primary');

          // 2.モードレスダイアログの×ボタンを押下する
          closeBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目3:モードレスダイアログが開いていないことを確認する
            * 1)ダイアログの表示状態が'none'であること
            */
          var uiDialogStyleDdisplay = uiDialog.style.display;
          assert.equal(uiDialogStyleDdisplay, 'none', 'UICP0201 003');
        },
        function () {
          done();
        }
      ], 1000);
    });

    // ----------------------- テストケース -----------------------
  });
}());
