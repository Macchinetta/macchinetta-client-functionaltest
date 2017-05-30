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

  describe('UICP04 Bootstrap形式のパンくずリストが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_BREADCRUMB;

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
    it('UICP0401 001 パンくずリストが利用できる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /** ■確認項目1:li要素の上部が同じ位置であることを確認する
            * 1)li要素三つの上部座標が等しいこと
            */
          var breadcrumbLiNo1 = testObj.doc.querySelector('.breadcrumb li:nth-child(1)');
          var breadcrumbLiNo1Top = breadcrumbLiNo1.getBoundingClientRect().top;

          var breadcrumbLiNo2 = testObj.doc.querySelector('.breadcrumb li:nth-child(2)');
          var breadcrumbLiNo2Top = breadcrumbLiNo2.getBoundingClientRect().top;

          var breadcrumbLiNo3 = testObj.doc.querySelector('.breadcrumb li:nth-child(3)');
          var breadcrumbLiNo3Top = breadcrumbLiNo3.getBoundingClientRect().top;

          assert.equal(breadcrumbLiNo1Top, breadcrumbLiNo2Top, 'UICP0301 001');
          assert.equal(breadcrumbLiNo1Top, breadcrumbLiNo3Top, 'UICP0301 001');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
