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

  describe('UICP08 jQuery UI形式で目盛り付きスライダーが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_SLIDER_LABELS;
    var MSG_JQUERY_UI_SLIDER_LABELS = 'jquery-ui-slider-labels.';

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
    it('UICP0804 001 初期表示の際、スライダーに目盛りが表示されること', function (done) {
      this.timeout(0);
      var labels = testObj.doc.querySelectorAll('#slider-labels > label');
      var span = testObj.doc.querySelector('#slider-labels > span');

      m.executeSequentialWithDelay([

        function () {

          // ■確認項目1：10分割された目盛りがスライダーの下に設置されていること
          var labelCount = 0;
          for (var i = 0; i < labels.length; i++) {
            if (labels[i].nodeName === 'LABEL') {
              labelCount++;

              /**
              * 1)isAbove : スライダーの下に目盛りがあることを確認する。
              */
              assert.isAbove(labels[i].getBoundingClientRect().top,
              span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS);
            }
          }
          assert.equal(labelCount, 11, MSG_JQUERY_UI_SLIDER_LABELS);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0804 002 ハンドルを右に移動した際、目盛りの上に移動すること', function (done) {
      this.timeout(0);
      var span = testObj.doc.querySelector('#slider-labels > span');

      // ドラッグスタートとなる座標を取得
      var startX = span.getBoundingClientRect().left;

      // ドロップ対象となる座標を取得
      /**
      * 0目盛り.offsetLeft = -10
      * 1目盛り.offsetLeft = 28
      * 2目盛り.offsetLeft = 66
      * 21: 28-10 <= 値 < 66-10任意の値でも可
      */
      var endX = span.getBoundingClientRect().left + 21;
      m.executeSequentialWithDelay([

        // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
        function () {
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          //1.スライダーを一つ右に移動する。
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

          // ■確認項目2：1の目盛りの上にハンドルがあること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 1の目盛りがspanの下にがあることを確認する。
          * 2)equal : 1の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS);
          assert.equal(span.style.cssText, 'left: 10%;', MSG_JQUERY_UI_SLIDER_LABELS);

        },
        function () {
          done();
        }
      ], 0);
    });

  });
}());