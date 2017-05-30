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

          /**
            * スライダーが表示されることを確認する。
            *
            */
          assert.isNotNull(slider, MSG_JQUERY_UI_SLIDER);
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
      var span = testObj.doc.querySelector('#slider > span');

      // ドラッグスタートとなる座標を取得
      var startX = span.getBoundingClientRect().left;

      // ドロップ対象となる座標を取得
      var endX = span.getBoundingClientRect().left + 20;

      m.executeSequentialWithDelay([

        // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
        function () {
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          //1.ドラッグする要素spanをドラッグする
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

          // ■確認項目2 : ハンドルがマウスで操作できること
          //1)assert.isTrue : ハンドルの位置が6%(5%)の位置にあることを確認する。
          //　　　　　　　　　 IE,FFは'5%'、CHは'6%'の位置に動くため、いずれかを許容している。
          var spanLeft = span.style.left == '6%' ? true : span.style.left == '5%' ? true : false;
          assert.isTrue(spanLeft, MSG_JQUERY_UI_SLIDER);
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
