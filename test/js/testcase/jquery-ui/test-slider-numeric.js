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
      var sliderHeight = testObj.doc.querySelector('#slider-numeric > div');
      var sliderHeightColor = testObj.win.getComputedStyle(sliderHeight).backgroundColor;

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          /**
            * ■確認項目1:初期表示の際、オプションで設定した初期値にスライダーがあることを確認する
            * 1)テキストボックスの値が'25'であること
            * 2)スライダーの背景色が'rgb(233, 233, 233)'であること
            */
          assert.equal(sliderValue.value, '25', MSG_JQUERY_UI_SLIDER_NUMBERIC);
          assert.equal(sliderHeightColor, 'rgb(233, 233, 233)', MSG_JQUERY_UI_SLIDER_NUMBERIC);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0802 002 テキストボックスの値が10になること', function (done) {
      this.timeout(0);
      var handle = testObj.doc.querySelector('#slider-numeric > span');
      var sliderValue = testObj.doc.querySelector('#value');

      // ドラッグスタートとなる座標を取得
      var startX = handle.getBoundingClientRect().left;
      var startY = handle.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      /**
      * ハンドルを初期位置から一番下まで動かす場合の移動幅を75pxとする。
      * これは、ハンドルの初期位置が一番下から75pxの位置にあるためである。
      */
      var endX = handle.getBoundingClientRect().left;
      var endY = handle.getBoundingClientRect().top + 75;

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
            * ■確認項目1:スライダーを一番下に移動した際、オプションで設定した値になることを確認する
            * 1)スライダーの位置が'0%'であること
            * 2)テキストボックスの値が'10'であること
            */
          var handleBottom = handle.style.bottom;
          assert.equal(handleBottom, '0%', MSG_JQUERY_UI_SLIDER_NUMBERIC);
          assert.equal(sliderValue.value, '10', MSG_JQUERY_UI_SLIDER_NUMBERIC);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0802 003 テキストボックスの値が50になること', function (done) {
      this.timeout(0);
      var handle = testObj.doc.querySelector('#slider-numeric > span');
      var sliderValue = testObj.doc.querySelector('#value');

      // ドラッグスタートとなる座標を取得
      var startX = handle.getBoundingClientRect().left;
      var startY = handle.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      /**
      * ハンドルを初期位置から一番上まで動かす場合の移動幅を125pxとする。
      * これは、ハンドルの初期位置が一番上から125pxの位置にあるためである。
      */
      var endX = handle.getBoundingClientRect().left;
      var endY = handle.getBoundingClientRect().top - 125;

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
            * ■確認項目1:スライダーを一番上に移動した際、オプションで設定した値になることを確認する
            * 1)スライダーの位置が'100%'であること
            * 2)テキストボックスの値が'50'であること
            */
          var handleBottom = handle.style.bottom;
          assert.equal(handleBottom, '100%', MSG_JQUERY_UI_SLIDER_NUMBERIC);
          assert.equal(sliderValue.value, '50', MSG_JQUERY_UI_SLIDER_NUMBERIC);
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
