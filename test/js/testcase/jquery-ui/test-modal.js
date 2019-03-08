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

  describe('UICP02 jQuery UI形式のモーダルダイアログが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_MODAL;
    var MSG_JQUERY_UI_MODAL = 'jquery-ui-modal.';

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
    it('UICP0201 001 モーダルダイアログが利用できる(モーダルダイアログの処理終了後に自動で閉じられる)', function (done) {
      this.timeout(0);
      var myModal = testObj.doc.querySelector('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-draggable.ui-resizable');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {
            var textBox = testObj.doc.querySelector('input[type=\'text\']');

            // 1.テキストボックスに「Macchinetta」と入力する
            textBox.value = 'Macchinetta';
            textBox.dispatchEvent(m.simulateEvent('input'));

            // 2.sendボタンを押下する
            var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');
            submitBtn.dispatchEvent(m.simulateEvent('click'));
          },
          delay: 1000
        },
        {
          fn: function () {

            // ■確認項目1
            // ダイアログが表示されることを確認する。
            var myModalStyleDisplay = testObj.win.getComputedStyle(myModal).display;
            assert.equal(myModalStyleDisplay, 'block', MSG_JQUERY_UI_MODAL);
          },
          delay: 100
        },

        // 3.モーダルダイアログが閉じられるまで4s待機する
        {
          fn: function () {

            // ■確認項目2
            // ダイアログが表示されないことを確認する。
            var myModalStyleDisplay = testObj.win.getComputedStyle(myModal).display;
            assert.equal(myModalStyleDisplay, 'none', MSG_JQUERY_UI_MODAL);
            done();
          },
          delay: 4000
        }
      ], 0);
    });

    it('UICP0201 002 モーダルダイアログが利用できる(キャンセルボタンでモーダルダイアログを閉じられる)', function (done) {
      this.timeout(0);

      var myModal = testObj.doc.querySelector('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-draggable.ui-resizable');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {
          var textBox = testObj.doc.querySelector('input[type=\'text\']');

          // 1.テキストボックスに「Macchinetta」と入力する
          textBox.value = 'Macchinetta';
          textBox.dispatchEvent(m.simulateEvent('input'));

          // 2.sendボタンを押下する
          var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');
          submitBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目1
          // ダイアログが表示されることを確認する。
          var myModalClassName = myModal.className;
          assert.equal(
            myModalClassName,
            'ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-draggable ui-resizable',
            MSG_JQUERY_UI_MODAL);
          var myModalStyleDisplay = testObj.win.getComputedStyle(myModal).display;
          assert.equal(myModalStyleDisplay, 'block', MSG_JQUERY_UI_MODAL);
        },
        function () {

          // 3.モーダルダイアログのcancelボタンを押下する
          var cancelBtn = testObj.doc.querySelector('#cancel-btn');
          cancelBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目2
          // ダイアログが表示されないことを確認する。

          var myModalStyleDisplay = testObj.win.getComputedStyle(myModal).display;
          assert.equal(myModalStyleDisplay, 'none', MSG_JQUERY_UI_MODAL);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());