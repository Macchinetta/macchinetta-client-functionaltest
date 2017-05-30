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

  describe('UICP05 Bootstrap形式のドロップダウンリストが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_DROPDOWNMENU;

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
    it('UICP0502 001-002 ドロップダウンリストが利用できる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.ドロップダウンリストをクリックする
          var dropDwnList = testObj.doc.querySelector('.btn-default');
          dropDwnList.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:ドロップダウンリストが開いていることを確認する
            * 1)ドロップダウンリストの表示状態が'block'であること
            */
          var dropdownmenu = testObj.doc.querySelector('.dropdown-menu');
          var dropdownmenuStyle = testObj.win.getComputedStyle(dropdownmenu).display;
          assert.equal(dropdownmenuStyle, 'block', 'UICP0401 001');
        },
        function () {

          // 1.ドロップダウンリストの一番上の要素(ユーザ情報登録)を選択する
          var dropDwnMenuFirst = testObj.doc.querySelector('.dropdown-menu a:first-child');
          dropDwnMenuFirst.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2:「ユーザ情報登録がクリックされました。」が画面に表示されることを確認する
            * 1)'ユーザ情報登録がクリックされました。'のテキストが表示されること
            */
          var view = testObj.doc.querySelector('p:last-child');
          var viewTextContent = view.textContent;
          assert.equal(viewTextContent, 'ユーザ情報登録がクリックされました。', 'UICP0401 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
