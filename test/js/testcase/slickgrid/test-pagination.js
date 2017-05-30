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

  describe('GRID04 SlickGrid形式のテーブルに対して、ページネーションの利用ができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.PAGENATION;

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
    it('GRID0401 001-004 SlickGrid形式のテーブルに対して、ページネーションの設定でページの移動ができる', function (done) {
      this.timeout(0);

      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ページネーションの次ページに移動のボタンを押下する
          var nextBtn = testObj.doc.querySelector('.ui-icon-seek-next');
          nextBtn.dispatchEvent(m.simulateEvent('click'));

        },
        function () {

          /**
            * 確認項目1-1:テーブルの先頭行のTitleセルの値がタスク25になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 25'になっていること
            */
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstTitleCell.textContent, 'タスク 25', 'GRID0401 001');

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目1-2:テーブルの最終行のTitleセルの値がタスク49になっていることを確認する
            * 2)最終行のTitleセルの値が'タスク 49'になっていること
            * 確認項目1-3:現在の表示ページが「Showing page 2 of  20」になっていることを確認する
            * 3)現在の表示ページが'Showing page 2 of 20'になっていること
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 49', 'GRID0401 001');

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 2 of 20', 'GRID0401 001');

          // スクロール位置を元に戻す
          table.scrollTop = 0;
        },
        function () {

          // ページネーションの最後のページに移動のボタンを押下する
          var endBtn = testObj.doc.querySelector('.ui-icon-seek-end');
          endBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目2-1:テーブルの先頭行のTitleセルの値がタスク475になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 475'になっていること
            */
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstTitleCell.textContent, 'タスク 475', 'GRID0401 002');

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目2-2:テーブルの最終行のTitleセルの値がタスク499になっていることを確認する
            * 2)最終行のTitleセルの値が'タスク 499'になっていること
            * 確認項目2-3:現在の表示ページが「Showing page 20 of  20」になっていることを確認する
            * 3)現在の表示ページが'Showing page 20 of 20'になっていること
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 499', 'GRID0401 002');

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 20 of 20', 'GRID0401 002');

          // スクロール位置を元に戻す
          table.scrollTop = 0;
        },
        function () {

          // ページネーションの前のページに移動のボタンを押下する
          var prevBtn = testObj.doc.querySelector('.ui-icon-seek-prev');
          prevBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目3-1:テーブルの先頭行のTitleセルの値がタスク450になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 450'になっていること
            */
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstTitleCell.textContent, 'タスク 450', 'GRID0401 003');

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目3-2:テーブルの最終行のTitleセルの値がタスク474になっていることを確認する
            * 2)最終行のTitleセルの値が'タスク 474'になっていること
            * 確認項目3-3:現在の表示ページが「Showing page 19 of 20になっていることを確認する
            * 3)現在の表示ページが'Showing page 19 of 20'になっていること
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 474', 'GRID0401 003');

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 19 of 20', 'GRID0401 003');

          // スクロール位置を元に戻す
          table.scrollTop = 0;
        },
        function () {

          // ページネーションの最初のページに移動のボタンを押下する
          var firstBtn = testObj.doc.querySelector('.ui-icon-seek-first');
          firstBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目4-1:テーブルの先頭行のTitleセルの値がタスク0になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 0'になっていること
            */
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstTitleCell.textContent, 'タスク 0', 'GRID0401 004');

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目4-2:テーブルの最終行のTitleセルの値がタスク24になっていることを確認する
            * 2)最終行のTitleセルの値が'タスク 474'になっていること
            * 確認項目4-3:現在の表示ページが「Showing page 1 of 20になっていることを確認する
            * 3)現在の表示ページが'Showing page 1 of 20'になっていること
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 24', 'GRID0401 004');

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 1 of 20', 'GRID0401 004');

          // スクロール位置を元に戻す
          table.scrollTop = 0;
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0401 005-008 SlickGrid形式のテーブルに対して、ページネーションの設定で1ページあたりの表示件数を設定できる', function (done) {
      this.timeout(0);

      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目1-1:テーブルの最終行のTitleセルの値がタスク24になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 24'になっていること
            * 確認項目1-2:現在の表示ページが「Showing page 1 of  20」になっていることを確認する
            * 2)現在の表示ページが'Showing page 1 of 20'になっていること
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 24', 'GRID0402 001');

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 1 of 20', 'GRID0402 001');

          // スクロール位置を元に戻す
          table.scrollTop = 0;
        },
        function () {

          // ページ件数を50に変更する
          var page50 = testObj.doc.querySelector('.slick-pager-settings-expanded a:nth-child(4)');
          page50.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目2-1:テーブルの最終行のTitleセルの値がタスク49になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 49'になっていること
            * 確認項目2-2:現在の表示ページが「Showing page 1 of  10」になっていることを確認する
            * 2)現在の表示ページが'Showing page 1 of 10'になっていること
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 49', 'GRID0402 002');

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 1 of 10', 'GRID0402 002');

          // スクロール位置を元に戻す
          table.scrollTop = 0;
        },
        function () {

          // ページ件数をAllに変更する
          var pageAll = testObj.doc.querySelector('.slick-pager-settings-expanded a:first-child');
          pageAll.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目3-1:テーブルの最終行のTitleセルの値がタスク499になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 499'になっていること
            * 確認項目3-2:現在の表示ページが「Showing all 500 rows」になっていることを確認する
            * 2)現在の表示ページが'Showing all 500 rows'になっていること
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 499', 'GRID0402 003');

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing all 500 rows', 'GRID0402 003');

          // スクロール位置を元に戻す
          table.scrollTop = 0;
        },
        function () {

          // ページ件数をAutoに変更する
          var pageAuto = testObj.doc.querySelector('.slick-pager-settings-expanded a:nth-child(2)');
          pageAuto.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目4-1:テーブルの最終行のTitleセルの値がタスク18になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 18'になっていること
            * 確認項目4-2:現在の表示ページが「Showing page 1 of 27」になっていることを確認する
            * 2)現在の表示ページが'Showing page 1 of 27'になっていること
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 18', 'GRID0402 004');

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 1 of 27', 'GRID0402 004');

          // スクロール位置を元に戻す
          table.scrollTop = 0;
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0401 009 SlickGrid形式のテーブルに対して、ページネーションの表示件数のON-OFFが切り替えることができる', function (done) {
      this.timeout(0);

      var onOffBtn = testObj.doc.querySelector('.ui-icon-lightbulb');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ページネーションのON－OFFボタンをクリックする
          onOffBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目1:ページネーションの表示件数がOFFになっていることを確認する
            * 1)ページネーションの表示状態が'none'であること
            */
          var display = testObj.doc.querySelector('.slick-pager-settings-expanded');
          assert.equal(display.style.display, 'none', 'GRID0403 001');
        },
        function () {

          // ページネーションのON－OFFボタンをクリックする
          onOffBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目2:ページネーションの表示件数がONになっていることを確認する
            * 1)ページネーションの表示状態が'inline'であること
            */
          var display = testObj.doc.querySelector('.slick-pager-settings-expanded');
          assert.equal(display.style.display, 'inline', 'GRID0403 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
