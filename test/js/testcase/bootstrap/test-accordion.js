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

  describe('UICP06 Bootstrap形式のアコーディオンが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_ACCORDION;

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
    it('UICP0604 001-003 アコーディオンが利用できる', function (done) {
      this.timeout(0);

      var accordionHeader = testObj.doc.querySelector('a');
      var accordionBody = testObj.doc.querySelector('#collapse1');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 1.初期表示
          /**
            * ■確認項目1-1:アコーディオンのヘッダー#1が選択されていないことを確認する
            * 1)classNameが'collapse'であること
            * ■確認項目1-2:アコーディオンのヘッダー#1に紐づくパネルが開いていないことを確認する
            * 2)パネルの高さが'0'であること
            */
          var accordionBodyClassName = accordionBody.className;
          assert.equal(accordionBodyClassName, 'collapse', 'UICP0501 001');
          var accordionBodyClientHeight = accordionBody.clientHeight;
          assert.equal(accordionBodyClientHeight, '0', 'UICP0501 001');
        },
        function () {

          // 2.ヘッダー#１のリンクをクリックし、アコーディオンの内容を開く
          accordionHeader.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2-1:アコーディオンのヘッダー#1が選択されていることを確認する
            * 1)classNameが'collapse in'であること
            * ■確認項目2-2:アコーディオンのヘッダー#1に紐づくパネルが開いることを確認する
            * 2)パネルの高さが'50'であること
            */
          var accordionBodyClassName = accordionBody.className;
          assert.equal(accordionBodyClassName, 'collapse in', 'UICP0501 002');
          var accordionBodyClientHeight = accordionBody.clientHeight;
          assert.equal(accordionBodyClientHeight, '50', 'UICP0501 002');
        },
        function () {

          // 3.ヘッダー#1のリンクをクリックし、アコーディオンの内容を閉じる
          accordionHeader.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目3-1:アコーディオンのヘッダー#1が選択されていないことを確認する
            * 1)classNameが'collapse'であること
            * ■確認項目3-2:アコーディオンのヘッダー#1に紐づくパネルが開いていないことを確認する
            * 2)パネルの高さが'0'であること
            */
          var accordionBodyClassName = accordionBody.className;
          assert.equal(accordionBodyClassName, 'collapse', 'UICP0501 003');
          var accordionBodyClientHeight = accordionBody.clientHeight;
          assert.equal(accordionBodyClientHeight, '0', 'UICP0501 003');
        },
        function () {
          done();
        }

      //アコーディオンは各処理の反映に時間がかかるため500msを指定
      ], 500);
    });

    // ----------------------- テストケース -----------------------
  });
}());
