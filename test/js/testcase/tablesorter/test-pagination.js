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

  describe('GRID04 tablesorter形式のテーブルに対して、ページネーションの利用ができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.PAGENATION_TS;

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
    it('GRID0402 001-005 tablesorter形式のテーブルに対して、ページネーションの設定でページの移動ができる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ページネーションの次ページに移動のボタンを押下する
          var nextBtn = testObj.doc.querySelector('.next');
          nextBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目1-1:テーブルの先頭行の姓セルの値が西本になっていることを確認する
            * 1)先頭行の姓セルの値が'西本'になっていること
            * 確認項目1-2:Element="tr"の10番目の子要素(＝10行目)が表示されていないことを確認する
            * 2)10行目の表示状態が'none'であること
            * 確認項目1-3:テーブルの最終行の姓セルの値が望月になっていることを確認する
            * 3)最終行の姓セルの値が'望月'になっていること
            * 確認項目1-4:Element="tr"の21番目の子要素(＝21行目)が表示されていないことを確認する
            * 4)21行目の表示状態が'none'であること
            * 確認項目1-5:現在の表示ページが「11 to 20 of 59 rows」になっていることを確認する
            * 5)現在の表示ページが'11 to 20 of 59 rows'になっていること
            * 確認項目1-6:ページ数のプルダウンが2になっていることを確認する
            * 6)ページ数のプルダウンが'2'になっていること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:nth-child(11) td:first-child');
          assert.equal(firstFamilyCell.textContent, '西本', 'GRID0402 001');

          var beforeFirstFamilyCell = testObj.doc.querySelector('tr:nth-child(10)');
          var beforeFirstFamilyCellStyle = testObj.win.getComputedStyle(beforeFirstFamilyCell).display;
          assert.equal(beforeFirstFamilyCellStyle, 'none', 'GRID0402 001');

          var lastFamilyCell = testObj.doc.querySelector('tr:nth-child(20) td:first-child');
          assert.equal(lastFamilyCell.textContent, '望月', 'GRID0402 001');

          var afterLastFamilyCell = testObj.doc.querySelector('tr:nth-child(21)');
          var afterLastFamilyCellStyle = testObj.win.getComputedStyle(afterLastFamilyCell).display;
          assert.equal(afterLastFamilyCellStyle, 'none', 'GRID0402 001');

          var display = testObj.doc.querySelector('#tablesorter_pager_info');
          assert.equal(display.textContent, '11 to 20 of 59 rows', 'GRID0402 001');

          var pulldown = testObj.doc.querySelector('.gotoPage');
          assert.equal(pulldown.value, '2', 'GRID0402 001');
        },
        function () {

          // ページネーションの最終ページに移動のボタンを押下する
          var lastBtn = testObj.doc.querySelector('.last');
          lastBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目2-1:テーブルの先頭行の姓セルの値が上村になっていることを確認する
            * 1)先頭行の姓セルの値が'上村'になっていること
            * 確認項目2-2:Element="tr"の50番目の子要素(＝50行目)が表示されていないことを確認する
            * 2)50行目の表示状態が'none'であること
            * 確認項目2-3:テーブルの最終行の姓セルの値が中島になっていることを確認する
            * 3)最終行の姓セルの値が'中島'になっていること
            * 確認項目2-4:現在の表示ページが「51 to 59 of 59 rows」になっていることを確認する
            * 4)現在の表示ページが'51 to 59 of 59 rows'になっていること
            * 確認項目2-5:ページ数のプルダウンが6になっていることを確認する
            * 5)ページ数のプルダウンが'6'になっていること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:nth-child(51) td:first-child');
          assert.equal(firstFamilyCell.textContent, '上村', 'GRID0402 002');

          var beforeFirstFamilyCell = testObj.doc.querySelector('tr:nth-child(50)');
          var beforeFirstFamilyCellStyle = testObj.win.getComputedStyle(beforeFirstFamilyCell).display;
          assert.equal(beforeFirstFamilyCellStyle, 'none', 'GRID0402 002');

          var lastFamilyCell = testObj.doc.querySelector('tr:nth-child(59) td:first-child');
          assert.equal(lastFamilyCell.textContent, '中島', 'GRID0402 002');

          var display = testObj.doc.querySelector('#tablesorter_pager_info');
          assert.equal(display.textContent, '51 to 59 of 59 rows', 'GRID0402 002');

          var pulldown = testObj.doc.querySelector('.gotoPage');
          assert.equal(pulldown.value, '6', 'GRID0402 002');
        },
        function () {

          // ページネーションの最終ページに移動のボタンを押下する
          var prevBtn = testObj.doc.querySelector('.prev');
          prevBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目3-1:テーブルの先頭行の姓セルの値が小柳になっていることを確認する
            * 1)先頭行の姓セルの値が'小柳'になっていること
            * 確認項目3-2:Element="tr"の40番目の子要素(＝40行目)が表示されていないことを確認する
            * 2)40行目の表示状態が'none'であること
            * 確認項目3-3:テーブルの最終行の姓セルの値が伊藤になっていることを確認する
            * 3)最終行の姓セルの値が'伊藤'になっていること
            * 確認項目3-4:Element="tr"の51番目の子要素(＝51行目)が表示されていないことを確認する
            * 4)51行目の表示状態が'none'であること
            * 確認項目3-5:現在の表示ページが「41 to 50 of 59 rows」になっていることを確認する
            * 5)現在の表示ページが'41 to 50 of 59 rows'になっていること
            * 確認項目3-6:ページ数のプルダウンが5になっていることを確認する
            * 6)ページ数のプルダウンが'5'になっていること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:nth-child(41) td:first-child');
          assert.equal(firstFamilyCell.textContent, '小柳', 'GRID0402 003');

          var beforeFirstFamilyCell = testObj.doc.querySelector('tr:nth-child(40)');
          var beforeFirstFamilyCellStyle = testObj.win.getComputedStyle(beforeFirstFamilyCell).display;
          assert.equal(beforeFirstFamilyCellStyle, 'none', 'GRID0402 003');

          var lastFamilyCell = testObj.doc.querySelector('tr:nth-child(50) td:first-child');
          assert.equal(lastFamilyCell.textContent, '伊藤', 'GRID0402 003');

          var afterLastFamilyCell = testObj.doc.querySelector('tr:nth-child(51)');
          var afterLastFamilyCellStyle = testObj.win.getComputedStyle(afterLastFamilyCell).display;
          assert.equal(afterLastFamilyCellStyle, 'none', 'GRID0402 003');

          var display = testObj.doc.querySelector('#tablesorter_pager_info');
          assert.equal(display.textContent, '41 to 50 of 59 rows', 'GRID0402 003');

          var pulldown = testObj.doc.querySelector('.gotoPage');
          assert.equal(pulldown.value, '5', 'GRID0402 003');
        },
        function () {

          // ページネーションの先頭ページに移動のボタンを押下する
          var firstBtn = testObj.doc.querySelector('.first');
          firstBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目4-1:テーブルの先頭行の姓セルの値が毛利になっていることを確認する
            * 1)先頭行の姓セルの値が'毛利'になっていること
            * 確認項目4-2:テーブルの最終行の姓セルの値が山峰になっていることを確認する
            * 2)最終行の姓セルの値が'山峰'になっていること
            * 確認項目4-3:Element="tr"の11番目の子要素(＝11行目)が表示されていないことを確認する
            * 3)11行目の表示状態が'none'であること
            * 確認項目4-4:現在の表示ページが「1 to 10 of 59 rows」になっていることを確認する
            * 4)現在の表示ページが'1 to 10 of 59 rows'になっていること
            * 確認項目4-5:ページ数のプルダウンが1になっていることを確認する
            * 5)ページ数のプルダウンが'1'になっていること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:first-child td:first-child');
          assert.equal(firstFamilyCell.textContent, '毛利', 'GRID0402 004');

          var lastFamilyCell = testObj.doc.querySelector('tr:nth-child(10) td:first-child');
          assert.equal(lastFamilyCell.textContent, '山峰', 'GRID0402 004');

          var afterLastFamilyCell = testObj.doc.querySelector('tr:nth-child(11)');
          var afterLastFamilyCellStyle = testObj.win.getComputedStyle(afterLastFamilyCell).display;
          assert.equal(afterLastFamilyCellStyle, 'none', 'GRID0402 004');

          var display = testObj.doc.querySelector('#tablesorter_pager_info');
          assert.equal(display.textContent, '1 to 10 of 59 rows', 'GRID0402 004');

          var pulldown = testObj.doc.querySelector('.gotoPage');
          assert.equal(pulldown.value, '1', 'GRID0402 004');
        },
        function () {

          // ページネーションのページ数のプルダウンから2を選択する
          var pulldown = testObj.doc.querySelector('.gotoPage');
          pulldown.selectedIndex = 1;
          pulldown.dispatchEvent(m.simulateEvent('change'));
        },
        function () {

          /**
            * 確認項目5-1:テーブルの先頭行の姓セルの値が西本になっていることを確認する
            * 1)先頭行の姓セルの値が'西本'になっていること
            * 確認項目5-2:Element="tr"の10番目の子要素(＝10行目)が表示されていないことを確認する
            * 2)10行目の表示状態が'none'であること
            * 確認項目5-3:テーブルの最終行の姓セルの値が望月になっていることを確認する
            * 3)最終行の姓セルの値が'望月'になっていること
            * 確認項目5-4:Element="tr"の21番目の子要素(＝21行目)が表示されていないことを確認する
            * 4)21行目の表示状態が'none'であること
            * 確認項目5-5:現在の表示ページが「11 to 20 of 59 rows」になっていることを確認する
            * 5)現在の表示ページが'11 to 20 of 59 rows'になっていること
            * 確認項目5-6:ページ数のプルダウンが2になっていることを確認する
            * 6)ページ数のプルダウンが'2'になっていること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:nth-child(11) td:first-child');
          assert.equal(firstFamilyCell.textContent, '西本', 'GRID0402 005');

          var beforeFirstFamilyCell = testObj.doc.querySelector('tr:nth-child(10)');
          var beforeFirstFamilyCellStyle = testObj.win.getComputedStyle(beforeFirstFamilyCell).display;
          assert.equal(beforeFirstFamilyCellStyle, 'none', 'GRID0402 005');

          var lastFamilyCell = testObj.doc.querySelector('tr:nth-child(20) td:first-child');
          assert.equal(lastFamilyCell.textContent, '望月', 'GRID0402 005');

          var afterLastFamilyCell = testObj.doc.querySelector('tr:nth-child(21)');
          var afterLastFamilyCellStyle = testObj.win.getComputedStyle(afterLastFamilyCell).display;
          assert.equal(afterLastFamilyCellStyle, 'none', 'GRID0402 005');

          var display = testObj.doc.querySelector('#tablesorter_pager_info');
          assert.equal(display.textContent, '11 to 20 of 59 rows', 'GRID0402 005');

          var pulldown = testObj.doc.querySelector('.gotoPage');
          assert.equal(pulldown.value, '2', 'GRID0402 005');
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0402 006 tablesorter形式のテーブルに対して、ページネーションの設定で1ページあたりの表示件数を設定できる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ページネーションの表示件数のプルダウンから20を選択する
          var pulldown = testObj.doc.querySelector('.pagesize');
          pulldown.selectedIndex = 1;
          pulldown.dispatchEvent(m.simulateEvent('change'));
        },
        function () {

          /**
            * 確認項目1-1:テーブルの最終行の姓セルの値が望月になっていることを確認する
            * 1)最終行の姓セルの値が'望月'になっていること
            * 確認項目1-2:Element="tr"の21番目の子要素(＝21行目)が表示されていないことを確認する
            * 2)21行目の表示状態が'none'であること
            * 確認項目1-3:現在の表示ページが「1 to 20 of 59 rows」になっていることを確認する
            * 3)現在の表示ページが'1 to 20 of 59 rows'になっていること
            */
          var firstFamilyCell = testObj.doc.querySelector('tr:nth-child(20) td:first-child');
          assert.equal(firstFamilyCell.textContent, '望月', 'GRID0402 006');

          var afterLastFamilyCell = testObj.doc.querySelector('tr:nth-child(21)');
          var afterLastFamilyCellStyle = testObj.win.getComputedStyle(afterLastFamilyCell).display;
          assert.equal(afterLastFamilyCellStyle, 'none', 'GRID0402 006');

          var display = testObj.doc.querySelector('#tablesorter_pager_info');
          assert.equal(display.textContent, '1 to 20 of 59 rows', 'GRID0402 006');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
