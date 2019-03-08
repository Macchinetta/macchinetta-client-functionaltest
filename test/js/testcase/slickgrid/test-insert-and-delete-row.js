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

  describe('GRID01 SlickGrid形式のテーブルに対して、行追加・削除・編集ができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.INSERT_AND_DELETE_ROWS;

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
    it('GRID0101 001 SlickGrid形式のテーブルに対して、最終行にデータを追加できる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 最終行のタイトルをクリックする
          var lastRowTitle = testObj.doc.querySelector('.ui-widget-content:nth-child(6) .slick-cell:nth-child(1)');
          lastRowTitle.dispatchEvent(m.simulateEvent('click'));

          // セルにタスク 5と入力する
          var editCell = testObj.doc.querySelector('.editor-text');
          editCell.value = 'タスク 5';
          editCell.dispatchEvent(m.simulateEvent('input'));
          editCell.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: KEY.ENTER
          }));
        },
        function () {

          /**
            * 確認項目1:最終行のDurationセルの値が未設定になっていることを確認する
            * 1)最終行のDurationセルの値が'未設定'になっていること
            */
          var lastDuration = testObj.doc.querySelector('.ui-widget-content:nth-child(6) .slick-cell:nth-child(2)');
          assert.equal(lastDuration.textContent, '未設定', 'GRID0101 001');
        },
        function () {
          done();
        }
      ], 0);
    });

    it('GRID0101 002 SlickGrid形式のテーブルに対して、行削除ができる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 削除ボタンを押下する
          var deleteBtn = testObj.doc.querySelector('.delete-button');
          deleteBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目1:先頭行のTitleセルの値がタスク1になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 1'になっていること
            */
          var firstRowTitle = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstRowTitle.textContent, 'タスク 1', 'GRID0101 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    it('GRID0101 003 SlickGrid形式のテーブルに対して、編集ができる(Enterキーによる編集モードへの移行)', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 先頭行のDurationセルをクリックする
          var firstDurationCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:nth-child(2)');
          firstDurationCell.dispatchEvent(m.simulateEvent('click'));

          // ←キーを押下する
          firstDurationCell.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: KEY.LEFT
          }));

          // Enterキーを押下する
          firstDurationCell.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: KEY.ENTER
          }));

          // セルにMacchinettaと入力する
          var editCell = testObj.doc.querySelector('.editor-text');
          editCell.value = 'Macchinetta';
          editCell.dispatchEvent(m.simulateEvent('input'));

          // Enterキーを押下する
          editCell.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: KEY.ENTER
          }));
        },
        function () {

          /**
            * 確認項目1:先頭行のTitleセルの値がMacchinettaになっていることを確認する
            * 1)先頭行のTitleセルの値が'Macchinetta'になっていること
            */
          var firstRowTitle = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstRowTitle.textContent, 'Macchinetta', 'GRID0101 003');
        },
        function () {
          done();
        }
      ], 0);
    });

    it('GRID0101 004 SlickGrid形式のテーブルに対して、編集ができる(ダブルクリックによる編集モードへの移行)', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 先頭行のTitleセルをダブルクリックする
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          firstTitleCell.dispatchEvent(m.simulateEvent('dblclick'));

          // セルにMacchinettaと入力する
          var editCell = testObj.doc.querySelector('.editor-text');
          editCell.value = 'Macchinetta';
          editCell.dispatchEvent(m.simulateEvent('input'));

          // Enterキーを押下する
          editCell.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: KEY.ENTER
          }));
        },
        function () {

          /**
            * 確認項目1:先頭行のTitleセルの値がMacchinettaになっていることを確認する
            * 1)先頭行のTitleセルの値が'Macchinetta'になっていること
            */
          var firstRowTitle = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstRowTitle.textContent, 'Macchinetta', 'GRID0101 004');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
