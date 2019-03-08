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
  var MSG_COL_SORT = 'slickgrid-col-sort.';

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

          // ヘッダのTitleセルをDurationセルの右横にドラッグ＆ドロップする
          titleHeader1.dispatchEvent(m.simulateEvent('mousedown', {
            pageX: titleHeader1Left,
            pageY: titleHeader1Top,
            which: 1
          }));
          titleHeader1.dispatchEvent(m.simulateEvent('mousemove', {
            pageX: titleHeader2Right - 1,
            pageY: titleHeader2Top,
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
          assert.equal(durationCell.textContent, '5 days', MSG_COL_SORT);

          var titleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:nth-child(2)');
          assert.equal(titleCell.textContent, 'タスク 0', MSG_COL_SORT);
        },
        function () {

          // ヘッダのTitleセルをDurationセルの左横にドラッグ＆ドロップする
          titleHeader1 = testObj.doc.querySelector('.slick-header-column:nth-child(2)');
          titleHeader1.dispatchEvent(m.simulateEvent('mousedown', {
            pageX: titleHeader2Left,
            pageY: titleHeader2Top,
            which: 1
          }));
          titleHeader1.dispatchEvent(m.simulateEvent('mousemove', {
            pageX: titleHeader1Left,
            pageY: titleHeader1Top,
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
          assert.equal(durationCell.textContent, 'タスク 0', MSG_COL_SORT);

          var titleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:nth-child(2)');
          assert.equal(titleCell.textContent, '5 days', MSG_COL_SORT);
        },
        function () {
          done();
        }
      ], 1000);
    });

    // ----------------------- テストケース -----------------------
  });
}());
