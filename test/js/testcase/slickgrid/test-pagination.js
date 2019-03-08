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

  describe('GRID04 SlickGrid形式のテーブルに対して、ページネーションの利用ができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.PAGENATION;
    var MSG_SLICKGRID_PAGINATION = 'slickgrid_pagination.';

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
    it('GRID0401 001 「▶>」ボタンで次のページに移動できること', function (done) {
      this.timeout(0);

      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 「▶>」ボタンを押下する
          var nextBtn = testObj.doc.querySelector('.ui-icon-seek-next');
          nextBtn.dispatchEvent(m.simulateEvent('click'));

        },
        function () {

          /**
            * 確認項目1:テーブルの先頭行のTitleセルの値がタスク25になっていることを確認する
            * 1)先頭行のTitleセルの値が'タスク 25'になっていること
            */
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstTitleCell.textContent, 'タスク 25', MSG_SLICKGRID_PAGINATION);
        },
        function () {

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目2-1:テーブルの最終行のTitleセルの値がタスク49になっていることを確認する
            * 確認項目2-2:現在の表示ページが「Showing page 2 of  20」になっていることを確認する
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 49', MSG_SLICKGRID_PAGINATION);

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 2 of 20', MSG_SLICKGRID_PAGINATION);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0401 002 「▶|」ボタンで最後のページに移動できること', function (done) {
      this.timeout(0);

      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 「▶|」ボタンを押下する
          var endBtn = testObj.doc.querySelector('.ui-icon-seek-end');
          endBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目1:テーブルの先頭行のTitleセルの値がタスク475になっていることを確認する
            */
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstTitleCell.textContent, 'タスク 475', MSG_SLICKGRID_PAGINATION);
        },
        function () {

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目2-1:テーブルの最終行のTitleセルの値がタスク499になっていることを確認する
            * 確認項目2-2:現在の表示ページが「Showing page 20 of  20」になっていることを確認する
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 499', MSG_SLICKGRID_PAGINATION);

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 20 of 20', MSG_SLICKGRID_PAGINATION);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0401 003 「<◀」ボタンで前のページに移動できること', function (done) {
      this.timeout(0);

      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 「▶|」ボタンを押下する
          var endBtn = testObj.doc.querySelector('.ui-icon-seek-end');
          endBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // 「<◀」ボタンを押下する
          var prevBtn = testObj.doc.querySelector('.ui-icon-seek-prev');
          prevBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目1:テーブルの先頭行のTitleセルの値がタスク450になっていることを確認する
            */
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstTitleCell.textContent, 'タスク 450', MSG_SLICKGRID_PAGINATION);
        },
        function () {

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目2-1:テーブルの最終行のTitleセルの値がタスク474になっていることを確認する
            * 確認項目2-2:現在の表示ページが「Showing page 19 of 20になっていることを確認する
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 474', MSG_SLICKGRID_PAGINATION);

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 19 of 20', MSG_SLICKGRID_PAGINATION);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0401 004 「|◀」ボタンで最初のページに移動できること', function (done) {
      this.timeout(0);

      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 「▶|」ボタンを押下する
          var endBtn = testObj.doc.querySelector('.ui-icon-seek-end');
          endBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // 「|◀」ボタンを押下する
          var firstBtn = testObj.doc.querySelector('.ui-icon-seek-first');
          firstBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目1:テーブルの先頭行のTitleセルの値がタスク0になっていることを確認する
            */
          var firstTitleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(firstTitleCell.textContent, 'タスク 0', MSG_SLICKGRID_PAGINATION);
        },
        function () {

          // SlickGridのテーブルでは、画面表示外のデータはHTMLタグが生成されていないことがある。(スクロール位置に応じてタグを生成する。)
          // そのため、最終行のデータを取得するために、スクロールを一番下まで移動させる
          table.scrollTop = table.scrollHeight;
        },
        function () {

          /**
            * 確認項目2-1:テーブルの最終行のTitleセルの値がタスク24になっていることを確認する
            * 確認項目2-2:現在の表示ページが「Showing page 1 of 20になっていることを確認する
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 24', MSG_SLICKGRID_PAGINATION);

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 1 of 20', MSG_SLICKGRID_PAGINATION);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0401 005 初期表示の際、表示件数が25件に設定されていること', function (done) {
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
            * 確認項目1-2:現在の表示ページが「Showing page 1 of  20」になっていることを確認する
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 24', MSG_SLICKGRID_PAGINATION);

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 1 of 20', MSG_SLICKGRID_PAGINATION);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0401 006 表示件数を50件に設定できること', function (done) {
      this.timeout(0);

      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 表示件数50のリンクをクリックする
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
            * 確認項目1-1:テーブルの最終行のTitleセルの値がタスク49になっていることを確認する
            * 確認項目1-2:現在の表示ページが「Showing page 1 of  10」になっていることを確認する
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 49', MSG_SLICKGRID_PAGINATION);

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 1 of 10', MSG_SLICKGRID_PAGINATION);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0401 007 表示件数を全件に設定できること', function (done) {
      this.timeout(0);

      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 表示件数Ａｌｌのリンクをクリックする
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
            * 確認項目1-1:テーブルの最終行のTitleセルの値がタスク499になっていることを確認する
            * 確認項目1-2:現在の表示ページが「Showing all 500 rows」になっていることを確認する
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 499', MSG_SLICKGRID_PAGINATION);

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing all 500 rows', MSG_SLICKGRID_PAGINATION);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0401 008 表示件数を自動に設定できること', function (done) {
      this.timeout(0);

      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 表示件数Ａｕｔｏのリンクをクリックする
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
            * 確認項目1-1:テーブルの最終行のTitleセルの値がタスク18になっていることを確認する
            * 確認項目1-2:現在の表示ページが「Showing page 1 of 27」になっていることを確認する
            */
          var lastTitleCell = testObj.doc.querySelector('.ui-widget-content:last-child .slick-cell:first-child');
          assert.equal(lastTitleCell.textContent, 'タスク 18', MSG_SLICKGRID_PAGINATION);

          var pageStatus = testObj.doc.querySelector('.slick-pager-status');
          assert.equal(pageStatus.textContent, 'Showing page 1 of 27', MSG_SLICKGRID_PAGINATION);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('GRID0401 009 表示件数設定のON-OFF切り替えができること', function (done) {
      this.timeout(0);

      var onOffBtn = testObj.doc.querySelector('.ui-icon-lightbulb');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 表示件数ON－OFFボタンをクリックする
          onOffBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目1:表示件数設定がOFFになっていることを確認する
            * 1)表示件数設定の表示状態が'none'であること
            */
          var setPageNum = testObj.doc.querySelector('.slick-pager-settings-expanded');
          assert.equal(testObj.win.getComputedStyle(setPageNum).display, 'none', MSG_SLICKGRID_PAGINATION);
        },
        function () {

          // 表示件数ON－OFFボタンをクリックする
          onOffBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目2:表示件数設定がONになっていることを確認する
            * 1)表示件数設定の表示状態が'inline'であること
            */
          var setPageNum = testObj.doc.querySelector('.slick-pager-settings-expanded');
          assert.equal(testObj.win.getComputedStyle(setPageNum).display, 'inline', MSG_SLICKGRID_PAGINATION);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
