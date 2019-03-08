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

  describe('UICP02 Bootstrapを用いてマークアップ形式のモーダルダイアログが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_MODAL_MARKUP;

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
    it('UICP0202 001-002 マークアップ形式のモーダルダイアログが利用できる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.モーダルダイアログ表示ボタンを押下する
          var mordalViewBtn = testObj.doc.querySelector('.btn');
          mordalViewBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:モーダルダイアログが開いていることを確認する
            * 1)classNameが'modal in'であること
            * 2)モーダルダイアログの表示状態が'block'であること
            */
          var myModalClassName = testObj.doc.querySelector('#myModal').className;
          assert.equal(myModalClassName, 'modal in', 'UICP0202 001');
          var myModalStyleDdisplay = testObj.doc.querySelector('#myModal').style.display;
          assert.equal(myModalStyleDdisplay, 'block', 'UICP0202 001');
        },
        function () {

          // 2.モーダルダイアログの×ボタンを押下する
          var closeBtn = testObj.doc.querySelector('.close');
          closeBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2:モーダルダイアログが閉じていることを確認する
            * 1)classNameが'modal'であること
            * 2)モーダルダイアログの表示状態が'none'であること
            */
          var myModalClassName = testObj.doc.querySelector('#myModal').className;
          assert.equal(myModalClassName, 'modal', 'UICP0202 002');
          var myModalStyleDdisplay = testObj.doc.querySelector('#myModal').style.display;
          assert.equal(myModalStyleDdisplay, 'none', 'UICP0202 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
