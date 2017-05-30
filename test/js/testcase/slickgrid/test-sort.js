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

  describe('GRID05 SlickGrid形式のテーブルに対して、ソートが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.SORT;

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
    it('GRID0501 001-002 SlickGrid形式のテーブルに対して、単独キーによるデータのソートができる', function (done) {
      this.timeout(0);

      var idHeader = testObj.doc.querySelector('.slick-header-column');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ヘッダのIDをクリックする(IDで昇順ソート)
          idHeader.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ヘッダのIDをクリックする(IDで降順ソート)
          idHeader.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目1-1:テーブルの先頭行のIDセルの値がタスク999になっていることを確認する
            * 1)先頭行のIDセルの値が'タスク999'になっていること
            * 確認項目1-2:テーブルの2行目のIDセルの値がタスク998になっていることを確認する
            * 2)2行目のIDセルの値が'タスク998'になっていること
            */
          var fistIdCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(fistIdCell.textContent, 'タスク999', 'GRID0501 001');
          var SecondIdCell = testObj.doc.querySelector('.ui-widget-content:nth-child(2) .slick-cell:first-child');
          assert.equal(SecondIdCell.textContent, 'タスク998', 'GRID0501 001');
        },
        function () {

          // ヘッダのIDをクリックする(IDで昇順ソート)
          idHeader.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目2-1:テーブルの先頭行のIDセルの値がタスク0になっていることを確認する
            * 1)先頭行のIDセルの値が'タスク0'になっていること
            * 確認項目2-2:テーブルの2行目のIDセルの値がタスク1になっていることを確認する
            * 2)2行目のIDセルの値が'タスク1'になっていること
            */
          var fistIdCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(fistIdCell.textContent, 'タスク0', 'GRID0501 002');
          var SecondIdCell = testObj.doc.querySelector('.ui-widget-content:nth-child(2) .slick-cell:first-child');
          assert.equal(SecondIdCell.textContent, 'タスク1', 'GRID0501 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
