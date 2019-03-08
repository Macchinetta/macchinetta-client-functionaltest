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

  describe('GRID03 tablesorter形式のテーブルに対して、ヘッダを固定したデータのスクロールができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.FIXED_HEADER_TS;

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
    it('GRID0302 001 tablesorter形式のテーブルに対して、JavaScriptによってテーブルのスクロールの位置を直接書き換える(ScrollTop)', function (done) {
      this.timeout(0);

      // デーブルオブジェクトを取得
      var table = testObj.doc.querySelector('.tablesorter-scroller-table');

      // スクロール前のヘッダの上部座標を取得
      var topHeaderPosition = testObj.doc.querySelector('th:first-child').getBoundingClientRect().top;

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // スクロールバーを一番下まで動かす
          table.scrollTop = 1000;
        },
        function () {

          /**
            * 確認項目1-1:ヘッダの上部位置座標がスクロール前後で変更されていないことを確認する
            * 1)ヘッダの上部位置座標がスクロール前後で変更されていないこと
            * 確認項目1-2:スクロールバーが一番下まで移動したことを確認する
            * 2)スクロールバーが一番下まで移動したこと
            */
          var topHeaderCell = testObj.doc.querySelector('th:first-child');
          assert.equal(topHeaderCell.getBoundingClientRect().top, topHeaderPosition, 'GRID0302 001');

          var position = table.scrollHeight - table.clientHeight;
          assert.equal(table.scrollTop, position, 'GRID0302 001');
        },
        function () {
          done();
        }
      ], 300);
    });

    // ----------------------- テストケース -----------------------
  });
}());
