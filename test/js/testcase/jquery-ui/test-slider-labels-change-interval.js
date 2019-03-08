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

  describe('UICP08 jQuery UI形式で目盛り付きスライダー(目盛り間隔の変更)が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL;
    var MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL = 'jquery-ui-slider-labels-change-interval.';

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
    it('UICP0806 001 設定した目盛り間隔で目盛りが表示されること', function (done) {
      this.timeout(0);
      var handle = testObj.doc.querySelector('#slider-labels > span');
      var labels = testObj.doc.querySelectorAll('#slider-labels > label');

      // ドラッグスタートとなる座標を取得
      var startX = handle.getBoundingClientRect().left;
      var startY = handle.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      /**
      * ハンドルを初期位置から50%の位置まで動かす場合の移動幅を200pxとする。
      * これは、スライダー幅が400pxであり、ハンドルの初期位置が一番左にあるためである。
      */
      var endX = handle.getBoundingClientRect().left + 200;
      var endY = handle.getBoundingClientRect().top;

      m.executeSequentialWithDelay([

        function () {

          // ■確認項目1： 0、5、10の三つのラベルだけが表示されていること
          var labelCount = 0;
          for (var i = 0; i < labels.length; i++) {
            labelCount++;

            /**
            * 1)isAbove : スライダーの下に目盛りがあることを確認する。
            */
            assert.isAbove(labels[i].getBoundingClientRect().top,
              handle.getBoundingClientRect().bottom, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          }

          /**
          * 1)equal : 目盛りが三つしかないことを確認する。
          */
          assert.equal(labelCount, 3, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

          /**
          * 1)equal : 表示する一つ目の目盛りの位置を確認する。
          * 2)equal : 表示する二つ目の目盛りの位置を確認する。
          * 3)equal : 表示する三つ目の目盛りの位置を確認する。
          */
          assert.equal(labels[0].style.left, '0%', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(labels[1].style.left, '50%', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(labels[2].style.left, '100%', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

          /**
          * 1)equal : 表示する一つ目の目盛りの内容を確認する。
          * 2)equal : 表示する二つ目の目盛りの内容を確認する。
          * 3)equal : 表示する三つ目の目盛りの内容を確認する。
          */
          assert.equal(labels[0].textContent, '0', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(labels[1].textContent, '5', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(labels[2].textContent, '10', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {

          // ■確認項目2：0、5、10のラベルがそれぞれハンドルの0%、50%、100%の停止位置の下に表示されていること

          /**
          * 1)equal : ハンドルと一つ目の目盛りの横座標が等しいことを確認する。
          * 2)equal : ハンドルが0%の位置にあることを確認する。
          */
          assert.equal(handle.style.left, labels[0].style.left, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(handle.style.left, '0%', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
        },

        function () {

          //1.スライダーを50%の位置に移動する。
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
          * 1)equal : ハンドルと二つ目の目盛りの横座標が等しいことを確認する。
          * 2)equal : ハンドルが50%の位置にあることを確認する。
          */
          assert.equal(handle.style.left, labels[1].style.left, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(handle.style.left, '50%', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
        },

        function () {

          //2.スライダーを100%の位置に移動する。
          /**
          * ハンドルを50%の位置から100%の位置まで動かす場合の移動幅を200pxとする。
          * これは、スライダー幅が400pxであり、ハンドルを50%分移動させるためである。
          */
          startX = endX;
          endX = endX + 200;

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
          * 1)equal : ハンドルと三つ目の目盛りの横座標が等しいことを確認する。
          * 2)equal : ハンドルが100%の位置にあることを確認する。
          */
          assert.equal(handle.style.left, labels[2].style.left, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(handle.style.left, '100%', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
        },
        function () {
          done();
        }
      ], 100);
    });

  });
}());