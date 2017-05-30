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

  describe('UICP08 jQuery UI形式でスライダーのオプション設定が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_SLIDER_NUMBERIC;
    var MSG_JQUERY_UI_SLIDER_NUMBERIC = 'jquery-ui_slider_numberic.';

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
    it('UICP0802 001 スライダーのオプションが利用できること', function (done) {
      this.timeout(0);
      var sliderValue = testObj.doc.querySelector('#value');
      var sliderNumDiv = testObj.doc.querySelector('#slider-numeric > div');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          /**
            * ■確認項目1:初期表示の際、オプションで設定した初期値にスライダーがあることを確認する
            * 1)テキストボックスの値が'25'であること
            * 2)スライダーの背景色が'rgb(246, 168, 40)'であること
            */
          var sliderNumDivBack = testObj.win.getComputedStyle(sliderNumDiv).backgroundColor;
          assert.equal(sliderValue.value, '25');
          assert.equal(sliderNumDivBack, 'rgb(246, 168, 40)', MSG_JQUERY_UI_SLIDER_NUMBERIC);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0802 002 テキストボックスの値が10になること', function (done) {
      this.timeout(0);
      var span = testObj.doc.querySelector('#slider-numeric > span');

      // ドラッグスタートとなる座標を取得
      var startY = span.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      var endY = span.getBoundingClientRect().top + 75;

      m.executeSequentialWithDelay([

        // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
        function () {
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          //1.スライダーをドラッグする
          var downevent = m.simulateEvent('mousedown', {
            clientY: startY,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientY: endY,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          /**
            * ■確認項目1:スライダーを一番下に移動した際、オプションで設定した値になることを確認する
            * 1)スライダーの位置が'0%'であること
            * 2)テキストボックスの値が'10'であること
            */
          var sliderValue = testObj.doc.querySelector('#value');
          var spanLeft = span.style.bottom;
          assert.equal(spanLeft, '0%', MSG_JQUERY_UI_SLIDER_NUMBERIC);
          assert.equal(sliderValue.value, '10');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0802 003 テキストボックスの値が50になること', function (done) {
      this.timeout(0);
      var span = testObj.doc.querySelector('#slider-numeric > span');

      // ドラッグスタートとなる座標を取得
      var startY = span.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      var endY = span.getBoundingClientRect().top - 200;

      m.executeSequentialWithDelay([

        // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
        function () {
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          //1.スライダーをドラッグする
          var downevent = m.simulateEvent('mousedown', {
            clientY: startY,
            which: 1
          });
          span.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            clientY: endY,
            which: 1
          });
          span.dispatchEvent(moveevent);
          var mouseup = m.simulateEvent('mouseup');
          span.dispatchEvent(mouseup);
        },
        function () {

          /**
            * ■確認項目1:スライダーを一番上に移動した際、オプションで設定した値になることを確認する
            * 1)スライダーの位置が'100%'であること
            * 2)テキストボックスの値が'50'であること
            */
          var sliderValue = testObj.doc.querySelector('#value');
          var spanLeft = span.style.bottom;
          assert.equal(spanLeft, '100%', MSG_JQUERY_UI_SLIDER_NUMBERIC);
          assert.equal(sliderValue.value, '50');
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
