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
  var MSG_COL_NO_SORT = 'slickgrid-col-no-sort.';

  describe('GRID06 SlickGrid形式のテーブルに対して、指定のカラムの入れ替えを無効にできる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.COL_NO_SORT;

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
    it('GRID0602 001 SlickGrid形式のテーブルに対して、指定のカラムの入れ替えを無効にできる', function (done) {
      this.timeout(0);
      var titleHeader1 = testObj.doc.querySelector('.slick-header-column:nth-child(1)');
      var titleHeader2 = testObj.doc.querySelector('.slick-header-column:nth-child(2)');

      // ドラッグスタートとなる座標を取得
      var titleHeader1Left = titleHeader1.getBoundingClientRect().left;
      var titleHeader1Top = titleHeader1.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      var titleHeader2Right = titleHeader2.getBoundingClientRect().right;
      var titleHeader2Top = titleHeader2.getBoundingClientRect().top;

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ヘッダのTitleセルをDurationセルの右横にドラッグ＆ドロップする
          titleHeader1.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: titleHeader1Left,
            clientY: titleHeader1Top,
            which: 1
          }));
          titleHeader1.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: titleHeader2Right,
            clientY: titleHeader2Top,
            which: 1
          }));
          titleHeader1.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          /**
            * 確認項目1:カラムの入れ替えができないことを確認する
            * 1)2行目のTitle列の値が'タスク 0'になっていること
            * 2)2行目のDuration列の値が'5 days'になっていること
            */
          var titleCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:first-child');
          assert.equal(titleCell.textContent, 'タスク 0', MSG_COL_NO_SORT);

          var durationCell = testObj.doc.querySelector('.ui-widget-content:first-child .slick-cell:nth-child(2)');
          assert.equal(durationCell.textContent, '5 days', MSG_COL_NO_SORT);
        },
        function () {
          done();
        }
      ], 1000);
    });

    // ----------------------- テストケース -----------------------
  });
}());
