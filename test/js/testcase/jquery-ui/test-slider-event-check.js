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
    it('UICP0805 001 スライダーのハンドルを一番右まで移動するとの状態確認', function (done) {
      this.timeout(0);
      var span = testObj.doc.querySelector('#slider-event > span');

      // ドラッグスタートとなる座標を取得
      var startX = span.getBoundingClientRect().left;

      // ドロップ対象となる座標を取得
      var endX = span.getBoundingClientRect().left + 780;

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

          /**
            * ■確認項目1:スライダーを一番右まで移動した際、設定したイベントが取得できることを確認する
            * 1)テキストボックスの値が、「create, start, slide, slide, stop, change」になっていること
            */
          var fontValue = testObj.doc.querySelector('#status');
          assert.equal(fontValue.value, 'create, start, slide, stop, change', MSG_JQUERY_UI_SLIDER_EVENT_CHECK);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0805 002 テキストボックスの値が、「create, change」になっていること', function (done) {
      this.timeout(0);
      var button = testObj.doc.querySelector('#change_button');
      m.executeSequentialWithDelay([
        function () {
          button.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:ボタンを押下した際、changeイベントが取得できることを確認する
            * 1)テキストボックスの値が、「create, change」になっていること
            */
          var fontValue = testObj.doc.querySelector('#status');
          assert.equal(fontValue.value, 'create, change', MSG_JQUERY_UI_SLIDER_EVENT_CHECK);
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
