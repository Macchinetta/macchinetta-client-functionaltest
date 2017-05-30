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

  describe('GRID01 tablesorter形式のテーブルに対して、行追加・削除・編集ができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.INSERT_AND_DELETE_ROWS_TS;

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
    it('GRID0102 001 tablesorter形式のテーブルに対して、ボタンクリックで最終行にデータを追加できる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 行追加のボタンを押下する
          var addBtn = testObj.doc.querySelector('#add-btn');
          addBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目1:最終行の姓セルの値が姓になっていることを確認する
            * 1)最終行の姓セルの値が'姓'になっていること
            */
          var lastFamilyCell = testObj.doc.querySelector('tr:nth-child(11) td:first-child');
          assert.equal(lastFamilyCell.textContent, '姓', 'GRID0105 001');
        },
        function () {
          done();
        }
      ], 0);
    });

    it('GRID0102 002 tablesorter形式のテーブルに対して、行削除ができる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {
          var removeBtn = testObj.doc.querySelector('.remove-btn');
          removeBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目1:先頭行の姓セルの値が安田になっていることを確認する
            * 1)先頭行の姓セルの値が'安田'になっていること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:first-child td:first-child');
          assert.equal(firstFamilyCell.textContent, '安田', 'GRID0106 001');
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0102 003 tablesorter形式のテーブルに対して、編集ができる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * 確認項目1:1行目の姓セルが編集可能なことを確認する
            * 1)コンテンツの編集許可設定が'true'になっていること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:first-child td:first-child div');
          assert.equal(firstFamilyCell.contentEditable, 'true', 'GRID0107 001');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
