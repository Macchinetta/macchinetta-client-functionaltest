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

  describe('UICP08 jQuery UI形式でスライダーイベントを利用した他部品との連動が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_SLIDER_CHANGE_FONTSIZE;
    var MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE = 'jquery-ui_slider-change-fontsize.';

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
    it('UICP0803 001 初期表示の際、ドロップダウンリスト・スライダー・フォントサイズがそれぞれ定義した値になっていること', function (done) {
      this.timeout(0);
      var dropdown = testObj.doc.querySelector('#font');
      var handle = testObj.doc.querySelector(' #slider-change-fontsize > span');
      var fontSizeExample = testObj.doc.querySelector('#font-size-div');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          /**
            * ■確認項目1:初期表示の際、ドロップダウンリスト・スライダー・フォントサイズがそれぞれ定義した値になっていることを確認する
            * 1)ドロップダウンリストの値が'10'であること
            * 2)ハンドルの位置が'0%'であること
            * 3)テキストのフォントサイズが'10px'であること
            */
          var handleLeft = handle.style.left;
          var fontSize = fontSizeExample.style.fontSize;
          assert.equal(dropdown.value, '10', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
          assert.equal(handleLeft, '0%', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
          assert.equal(fontSize, '10px', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0803 002 スライダーを一番右まで移動した際、ドロップダウンリスト・フォントサイズも連動して値が変わること', function (done) {
      this.timeout(0);
      var dropdown = testObj.doc.querySelector('#font');
      var handle = testObj.doc.querySelector('#slider-change-fontsize > span');
      var fontSizeExample = testObj.doc.querySelector('#font-size-div');

      // ドラッグスタートとなる座標を取得
      var startX = handle.getBoundingClientRect().left;
      var startY = handle.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      /**
      * ハンドルを初期位置から一番右まで動かす場合の移動幅を400pxとする。
      * これは、スライダー幅が400pxであり、ハンドルの初期位置が一番左にあるためである。
      */
      var endX = handle.getBoundingClientRect().left + 400;
      var endY = handle.getBoundingClientRect().top;

      m.executeSequentialWithDelay([

        function () {

          //1.スライダーをドラッグする
          var downevent = m.simulateEvent('mousedown', {
            pageX: startX,
            pageY: startY,
            which: 1
          });
          handle.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            pageX: endX,
            pageY: endY,
            which: 1
          });
          handle.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          handle.dispatchEvent(mouseup);
        },
        function () {

          /**
            * ■確認項目1:スライダーを一番右まで移動した際、ドロップダウンリスト・フォントサイズも連動して値が変わることを確認する
            * 1)ドロップダウンリストの値が'24'であること
            * 2)ハンドルの位置が'100%'であること
            * 3)テキストのフォントサイズが'24px'であること
            */
          var handleLeft = handle.style.left;
          var fontSize = fontSizeExample.style.fontSize;
          assert.equal(dropdown.value, '24', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
          assert.equal(handleLeft, '100%', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
          assert.equal(fontSize, '24px', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0803 003 ドロップダウンリストを変更した際、スライダー・フォントサイズも連動して値が変わること', function (done) {
      this.timeout(0);
      var dropdown = testObj.doc.querySelector('#font');
      var handle = testObj.doc.querySelector('#slider-change-fontsize > span');
      var fontSizeExample = testObj.doc.querySelector('#font-size-div');

      m.executeSequentialWithDelay([

        // ドロップダウンリストのフォントサイズを24ｐxに設定する。
        function () {
          dropdown.selectedIndex = 7;
          dropdown.dispatchEvent(m.simulateEvent('change'));
        },
        function () {

          /**
            * ■確認項目1:ドロップダウンリストをっ変更した際、スライダー・フォントサイズも連動して値が変わることを確認する
            * 1)ドロップダウンリストの値が'24'であること
            * 2)ハンドルの位置が'100%'であること
            * 3)テキストのフォントサイズが'24px'であること
            */
          var handleLeft = handle.style.left;
          var fontSize = fontSizeExample.style.fontSize;
          assert.equal(dropdown.value, '24', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
          assert.equal(handleLeft, '100%', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
          assert.equal(fontSize, '24px', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
