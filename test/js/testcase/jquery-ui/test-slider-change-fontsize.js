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
    it('UICP0803 001 初期状態を確認すること', function (done) {
      this.timeout(0);
      var font = testObj.doc.querySelector('#font');
      var fontSpan = testObj.doc.querySelector(' #slider-change-fontsize > span');
      var fontSizeDiv = testObj.doc.querySelector('#font-size-div');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          /**
            * ■確認項目1:初期表示の際、ドロップダウンリスト・スライダー・フォントサイズがそれぞれ定義した値になっていることを確認する
            * 1)ドロップダウンリストの値が'8'であること
            * 2)ハンドルの位置が'0%'であること
            * 3)テキストのフォントサイズが'8px'であること
            */
          var fontSpanLeft = fontSpan.style.left;
          var fontSizeDivFont = fontSizeDiv.style.fontSize;
          assert.equal(font.value, '8');
          assert.equal(fontSpanLeft, '0%', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
          assert.equal(fontSizeDivFont, '8px', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0803 002 スライダーのハンドルを一番右まで移動するとの状態確認', function (done) {
      this.timeout(0);
      var span = testObj.doc.querySelector('#slider-change-fontsize > span');
      var fontSizeDiv = testObj.doc.querySelector('#font-size-div');

      // ドラッグスタートとなる座標を取得
      var startX = span.getBoundingClientRect().left;

      // ドロップ対象となる座標を取得
      var endX = span.getBoundingClientRect().left + 380;

      m.executeSequentialWithDelay([

        // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
        function () {
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          //1.スライダーをドラッグする
          var downevent = m.simulateEvent('mousedown', {
            clientX: startX,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientX: endX,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          /**
            * ■確認項目1:スライダーを一番右まで移動した際、ドロップダウンリスト・フォントサイズも連動して値が変わることを確認する
            * 1)ドロップダウンリストの値が'24'であること
            * 2)テキストのフォントサイズが'24px'であること
            */
          var fontValue = testObj.doc.querySelector('#font');
          var fontSizeDivFont = fontSizeDiv.style.fontSize;
          assert.equal(fontValue.value, '24');
          assert.equal(fontSizeDivFont, '24px', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0803 003 ドロップダウンリストのフォントサイズを24ｐxに設定するとの状態確認', function (done) {
      this.timeout(0);
      var font = testObj.doc.querySelector('#font');
      var fontSizeDiv = testObj.doc.querySelector('#font-size-div');
      var fontSpan = testObj.doc.querySelector('#slider-change-fontsize > span');
      m.executeSequentialWithDelay([

        // ドロップダウンリストのフォントサイズを24ｐxに設定する。
        function () {
          font.selectedIndex = 8;
          font.dispatchEvent(m.simulateEvent('change'));
        },
        function () {

          /**
            * ■確認項目1:ドロップダウンリストをっ変更した際、スライダー・フォントサイズも連動して値が変わることを確認する
            * 1)ハンドルの位置が'100%'であること
            * 2)テキストのフォントサイズが'24px'であること
            */
          var fontSizeDivFont = fontSizeDiv.style.fontSize;
          var fontSpanLeft = fontSpan.style.left;
          assert.equal(fontSpanLeft, '100%', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
          assert.equal(fontSizeDivFont, '24px', MSG_JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
