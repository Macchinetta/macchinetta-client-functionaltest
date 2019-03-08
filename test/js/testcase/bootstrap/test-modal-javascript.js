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

  describe('UICP02 Bootstrapを用いてJavaScript形式のモーダルダイアログが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_MODAL_JAVASCRIPT;

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
    it('UICP0203 001-002 JavaScript形式のモーダルダイアログが利用できる(モーダルダイアログの処理終了後に自動で閉じられる)', function (done) {
      this.timeout(0);
      var myModal = testObj.doc.querySelector('#myModal');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {
            var textBox = testObj.doc.querySelector('input[type=\'text\']');

            // 1.テキストボックスに「Macchinetta」と入力する
            textBox.value = 'Macchinetta';
            textBox.dispatchEvent(m.simulateEvent('input'));

            // 2.送信ボタンを押下する
            var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');
            submitBtn.dispatchEvent(m.simulateEvent('click'));
          }
        },
        {
          fn: function () {

            /**
              * ■確認項目1:モーダルダイアログが開いていることを確認する
              * 1)classNameが'modal in'であること
              * 2)モーダルダイアログの表示状態が'block'であること
              */
            var myModalClassName = myModal.className;
            assert.equal(myModalClassName, 'modal in', 'UICP0203 001');
            var myModalStyleDdisplay = myModal.style.display;
            assert.equal(myModalStyleDdisplay, 'block', 'UICP0203 001');
          }
        },

        // 3.モーダルダイアログが閉じられるまで4s待機する
        {
          fn: function () {

            /**
              * ■確認項目2:モーダルダイアログが閉じていることを確認する
              * 1)classNameが'modal'であること
              * 2)モーダルダイアログの表示状態が'none'であること
              */
            var myModalClassName = myModal.className;
            assert.equal(myModalClassName, 'modal', 'UICP0203 002');

            var myModalStyleDdisplay = myModal.style.display;
            assert.equal(myModalStyleDdisplay, 'none', 'UICP0203 002');
            done();
          },
          delay: 4000
        }
      ], 0);
    });

    it('UICP0203 003-004 JavaScript形式のモーダルダイアログが利用できる(キャンセルボタンでモーダルダイアログを閉じられる)', function (done) {
      this.timeout(0);

      var myModal = testObj.doc.querySelector('#myModal');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {
          var textBox = testObj.doc.querySelector('input[type=\'text\']');

          // 1.テキストボックスに「Macchinetta」と入力する
          textBox.value = 'Macchinetta';
          textBox.dispatchEvent(m.simulateEvent('input'));

          // 2.送信ボタンを押下する
          var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');
          submitBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:モーダルダイアログが開いていることを確認する
            * 1)classNameが'modal in'であること
            * 2)モーダルダイアログの表示状態が'block'であること
            */
          var myModalClassName = myModal.className;
          assert.equal(myModalClassName, 'modal in', 'UICP0203 003');
          var myModalStyleDdisplay = myModal.style.display;
          assert.equal(myModalStyleDdisplay, 'block', 'UICP0203 003');
        },
        function () {

          // 3.モーダルダイアログのキャンセルボタンを押下する
          var cancelBtn = testObj.doc.querySelector('#cancel-btn');
          cancelBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2:モーダルダイアログが閉じていることを確認する
            * 1)classNameが'modal'であること
            * 2)モーダルダイアログの表示状態が'none'であること
            */
          var myModalClassName = myModal.className;
          assert.equal(myModalClassName, 'modal', 'UICP0203 004');

          var myModalStyleDdisplay = myModal.style.display;
          assert.equal(myModalStyleDdisplay, 'none', 'UICP0203 004');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
