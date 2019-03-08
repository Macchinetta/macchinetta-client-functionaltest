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

  // message用定数定義
  var MSG_SORT_TS = 'sort-ts.';

  describe('GRID05 tablesorter形式のテーブルに対して、ソートが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.SORT_TS;

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
    it('GRID0502 001-002 tablesorter形式のテーブルに対して、単独キーによるデータのソートができる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ヘッダの姓をクリック（姓をキーとした昇順ソート）
          var familyHeader = testObj.doc.querySelector('th:first-child');
          familyHeader.dispatchEvent(m.simulateEvent('mousedown', {
            which: 1
          }));
          familyHeader.dispatchEvent(m.simulateEvent('mouseup', {
            which: 1
          }));
        },
        function () {

          /**
            * 確認項目1-1:テーブルの先頭行の姓セルの値が中居になっていることを確認する
            * 1)先頭行の姓セルの値が'中居'になっていること
            * 確認項目1-2:テーブルの2行目の姓セルの値が坂になっていることを確認する
            * 2)2行目の姓セルの値が'坂'になっていること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:first-child td:first-child');
          assert.equal(firstFamilyCell.textContent, '中居', MSG_SORT_TS);
          var secondFamilyCell = testObj.doc.querySelector('tr:nth-child(2) td:first-child');
          assert.equal(secondFamilyCell.textContent, '坂', MSG_SORT_TS);
        },
        function () {

          // ヘッダの姓をクリック（姓をキーとした降順ソート）
          var familyHeader = testObj.doc.querySelector('th:first-child');
          familyHeader.dispatchEvent(m.simulateEvent('mousedown', {
            which: 1
          }));
          familyHeader.dispatchEvent(m.simulateEvent('mouseup', {
            which: 1
          }));
        },
        function () {

          /**
            * 確認項目2-1:テーブルの先頭行の姓セルの値が毛利になっていることを確認する
            * 1)先頭行の姓セルの値が'毛利'になっていること
            * 確認項目2-2:テーブルの2行目の姓セルの値が小本になっていることを確認する
            * 2)2行目の姓セルの値が'小本'になっていること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:first-child td:first-child');
          assert.equal(firstFamilyCell.textContent, '毛利', MSG_SORT_TS);
          var secondFamilyCell = testObj.doc.querySelector('tr:nth-child(2) td:first-child');
          assert.equal(secondFamilyCell.textContent, '小本', MSG_SORT_TS);
        },
        function () {
          done();
        }
      ], 100);
    });

    // ----------------------- テストケース -----------------------
  });
}());
