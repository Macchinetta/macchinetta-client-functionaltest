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

  describe('UICP11 jQuery UI形式のオートコンプリートを利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_AUTOCOMPLETE;

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
    it('UICP1101 001-002 オートコンプリートを利用できる', function (done) {
      this.timeout(0);

      var textBox = testObj.doc.querySelector('#jquery-ui-autocomplete-input');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 1.テキストエリアに「l」を入力する
          textBox.value = 'l';
          textBox.dispatchEvent(m.simulateEvent('input'));
        },
        function () {

          /**
            * ■確認項目1:オートコンプリートが表示されることを確認する
            * オートコンプリートの表示状態が'block'であること
            */
          var autoCompView = testObj.doc.querySelector('#ui-id-1');
          var autoCompViewStyle = testObj.win.getComputedStyle(autoCompView).display;
          assert.equal(autoCompViewStyle, 'block', 'UICP1101 001');
        },
        function () {

          // 2.オートコンプリートのlatexをクリックする(↓キーとEnterキーで実現)
          textBox.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: KEY.DOWN
          }));
          textBox.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: KEY.ENTER
          }));
        },
        function () {

          /**
            * ■確認項目2:テキストエリアにlatexが反映されることを確認する
            * 1)テキストボックスの値が'latex'であること
            */
          assert.equal(textBox.value, 'latex');
        },
        function () {
          done();
        }

      //オートコンプリートは各処理の反映に時間がかかるため1000msを指定
      ], 1000);
    });

    // ----------------------- テストケース -----------------------
  });
}());
