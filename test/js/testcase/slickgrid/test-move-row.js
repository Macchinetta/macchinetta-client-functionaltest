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

  describe('GRID02 SlickGrid形式のテーブルに対して、行の並び替えができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.MOVE_ROWS;

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

          // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          // 先頭行をドラッグする
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          firstTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: 1,
            clientY: 1,
            which: 1
          }));

          // ドラッグしたデータをタスク10の下にドロップする
          // SlickGridテーブルのドラッグではmousemoveのイベントを2度発火する必要がある
          var tenthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(11)');
          var tenthTitleCellBottom = tenthTitleCell.getBoundingClientRect().bottom;

          firstTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: tenthTitleCellBottom,
            which: 1
          }));
          firstTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: tenthTitleCellBottom,
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
          assert.equal(afterTenthTitleCell.textContent, 'タスク 0', 'GRID0201 001');
        },

        function () {

          // 10行目のデータをドラッグする
          var elevenTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(11) .slick-cell:first-child');
          elevenTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: 1,
            clientY: 1,
            which: 1
          }));

          // ドラッグしたデータを最終行の下にドロップする(スクロールバーを一番下まで動かし、最終行にドロップする)
          // SlickGridテーブルのドラッグではmousemoveのイベントを2度発火する必要がある
          var table = testObj.doc.querySelector('.slick-viewport');
          table.scrollTop = table.scrollHeight;

          elevenTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: table.scrollHeight,
            which: 1
          }));
          elevenTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: table.scrollHeight,
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
          assert.equal(lastTitleCell.textContent, 'タスク 0', 'GRID0201 002');
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

          // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          // スクロールバーを一番下まで動かす
          table.scrollTop = table.scrollHeight;
        },
        function () {

          // 最終行をドラッグする
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          lastTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: 1,
            clientY: 1,
            which: 1
          }));

          // ドラッグしたデータをタスク 990の上にドロップする
          // テーブルのドラッグではmousemoveのイベントを2度発火する必要がある
          var lastTenthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-last-child(10) ');
          var lastTenthTitleCellTop = lastTenthTitleCell.getBoundingClientRect().top;

          lastTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: lastTenthTitleCellTop,
            which: 1
          }));
          lastTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: lastTenthTitleCellTop,
            which: 1
          }));
          lastTitleCell.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          /**
            * 確認項目1:最終行のタスク999が下から10行目に移動したことを確認する
            * 1)990行目のTitleセルの値が'タスク 999'であること
            */
          var afterLastTenthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-last-child(10)  .slick-cell:first-child');
          assert.equal(afterLastTenthTitleCell.textContent, 'タスク 999', 'GRID0202 001');
        },
        function () {

          // 下から10行目のデータをドラッグする
          var lastTenthTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-last-child(10)  .slick-cell:first-child');

          lastTenthTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: 1,
            clientY: 1,
            which: 1
          }));

          // ドラッグしたデータを先頭行の上にドロップする(スクロールバーを一番下まで動かし、最終行にドロップする)
          // テーブルのドラッグではmousemoveのイベントを2度発火する必要がある

          table.scrollTop = 0;
          lastTenthTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: -10,
            which: 1
          }));
          lastTenthTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: -10,
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
          assert.equal(firstTitleCell.textContent, 'タスク 999', 'GRID0202 002');
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

          // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          // 先頭1行目と3行目をCtrlキーを押下しながらクリックする
          firstTitleCell.dispatchEvent(m.simulateEvent('click', {
            clientX: 0,
            clientY: 0,
            which: 1,
            ctrlKey: true
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('click', {
            clientX: 0,
            clientY: 0,
            which: 1,
            ctrlKey: true
          }));
        },
        function () {

          // ドロップする座標
          var position = testObj.doc.querySelector('.ui-widget-content:nth-child(4) .slick-cell:first-child').getBoundingClientRect().bottom;

          // 選択した2行を4行目の下にドロップする
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: 1,
            clientY: 1,
            which: 1
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: position,
            which: 1
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: position,
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
          assert.equal(thirdTitle, 'タスク 0', 'GRID0203 001');
          var fourthTitle = testObj.doc.querySelector('.ui-widget-content:nth-child(4) .slick-cell:first-child').textContent;
          assert.equal(fourthTitle, 'タスク 2', 'GRID0203 001');
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

          // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          // 先頭1行目と3行目をCtrlキーを押下しながらクリックする
          firstTitleCell.dispatchEvent(m.simulateEvent('click', {
            clientX: 0,
            clientY: 0,
            which: 1
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('click', {
            clientX: 0,
            clientY: 0,
            which: 1,
            shiftKey: true
          }));
        },
        function () {

          // ドロップする座標
          var position = testObj.doc.querySelector('.ui-widget-content:nth-child(4) .slick-cell:first-child').getBoundingClientRect().bottom;

          // 選択した2行を4行目の下にドロップする
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: 1,
            clientY: 1,
            which: 1
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: position,
            which: 1
          }));
          thirdTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: 1,
            clientY: position,
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
          assert.equal(secondTitle, 'タスク 0', 'GRID0204 001');
          var thirdTitle = testObj.doc.querySelector('.ui-widget-content:nth-child(3) .slick-cell:first-child').textContent;
          assert.equal(thirdTitle, 'タスク 1', 'GRID0204 001');
          var fourthTitle = testObj.doc.querySelector('.ui-widget-content:nth-child(4) .slick-cell:first-child').textContent;
          assert.equal(fourthTitle, 'タスク 2', 'GRID0204 001');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
