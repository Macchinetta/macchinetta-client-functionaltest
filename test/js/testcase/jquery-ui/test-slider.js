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

  describe('UICP08 jQuery UI形式の基本的なスライダーが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_SLIDER;
    var MSG_JQUERY_UI_SLIDER = 'jquery-ui_slider.';

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
    it('UICP0801 001-01 スライダーが表示されること', function (done) {
      this.timeout(0);

      var slider = testObj.doc.querySelector('#slider');
      var sliderStyle = testObj.win.getComputedStyle(slider).display;

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // ■確認項目1 : スライダーが表示されることを確認する。
          assert.equal(sliderStyle, 'block', MSG_JQUERY_UI_SLIDER);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0801 001-02 ハンドルがマウスで操作できること', function (done) {
      this.timeout(0);
      var handle = testObj.doc.querySelector('#slider > span');

      // ドラッグスタートとなる座標を取得
      var startX = handle.getBoundingClientRect().left;
      var startY = handle.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      /**
      * ハンドルを初期位置から5%の位置まで動かす場合の移動幅を20pxとする。
      * これは、スライダー幅が400pxであり、ハンドルを5%分移動させるためである。
      */
      var endX = handle.getBoundingClientRect().left + 20;
      var endY = handle.getBoundingClientRect().top;

      m.executeSequentialWithDelay([

        function () {

          //1.スライダーのハンドルをドラッグする
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

          // ■確認項目1 : ハンドルがマウスで操作できること
          //1)assert.equal : ハンドルの位置が5%の位置にあることを確認する。
          assert.equal(handle.style.left, '5%', MSG_JQUERY_UI_SLIDER);
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
