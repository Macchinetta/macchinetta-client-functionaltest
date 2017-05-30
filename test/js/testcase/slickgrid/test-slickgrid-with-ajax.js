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

  describe('GRID08 SlickGrid形式で非同期通信が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.SLICKGRID_WITH_AJAX;
    var MSG_SLICKGRID_WITH_AJAX = 'slickgrid-with-ajax.';

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
    it('GRID0801 001 スクロールをする際、表示範囲のデータを画面に表示できること。', function (done) {
      this.timeout(0);

      var table = testObj.doc.querySelector('.slick-viewport');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {

            /**
              * 確認項目1-1:グリッドの一番下の行の二列目の値をスクロールする前に確認する
              * 1)グリッドの一番下の行の二列目の値が'28 days'であること
              */
            var lastTitleCell = testObj.doc.querySelector('#myGrid > div.slick-viewport > div > div:last-child > div.slick-cell:nth-child(2)');
            assert.equal(lastTitleCell.textContent, '28 days', MSG_SLICKGRID_WITH_AJAX);
          },
          delay:1000
        },
        {
          fn: function () {
            table.scrollTop = 450;
          }
        },
        {
          fn: function () {

            /**
              * 確認項目1-2:グリッドの一番下の行の二列目の値をスクロールした後に確認する
              * 1)グリッドの一番下の行の二列目の値が'43 days'であること
              */
            var lastTitleCell = testObj.doc.querySelector('#myGrid > div.slick-viewport > div > div:last-child > div.slick-cell:nth-child(2)');
            assert.equal(lastTitleCell.textContent, '43 days', MSG_SLICKGRID_WITH_AJAX);
            done();
          },
          delay:1000
        }
      ], 3000);
    });

    // ----------------------- テストケース -----------------------
  });
}());
