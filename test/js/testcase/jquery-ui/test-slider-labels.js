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
      var handle = testObj.doc.querySelector('#slider-labels > span');

      m.executeSequentialWithDelay([

        function () {

          // ■確認項目1：10分割された目盛りがスライダーの下に設置されていること
          var labelCount = 0;
          for (var i = 0; i < labels.length; i++) {
            labelCount++;

            /**
            * 1)isAbove : スライダーの下に目盛りがあることを確認する。
            */
            assert.isAbove(labels[i].getBoundingClientRect().top,
              handle.getBoundingClientRect().bottom, MSG_JQUERY_UI_SLIDER_LABELS);
          }

          /**
          * 2)equal : 目盛りが11個あることを確認する。
          */
          assert.equal(labelCount, 11, MSG_JQUERY_UI_SLIDER_LABELS);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0804 002 ハンドルの停止位置が0から10までの11段階あること', function (done) {
      this.timeout(0);
      var labels = testObj.doc.querySelectorAll('#slider-labels > label');
      var handle = testObj.doc.querySelector('#slider-labels > span');

      // ドラッグスタートとなる座標を取得
      var startX = handle.getBoundingClientRect().left;
      var startY = handle.getBoundingClientRect().top;
      var endX = handle.getBoundingClientRect().left;
      var endY = handle.getBoundingClientRect().top;

      // ハンドルの移動幅について
      /**
      * ハンドルを右に一つ動かす場合の移動幅を40pxとする。
      * これは、スライダー幅が400px、ステップ数が10のとき、
      * 1ステップごとに40pxハンドルが移動するためである。
      */

      // 位置チェックとハンドル移動を実行する関数を格納する配列を定義。
      var func = [];

      // 位置チェックとハンドル移動を実行する関数を交互に配列に追加する。
      for (var i = 0; i < labels.length; i++) {
        (function (i) {
          func.push(function () {

            /**
            * ■確認項目2：各ラベルがそれぞれハンドル停止位置の下に表示されていること
            * 1)equal : ハンドルと目盛りの横座標が等しいことを確認する。
            * 2)equal : ハンドルのスタイルから位置を確認する。
            * 3)equal : 目盛りのスタイルから位置を確認する。
            * 4)equal : 目盛りの内容を確認する。
            */
            assert.equal(handle.style.left, labels[i].style.left, MSG_JQUERY_UI_SLIDER_LABELS);
            assert.equal(handle.style.left, i * 10 + '%', MSG_JQUERY_UI_SLIDER_LABELS);
            assert.equal(labels[i].style.left, i * 10 + '%', MSG_JQUERY_UI_SLIDER_LABELS);
            assert.equal(labels[i].textContent, i, MSG_JQUERY_UI_SLIDER_LABELS);
          });
          if (i < labels.length - 1) {

            // ハンドルを1つ右に移動する。
            func.push(function () {
              startX = endX;
              endX = endX + 40;
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
            });
          } else {

            // 配列の最後に終了処理を追加する。
            func.push(function () {
              done();
            });
          }
        }(i));
      }
      m.executeSequentialWithDelay(func, 100);
    });

  });
}());