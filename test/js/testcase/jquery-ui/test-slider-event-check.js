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

  describe('UICP08 jQuery UI形式でstart、stop、slider イベントを設定したスライダーが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_SLIDER_EVENT_CHECK;
    var MSG_JQUERY_UI_SLIDER_EVENT_CHECK = 'jquery-ui_slider-event-check.';

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
    it('UICP0805 001 スライダーを一番右まで移動した際、設定したイベントが取得できること', function (done) {
      this.timeout(0);
      var handle = testObj.doc.querySelector('#slider-event > span');
      var textBox = testObj.doc.querySelector('#status');

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

          /**
            * ■確認項目1:スライダーを一番右まで移動した際、設定したイベントが取得できることを確認する
            * 1)テキストボックスの値が、「create, start, slide, slide, stop, change」になっていること
            */
          assert.equal(textBox.value, 'create, start, slide, stop, change', MSG_JQUERY_UI_SLIDER_EVENT_CHECK);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0805 002 ボタンを押下した際、changeイベントが取得できること', function (done) {
      this.timeout(0);
      var button = testObj.doc.querySelector('#change_button');
      var textBox = testObj.doc.querySelector('#status');
      m.executeSequentialWithDelay([
        function () {
          button.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:ボタンを押下した際、changeイベントが取得できることを確認する
            * 1)テキストボックスの値が、「create, change」になっていること
            */
          assert.equal(textBox.value, 'create, change', MSG_JQUERY_UI_SLIDER_EVENT_CHECK);
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
