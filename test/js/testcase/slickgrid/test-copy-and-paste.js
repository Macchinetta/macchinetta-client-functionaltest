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
  var MSG_COPY_AND_PASTE = 'slickgrid-copy-and-paste.';

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
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:nth-child(2)');
          var thirdTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(3) .slick-cell:nth-child(2)');

          // 先頭行のTitleセルをクリックする
          firstTitleCell.dispatchEvent(m.simulateEvent('click'));

          // ctrl + cキーを押下
          firstTitleCell.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: 67,
            ctrlKey: true
          }));

          // 3行目のTitleセルをクリックする
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
          assert.equal(thirdTitleCell.textContent, 'タスク 0', MSG_COPY_AND_PASTE);
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
      var firstTitleCellRight = firstTitleCell.getBoundingClientRect().right;
      var firstTitleCellTop = firstTitleCell.getBoundingClientRect().top;
      var firstCompleteCellRight = firstCompleteCell.getBoundingClientRect().right;
      var firstCompleteCellTop = firstCompleteCell.getBoundingClientRect().top;

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * 1.1行目とTitleセルから% Completeセルまで3つの値をドラッグする
            * SlickGridテーブルのドラッグではmousemoveのイベントを2度発火する必要がある
            */
          firstTitleCell.dispatchEvent(m.simulateEvent('mousedown', {
            pageX: firstTitleCellRight,
            pageY: firstTitleCellTop,
            which: 1
          }));
          firstTitleCell.dispatchEvent(m.simulateEvent('mousemove', {}));
          firstTitleCell.dispatchEvent(m.simulateEvent('mousemove', {
            pageX: firstCompleteCellRight,
            pageY: firstCompleteCellTop,
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
          var thirdTitleCell = testObj.doc.querySelector('.ui-widget-content:nth-child(3) .slick-cell:nth-child(3)');

          // 3.3行目のDurationセルをクリックする
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
            * 確認項目1-2:3行目のStartセルの値が1行目の% Completeセルの値になっていることを確認する
            * 2)4行目のStartセルの値が1行目の% Completeセルの値と等しいこと
            */
          var thirdDurationCell = testObj.doc.querySelector('.active .slick-cell:nth-child(3)');
          assert.equal(thirdDurationCell.textContent, 'タスク 0', MSG_COPY_AND_PASTE);

          var thirdStartCell = testObj.doc.querySelector('.active .slick-cell:nth-child(5)');
          var firstCompleteCellTxt = firstCompleteCell.textContent;
          assert.equal(thirdStartCell.textContent, firstCompleteCellTxt, MSG_COPY_AND_PASTE);
        },
        function () {
          done();
        }
      ], 100);
    });

    // ----------------------- テストケース -----------------------
  });
}());
