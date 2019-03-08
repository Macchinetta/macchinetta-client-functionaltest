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
  var MSG_MULTIPLE_SORT_TS = 'multiple-sort-ts.';

  describe('GRID05 tablesorter形式のテーブルに対して、複合キーによるデータのソートができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.MULTIPLE_SORT_TS;

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
    it('GRID0503 001-002 tablesorter形式のテーブルに対して、複合キーによるデータのソートができる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // Shiftキーを押下しながらヘッダの姓をクリックする(姓をキーとした昇順ソート)
          var familyHeader = testObj.doc.querySelector('th:first-child');
          familyHeader.dispatchEvent(m.simulateEvent('mousedown', {
            shiftKey: true,
            which: 1
          }));
          familyHeader.dispatchEvent(m.simulateEvent('mouseup', {
            shiftKey: true,
            which: 1
          }));

          // Shiftキーを押下しながらヘッダの名をクリックする(姓を第1ソートキーで昇順、名を第2ソートキーで昇順の並びとする)
          var nameHeader = testObj.doc.querySelector('th:nth-child(2)');
          nameHeader.dispatchEvent(m.simulateEvent('mousedown', {
            shiftKey: true,
            which: 1
          }));
          nameHeader.dispatchEvent(m.simulateEvent('mouseup', {
            shiftKey: true,
            which: 1
          }));
        },
        function () {

          /**
            * 確認項目1-1:上から2行目の姓が佐藤であることを確認する
            * 1)2行目の姓が'佐藤'であること
            * 確認項目1-2:上から2行目の名が一郎であることを確認する
            * 2)2行目の名が'一郎'であること
            * 確認項目1-3:上から3行目の姓が佐藤であることを確認する
            * 3)3行目の姓が'佐藤'であること
            * 確認項目1-4:上から3行目の名が二郎であることを確認する
            * 4)3行目の名が'二郎'であること
            */
          var secondFamilyCell = testObj.doc.querySelector('tr:nth-child(2) td:first-child');
          assert.equal(secondFamilyCell.textContent, '佐藤', MSG_MULTIPLE_SORT_TS);

          var secondNameCell = testObj.doc.querySelector('tr:nth-child(2) td:nth-child(2)');
          assert.equal(secondNameCell.textContent, '一郎', MSG_MULTIPLE_SORT_TS);

          var thirdFamilyCell = testObj.doc.querySelector('tr:nth-child(3) td:first-child');
          assert.equal(thirdFamilyCell.textContent, '佐藤', MSG_MULTIPLE_SORT_TS);

          var thirdNameCell = testObj.doc.querySelector('tr:nth-child(3) td:nth-child(2)');
          assert.equal(thirdNameCell.textContent, '二郎', MSG_MULTIPLE_SORT_TS);
        },
        function () {

          // Shiftキーを押下しながらヘッダの名をクリックする(姓を第1ソートキーで昇順、名を第2ソートキーで降順の並びとする)
          var nameHeader = testObj.doc.querySelector('th:nth-child(2)');
          nameHeader.dispatchEvent(m.simulateEvent('mousedown', {
            shiftKey: true,
            which: 1
          }));
          nameHeader.dispatchEvent(m.simulateEvent('mouseup', {
            shiftKey: true,
            which: 1
          }));
        },
        function () {

          /**
            * 確認項目2-1:上から2行目の姓が佐藤であることを確認する
            * 1)2行目の姓が'佐藤'であること
            * 確認項目2-2:上から2行目の名が二郎であることを確認する
            * 2)2行目の名が'二郎'であること
            * 確認項目2-3:上から4行目の姓が佐藤であることを確認する
            * 3)3行目の姓が'佐藤'であること
            * 確認項目2-4:上から4行目の名が一郎であることを確認する
            * 4)3行目の名が'一郎'であること
            */
          var secondFamilyCell = testObj.doc.querySelector('tr:nth-child(2) td:first-child');
          assert.equal(secondFamilyCell.textContent, '佐藤', MSG_MULTIPLE_SORT_TS);

          var secondNameCell = testObj.doc.querySelector('tr:nth-child(2) td:nth-child(2)');
          assert.equal(secondNameCell.textContent, '二郎', MSG_MULTIPLE_SORT_TS);

          var fourthFamilyCell = testObj.doc.querySelector('tr:nth-child(4) td:first-child');
          assert.equal(fourthFamilyCell.textContent, '佐藤', MSG_MULTIPLE_SORT_TS);

          var fourthNameCell = testObj.doc.querySelector('tr:nth-child(4) td:nth-child(2)');
          assert.equal(fourthNameCell.textContent, '一郎', MSG_MULTIPLE_SORT_TS);
        },
        function () {
          done();
        }
      ], 1000);
    });

    // ----------------------- テストケース -----------------------
  });
}());
