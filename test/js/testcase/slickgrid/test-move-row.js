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

  describe('GRID02 SlickGrid形式のテーブルに対して、行の並び替えができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.MOVE_ROWS;
    var MSG_SLICKGRID_MOVE_ROW = 'slickgrid_move-row.';

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
    it('GRID0201 001-002 SlickGrid形式のテーブルに対して、データを下の行に移動できる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          var tenthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(11)');
          var tenthTitleCellBottom = tenthTitleCell.getBoundingClientRect().bottom;

          /**
            * 先頭行をタスク10の下にドロップする
            * SlickGridテーブルのドラッグではmousemoveのイベントを2度発火する必要がある
            */
          firstTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            pageX: 1,
            pageY: 1,
            which: 1
          }));
          firstTitleCell.dispatchEvent(m.simulateEvent('mousemove', {}));
          firstTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            pageX: 1,
            pageY: tenthTitleCellBottom,
            which: 1
          }));
          firstTitleCell.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          /**
            * 確認項目1:先頭行のタスク0が11行目に移動したことを確認する
            * 1)11行目のTitleセルの値が'タスク 0'であること
            */
          var afterTenthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(11) .slick-cell:first-child');
          assert.equal(afterTenthTitleCell.textContent, 'タスク 0', MSG_SLICKGRID_MOVE_ROW);
        },

        function () {
          var elevenTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(11) .slick-cell:first-child');
          var table = testObj.doc.querySelector('.slick-viewport');

          /**
            * 11行目のデータを最終行の下にドロップする(スクロールバーを一番下まで動かし、最終行にドロップする)
            * SlickGridテーブルのドラッグではmousemoveのイベントを2度発火する必要がある
            */
          elevenTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            pageX: 1,
            pageY: 1,
            which: 1
          }));
          table.scrollTop = table.scrollHeight;
          elevenTitleCell.dispatchEvent(m.simulateEvent('mousemove', {}));
          elevenTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            pageX: 1,
            pageY: table.scrollHeight,
            which: 1
          }));
          elevenTitleCell.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          /**
            * 確認項目2:最終行のTitleセルの値がタスク0になっていることを確認する
            * 1)最終行のTitleセルの値が'タスク 0'になっていること
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 0', MSG_SLICKGRID_MOVE_ROW);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0201 003-004 SlickGrid形式のテーブルに対して、データを上の行に移動できる', function (done) {
      this.timeout(0);
      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // スクロールバーを一番下まで動かす
          table.scrollTop = table.scrollHeight;
        },
        function () {
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          var lastTenthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-last-child(10) ');
          var lastTenthTitleCellTop = lastTenthTitleCell.getBoundingClientRect().top;

          /**
            * 最終行をタスク 990の上にドロップする
            * SlickGridテーブルのドラッグではmousemoveのイベントを2度発火する必要がある
            */
          lastTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            pageX: 1,
            pageY: 1,
            which: 1
          }));
          lastTitleCell.dispatchEvent(m.simulateEvent('mousemove', {}));
          lastTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            pageX: 1,
            pageY: lastTenthTitleCellTop,
            which: 1
          }));
          lastTitleCell.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          /**
            * 確認項目1:最終行のタスク999が下から10行目に移動したことを確認する
            * 1)991行目のTitleセルの値が'タスク 999'であること
            */
          var afterLastTenthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-last-child(10)  .slick-cell:first-child');
          assert.equal(afterLastTenthTitleCell.textContent, 'タスク 999', MSG_SLICKGRID_MOVE_ROW);
        },
        function () {
          var lastTenthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-last-child(10)  .slick-cell:first-child');

          /**
            * 下から10行目のデータを先頭行の上にドロップする(スクロールバーを一番上まで動かし、先頭行にドロップする)
            * SlickGridテーブルのドラッグではmousemoveのイベントを2度発火する必要がある
            */
          lastTenthTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            pageX: 1,
            pageY: 1,
            which: 1
          }));
          table.scrollTop = 0;
          lastTenthTitleCell.dispatchEvent(m.simulateEvent('mousemove', {}));
          lastTenthTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            pageX: 1,
            pageY: -10,
            which: 1
          }));
          lastTenthTitleCell.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          /**
            * 確認項目2:先頭行のTitleセルの値がタスク999になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 999'になっていること
            */
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstTitleCell.textContent, 'タスク 999', MSG_SLICKGRID_MOVE_ROW);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0201 005 SlickGrid形式のテーブルに対して、Ctrlキーを用いて複数行のデータをドラッグして行移動できる', function (done) {
      this.timeout(0);

      // ドラッグ対象のセル
      var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(1) .slick-cell:first-child');
      var thirdTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(3) .slick-cell:first-child');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 先頭1行目と3行目をCtrlキーを押下しながらクリックする
          firstTitleCell.dispatchEvent(m.simulateEvent('click', {
            pageX: 0,
            pageY: 0,
            which: 1,
            ctrlKey: true
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('click', {
            pageX: 0,
            pageY: 0,
            which: 1,
            ctrlKey: true
          }));
        },
        function () {

          // ドロップする座標
          var fourthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(4) .slick-cell:first-child');
          var fourthTitleCellBottom = fourthTitleCell.getBoundingClientRect().bottom;

          /**
            * 選択した2行を4行目の下にドロップする
            * SlickGridテーブルのドラッグではmousemoveのイベントを2度発火する必要がある
            */
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            pageX: 1,
            pageY: 1,
            which: 1
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousemove', {}));
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            pageX: 1,
            pageY: fourthTitleCellBottom,
            which: 1
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          /**
            * 確認項目1-1:タスク0が3行目に移動したことを確認する
            * 1)3行目のTitleセルの値が'タスク 0'であること
            * 確認項目1-2:タスク2が4行目に移動したことを確認する
            * 2)4行目のTitleセルの値が'タスク 2'であること
            */
          var thirdTitle = testObj.doc.querySelector('.ui-widget-content:nth-child(3) .slick-cell:first-child').textContent;
          assert.equal(thirdTitle, 'タスク 0', MSG_SLICKGRID_MOVE_ROW);
          var fourthTitle = testObj.doc.querySelector('.ui-widget-content:nth-child(4) .slick-cell:first-child').textContent;
          assert.equal(fourthTitle, 'タスク 2', MSG_SLICKGRID_MOVE_ROW);
        },
        function () {
          done();
        }
      ], 0);
    });

    it('GRID0201 006 SlickGrid形式のテーブルに対して、Shiftキーを用いて複数行のデータをドラッグして行移動できる', function (done) {
      this.timeout(0);

      // ドラッグ対象のセル
      var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(1) .slick-cell:first-child');
      var thirdTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(3) .slick-cell:first-child');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 先頭1行目と3行目をShiftキーを押下しながらクリックする
          firstTitleCell.dispatchEvent(m.simulateEvent('click', {
            pageX: 0,
            pageY: 0,
            which: 1
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('click', {
            pageX: 0,
            pageY: 0,
            which: 1,
            shiftKey: true
          }));
        },
        function () {

          // ドロップする座標
          var fourthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(4) .slick-cell:first-child');
          var fourthTitleCellBottom = fourthTitleCell.getBoundingClientRect().bottom;

          /**
            * 選択した3行を4行目の下にドロップする
            * SlickGridテーブルのドラッグではmousemoveのイベントを2度発火する必要がある
            */
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            pageX: 1,
            pageY: 1,
            which: 1
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousemove', {}));
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            pageX: 1,
            pageY: fourthTitleCellBottom,
            which: 1
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          /**
            * 確認項目1-1:タスク0が2行目に移動したことを確認する
            * 1)2行目のTitleセルの値が'タスク 0'であること
            * 確認項目1-2:タスク1が3行目に移動したことを確認する
            * 2)3行目のTitleセルの値が'タスク 1'であること
            * 確認項目1-3:タスク2が4行目に移動したことを確認する
            * 3)4行目のTitleセルの値が'タスク 2'であること
            */
          var secondTitle = testObj.doc.querySelector('.ui-widget-content:nth-child(2) .slick-cell:first-child').textContent;
          assert.equal(secondTitle, 'タスク 0', MSG_SLICKGRID_MOVE_ROW);
          var thirdTitle = testObj.doc.querySelector('.ui-widget-content:nth-child(3) .slick-cell:first-child').textContent;
          assert.equal(thirdTitle, 'タスク 1', MSG_SLICKGRID_MOVE_ROW);
          var fourthTitle = testObj.doc.querySelector('.ui-widget-content:nth-child(4) .slick-cell:first-child').textContent;
          assert.equal(fourthTitle, 'タスク 2', MSG_SLICKGRID_MOVE_ROW);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
