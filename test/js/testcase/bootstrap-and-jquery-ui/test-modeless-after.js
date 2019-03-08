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

  describe('APND01 BootstrapとjQuery UIを同時に使用する際の名前空間の競合を回避できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.MODELESS_AFTER;

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
    it('APND0106 001 BootstrapとjQuery UIを同時に使用する際の名前空間の競合を回避できる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.初期表示
          // "モードレスダイアログ起動ボタン"のエレメントを取得する。
          var modelessLaunch = testObj.doc.querySelector('#modeless-launch');

          // 2.モーダルダイアログ表示ボタンを押下する
          modelessLaunch.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目1
          // モードレスダイアログ-クローズボタンのエレメントを取得する。
          var uiDialogTitlebarClose = testObj.doc.querySelector('.ui-dialog-titlebar-close');

          // モードレスダイアログ-クローズボタンのエレメントに 'span' が含まれていること。
          assert.match(uiDialogTitlebarClose.innerHTML, /span/i, 'APND0106 001');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
