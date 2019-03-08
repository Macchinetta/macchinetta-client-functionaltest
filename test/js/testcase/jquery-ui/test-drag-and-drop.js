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
  var expect = chai.expect;
  var testObj = {
    sandboxEl: null,
    win: null,
    doc: null
  };

  describe('UICP13 jQuery UI形式のドラッグ＆ドロップができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_DRAG_AND_DROP;

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
    it('UICP1301 001-002 ドラッグ＆ドロップができる', function (done) {
      this.timeout(0);
      var drag1El = testObj.doc.querySelector('#drag1');
      var droppable = testObj.doc.querySelector('.ui-droppable');
      var bodyEl = testObj.doc.querySelector('body');

      // ドラッグスタートとなる座標を取得
      var startX = drag1El.getBoundingClientRect().left + 5;
      var startY = drag1El.getBoundingClientRect().top + 5;

      // ドロップ対象となる座標を取得
      var endX = droppable.getBoundingClientRect().left + 10;
      var endY = droppable.getBoundingClientRect().top + 10;

      m.executeSequentialWithDelay([

        // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
        function () {
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          //1.ドラッグする要素Aをドラッグする
          var downevent = m.simulateEvent('mousedown', {
            pageX: startX,
            pageY: startY,
            which: 1
          });
          drag1El.dispatchEvent(downevent);
          var moveevent = m.simulateEvent('mousemove', {
            pageX: endX,
            pageY: endY,
            which: 1
          });
          drag1El.dispatchEvent(moveevent);
        },
        function () {

          /**
            * ■確認項目1:マウスカーソルの形状がmoveになっていることを確認する
            * 1)マウスカーソルの形状が'move'であること
            */
          var bodyElStyle = bodyEl.style.cursor;
          assert.equal(bodyElStyle, 'move', 'UICP1301 001');
        },
        function () {

          // 2.ドラッグ先にドロップする
          var mouseup = m.simulateEvent('mouseup');
          drag1El.dispatchEvent(mouseup);
        },
        function () {

          /**
            * ■確認項目2:ドラッグ先にドロップできたことを確認する
            * 1)テキストエリアの値に'ドラッグ先ドラッグする要素Aがカートに入れられました。'が含まれていること
            */
          var textContent = testObj.doc.querySelector('.ui-droppable').textContent;
          expect(textContent, 'UICP1301 002').to.contain('ドラッグ先ドラッグする要素Aがカートに入れられました。');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
