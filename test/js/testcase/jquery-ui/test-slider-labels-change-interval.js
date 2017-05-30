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
      var label = testObj.doc.querySelector('#slider-labels');
      var span = testObj.doc.querySelector('#slider-labels > span');
      var label1 = testObj.doc.querySelector('#slider-labels > label:nth-child(2)');
      var label2 = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');
      var label3 = testObj.doc.querySelector('#slider-labels > label:nth-child(4)');

      // ドラッグスタートとなる座標を取得
      var startX = span.getBoundingClientRect().left;

      // ドロップ対象となる座標を取得
      /**
      * 59の値決定について：
      *  スライダーを右に一つ動かすためには、
      *   ｛(次の移動位置までの幅／ 2 ) - 1 ＜ クリック位置 ＜ (次の次の移動位置までの幅／ 2 )｝
      *  上記範囲でスライダーを動かす必要がある。
      *  ここでスライダー幅を400とし、移動可能数を10とすると
      *  (次の移動位置までの幅／ 2 ) - 1 : (400/10/2) - 1 = 19
      *  (次の次の移動位置までの幅／ 2 ) : (400/10/2)*2 - 1 = 39
      *  したがって、スライダーを右に一つ移動する際の移動位置は
      *  「19 < 移動位置 < 39」
      *  となり、中間点の29をとることとした。
      */
      var endX = span.getBoundingClientRect().left + 29;

      m.executeSequentialWithDelay([

        function () {

          //スライダーの幅を400に設定
          testObj.doc.getElementById('slider-labels').style.width = '400px';
        },
        function () {

          // ■確認項目1： 0、5、10の3つのラベルだけがそれぞれのスライダー停止位置の下に表示されていること
          var labels = label.childNodes;
          var labelCount = 0;
          for (var i = 0; i < labels.length; i++) {
            if (labels[i].nodeName === 'LABEL') {
              labelCount++;

              /**
              * 1)isAbove : スライダーの下に目盛りがあることを確認する。
              */
              assert.isAbove(labels[i].getBoundingClientRect().top,
              label.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
            }
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
          assert.equal(label1.style.cssText, 'left: 0%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(label2.style.cssText, 'left: 50%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(label3.style.cssText, 'left: 100%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

          /**
          * 1)equal : 表示する一つ目の目盛りの内容を確認する。
          * 2)equal : 表示する二つ目の目盛りの内容を確認する。
          * 3)equal : 表示する三つ目の目盛りの内容を確認する。
          */
          assert.equal(label1.textContent, '0', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(label2.textContent, '5', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(label3.textContent, '10', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

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

          // ■確認項目2-1：スライダーが２段階目の停止位置に移動すること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 二つ目の目盛りがspanの下にあることを確認する。
          * 2)equal : 二つ目の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(span.style.cssText, 'left: 10%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {

          //2.スライダーを一つ右に移動する。
          var downevent = m.simulateEvent('mousedown', {
            clientX: span.getBoundingClientRect().left,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientX: span.getBoundingClientRect().left + 59,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          // ■確認項目2-2：スライダーが３段階目の停止位置に移動すること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 三つ目の目盛りがspanの下にあることを確認する。
          * 2)equal : 三つ目の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(span.style.cssText, 'left: 20%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {

          //3.スライダーを一つ右に移動する。
          var downevent = m.simulateEvent('mousedown', {
            clientX: span.getBoundingClientRect().left,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientX: span.getBoundingClientRect().left + 59,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          // ■確認項目2-3：スライダーが４段階目の停止位置に移動すること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 四つ目の目盛りがspanの下にあることを確認する。
          * 2)equal : 四つ目の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(span.style.cssText, 'left: 30%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {

          //4.スライダーを一つ右に移動する。
          var downevent = m.simulateEvent('mousedown', {
            clientX: span.getBoundingClientRect().left,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientX: span.getBoundingClientRect().left + 59,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          // ■確認項目2-4：スライダーが５段階目の停止位置に移動すること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 五つ目の目盛りがspanの下にあることを確認する。
          * 2)equal : 五つ目の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(span.style.cssText, 'left: 40%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {

          //5.スライダーを一つ右に移動する。
          var downevent = m.simulateEvent('mousedown', {
            clientX: span.getBoundingClientRect().left,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientX: span.getBoundingClientRect().left + 59,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          // ■確認項目2-5：スライダーが６段階目の停止位置に移動すること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 六つ目の目盛りがspanの下にあることを確認する。
          * 2)equal : 六つ目の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(span.style.cssText, 'left: 50%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {

          //6.スライダーを一つ右に移動する。
          var downevent = m.simulateEvent('mousedown', {
            clientX: span.getBoundingClientRect().left,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientX: span.getBoundingClientRect().left + 59,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          // ■確認項目2-6：スライダーが７段階目の停止位置に移動すること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 七つ目の目盛りがspanの下にあることを確認する。
          * 2)equal : 七つ目の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(span.style.cssText, 'left: 60%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {

          //7.スライダーを一つ右に移動する。
          var downevent = m.simulateEvent('mousedown', {
            clientX: span.getBoundingClientRect().left,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientX: span.getBoundingClientRect().left + 59,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          // ■確認項目2-7：スライダーが８段階目の停止位置に移動すること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 八つ目の目盛りがspanの下にあることを確認する。
          * 2)equal : 八つ目の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(span.style.cssText, 'left: 70%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {

          //8.スライダーを一つ右に移動する。
          var downevent = m.simulateEvent('mousedown', {
            clientX: span.getBoundingClientRect().left,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientX: span.getBoundingClientRect().left + 59,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          // ■確認項目2-8：スライダーが９段階目の停止位置に移動すること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 九つ目の目盛りがspanの下にあることを確認する。
          * 2)equal : 九つ目の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(span.style.cssText, 'left: 80%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {

          //9.スライダーを一つ右に移動する。
          var downevent = m.simulateEvent('mousedown', {
            clientX: span.getBoundingClientRect().left,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientX: span.getBoundingClientRect().left + 59,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          // ■確認項目2-9：スライダーが１０段階目の停止位置に移動すること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 十個目の目盛りがspanの下にあることを確認する。
          * 2)equal : 十個目の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(span.style.cssText, 'left: 90%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {

          //10.スライダーを一つ右に移動する。
          var downevent = m.simulateEvent('mousedown', {
            clientX: span.getBoundingClientRect().left,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientX: span.getBoundingClientRect().left + 59,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          // ■確認項目2-10：スライダーが１１段階目の停止位置に移動すること
          var label = testObj.doc.querySelector('#slider-labels > label:nth-child(3)');

          /**
          * 1)isAbove : 十一個目の目盛りがspanの下にあることを確認する。
          * 2)equal : 十一個目の目盛りの位置を確認する。
          */
          assert.isAbove(label.getBoundingClientRect().top,
          span.getBoundingClientRect().top, MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
          assert.equal(span.style.cssText, 'left: 100%;', MSG_JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);

        },
        function () {
          done();
        }
      ], 100);
    });

  });
}());