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

  describe('GRID05 tablesorter形式のテーブルに対して、ソートを無効にしたカラムを設定できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.NO_SORT_TS;

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
    it('GRID0504 001 tablesorter形式のテーブルに対して、ソートを無効にしたカラムを設定できる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ヘッダの年齢をクリックする
          var ageHeader = testObj.doc.querySelector('th:nth-child(3)');
          ageHeader.dispatchEvent(m.simulateEvent('mouseup', {
            which: 1
          }));
        },
        function () {

          /**
            * 確認項目1:年齢カラムが昇順でソートされていないことを確認する
            * 1)上から1行目の年齢が2であること
            * 2)上から5行目(最終行)の年齢が22であること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:first-child td:nth-child(3)');
          assert.equal(firstFamilyCell.textContent, '2', 'GRID0504 001');

          var secondNameCell = testObj.doc.querySelector('tr:nth-child(5) td:nth-child(3)');
          assert.equal(secondNameCell.textContent, '22', 'GRID0504 001');
        },
        function () {
          done();
        }
      ], 100);
    });

    // ----------------------- テストケース -----------------------
  });
}());
