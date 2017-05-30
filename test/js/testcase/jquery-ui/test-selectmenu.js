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

  // message用定数定義
  var MSG_JQUERY_UI_SELECTMENU = 'jquery-ui-selectmenu.';

  describe('UICP05 jQuery UI形式のセレクトメニューが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_SELECTMENU;

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
    it('UICP0501 001 セレクトメニューが開くこと', function (done) {

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.セレクトメニューをクリックする
          var dropDwnList = testObj.doc.querySelector('#selectmenu-button > span.ui-icon.ui-icon-triangle-1-s');
          dropDwnList.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目1　: セレクトメニューが開くこと
          //1)assert.equal : selectmenuの表示が「block」になること
          var dropdownmenu = testObj.doc.querySelector('body > div');
          var dropdownmenuStyle = testObj.win.getComputedStyle(dropdownmenu).display;
          assert.equal(dropdownmenuStyle, 'block', MSG_JQUERY_UI_SELECTMENU);
        },
        function () {
          done();
        }
      ], 0);
    });
    it('UICP0501 002 セレクトメニューの切り替えができること', function (done) {
      this.timeout(2500);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.セレクトメニューをクリックする
          var dropDwnList = testObj.doc.querySelector('#selectmenu-button > span.ui-icon.ui-icon-triangle-1-s');
          dropDwnList.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // 2.セレクトメニューから「ユーザ情報編集」を選択する
          var uiID2 = testObj.doc.querySelector('#ui-id-2');
          var selectmenu2 = testObj.doc.querySelector('#selectmenu-button > span.ui-selectmenu-text');
          uiID2.dispatchEvent(m.simulateEvent('click'));
          selectmenu2.textContent = 'ユーザ情報編集';
        },
        function () {

          // ■確認項目1　: セレクトメニューの選択状態が切り替わること
          //1)assert.equal : selectmenuの「ユーザ情報編集」が選択されていること
          var dropdownmenu = testObj.doc.querySelectorAll('#selectmenu-button > span.ui-selectmenu-text');
          assert.equal(dropdownmenu[0].textContent, 'ユーザ情報編集', MSG_JQUERY_UI_SELECTMENU);
        },
        function () {
          done();
        }
      ], 500);
    });

    // ----------------------- テストケース -----------------------
  });
}());
