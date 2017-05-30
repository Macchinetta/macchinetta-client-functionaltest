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

  describe('GRID07 SlickGrid形式のテーブルに対して、コピーアンドペースト編集ができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.COPY_AND_PASTE;

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
    it('GRID0701 001 SlickGrid形式のテーブルに対して、1つのセルを用いてコピーアンドペースト編集ができる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 先頭行のTitleセルをクリックする
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:nth-child(2)');
          firstTitleCell.dispatchEvent(m.simulateEvent('click'));

          // ctrl + cキーを押下
          firstTitleCell.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: 67,
            ctrlKey: true
          }));

          // 3行目のTitleセルをクリックする
          var thirdTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(3) .slick-cell:nth-child(2)');
          thirdTitleCell.dispatchEvent(m.simulateEvent('click'));

          // ctrl + vキーを押下
          thirdTitleCell.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: 86,
            ctrlKey: true
          }));
        },
        function () {

          /**
            * 確認項目1:3行目のTitleセルの値が1行目のTitleセルの値になっていること
            * 1)3行目のTitleセルの値がが'タスク 0'になっていること
            */
          var thirdTitleCell = testObj.doc.querySelector('.active .slick-cell:nth-child(2)');
          assert.equal(thirdTitleCell.textContent, 'タスク 0', 'GRID0701 001');
        },
        function () {
          done();
        }
      ], 0);
    });

    it('GRID0701 002 SlickGrid形式のテーブルに対して、複数のセルを用いてコピーアンドペースト編集ができる', function (done) {
      this.timeout(0);
      var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:nth-child(2)');
      var firstCompleteCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:nth-child(4)');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          // 1.1行目とTitleセルから% Completeセルまで3つの値をドラッグする
          firstTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: firstTitleCell.getBoundingClientRect().right,
            clientY: firstTitleCell.getBoundingClientRect().top,
            which: 1
          }));

          firstTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: firstCompleteCell.getBoundingClientRect().right,
            clientY: firstCompleteCell.getBoundingClientRect().top,
            which: 1
          }));
          firstTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: firstCompleteCell.getBoundingClientRect().right,
            clientY: firstCompleteCell.getBoundingClientRect().top,
            which: 1
          }));

          firstTitleCell.dispatchEvent(m.simulateEvent('mouseup'));

          // 2.Ctrl＋cキーを押下する
          firstTitleCell.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: 67,
            ctrlKey: true
          }));
        },
        function () {

          // 3.3行目のDurationセルをクリックする
          var thirdTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(3) .slick-cell:nth-child(3)');
          thirdTitleCell.dispatchEvent(m.simulateEvent('click'));

          // 4.Ctrl＋vキーを押下する
          thirdTitleCell.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: 86,
            ctrlKey: true
          }));

        },
        function () {

          /**
            * 確認項目1-1:3行目のDurationセルの値が1行目のTitleセルの値になっていることを確認する
            * 1)3行目のDurationセルの値が'タスク 0'になっていること
            * 確認項目1-2:4行目のStartセルの値が1行目の% Completeセルの値になっていることを確認する
            * 2)4行目のStartセルの値が1行目の% Completeセルの値と等しいこと
            */
          var thirdDurationCell = testObj.doc.querySelector('.active .slick-cell:nth-child(3)');
          assert.equal(thirdDurationCell.textContent, 'タスク 0', 'GRID0702 001');

          var thirdStartCell = testObj.doc.querySelector('.active .slick-cell:nth-child(5)');
          var firstCompleteCellTxt = firstCompleteCell.textContent;
          assert.equal(thirdStartCell.textContent, firstCompleteCellTxt, 'GRID0702 001');
        },
        function () {
          done();
        }
      ], 100);
    });

    // ----------------------- テストケース -----------------------
  });
}());
