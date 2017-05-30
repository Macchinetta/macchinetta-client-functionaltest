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

  describe('GRID06 SlickGrid形式のテーブルに対して、カラムの並び替えができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.COL_SORT;

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
    it('GRID0601 001-002 SlickGrid形式のテーブルに対して、カラムの並び替えができる', function (done) {
      this.timeout(0);
      var titleHeader1 = testObj.doc.querySelector('.slick-header-column:nth-child(1)');
      var titleHeader2 = testObj.doc.querySelector('.slick-header-column:nth-child(2)');

      // ドラッグスタートとなる座標を取得
      var titleHeader1Left = titleHeader1.getBoundingClientRect().left;
      var titleHeader1Top = titleHeader1.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      var titleHeader2Right = titleHeader2.getBoundingClientRect().right;
      var titleHeader2Top = titleHeader2.getBoundingClientRect().top;

      // 試験2で使用するドラッグスタートとなる座標
      var titleHeader2Left = titleHeader2.getBoundingClientRect().left;

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },
        function () {

          // ヘッダのTitleセルをDurationセルの右横にドラッグ＆ドロップする
          titleHeader1.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: titleHeader1Left,
            clientY: titleHeader1Top,
            which: 1
          }));
          titleHeader1.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: titleHeader2Right - 1,
            clientY: titleHeader2Top,
            which: 1
          }));
          titleHeader1.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          /**
            * 確認項目1-1:1列目のヘッダの値がDurationになっていることを確認する
            * 1)2行目のDuration列の値が'5 days'になっていること
            * 確認項目1-2:2列目のヘッダの値がTitleになっていることを確認する
            * 2)2行目のTitle列の値が'タスク 0'になっていること
            */
          var durationCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(durationCell.textContent, '5 days', 'GRID0601 001');

          var titleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:nth-child(2)');
          assert.equal(titleCell.textContent, 'タスク 0', 'GRID0601 001');
        },
        function () {

          // ヘッダのTitleセルをDurationセルの左横にドラッグ＆ドロップする
          titleHeader1 = testObj.doc.querySelector('.slick-header-column:nth-child(2)');
          titleHeader1.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: titleHeader2Left,
            clientY: titleHeader2Top,
            which: 1
          }));
          titleHeader1.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: titleHeader1Left,
            clientY: titleHeader1Top,
            which: 1
          }));
          titleHeader1.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          /**
            * 確認項目2-1:1列目のヘッダの値がTitleになっていることを確認する
            * 1)2行目のDuration列の値が'タスク 0'になっていること
            * 確認項目2-2:2列目のヘッダの値がDurationになっていることを確認する
            * 2)2行目のTitle列の値が'5 days'になっていること
            */
          var durationCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(durationCell.textContent, 'タスク 0', 'GRID0601 002');

          var titleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:nth-child(2)');
          assert.equal(titleCell.textContent, '5 days', 'GRID0601 002');
        },
        function () {
          done();
        }
      ], 1000);
    });

    // ----------------------- テストケース -----------------------
  });
}());
