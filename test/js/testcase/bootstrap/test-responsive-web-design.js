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

  describe('UICP14 Bootstrap形式のレスポンシブルウェブデザインが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_RESPONSIVE_WEB_DESIGN;

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
    it('UICP1401 001-002 レスポンシブルデザインが適用できる', function (done) {
      this.timeout(0);

      var sideContents = testObj.doc.querySelector('.side');
      var mainContents = testObj.doc.querySelector('.contents');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 1.フレームサイズを1024×600に変更する
          testObj.sandboxEl.width = 1024;
          testObj.sandboxEl.height = 600;
        },
        function () {

          /**
            * ■確認項目1:サイドコンテンツとメインコンテンツの上座標が同じであることを確認する
            * 1)サイドコンテンツとメインコンテンツの上座標が等しいこと
            */
          var sideContentsTop = sideContents.getBoundingClientRect().top;
          var mainContentsTop = mainContents.getBoundingClientRect().top;
          assert.equal(sideContentsTop, mainContentsTop, 'UICP1101 001');
        },
        function () {

          // 2.フレームサイズを640×600に変更する
          testObj.sandboxEl.width = 640;
          testObj.sandboxEl.height = 600;
        },
        function () {

          /**
            * ■確認項目2:サイドコンテンツとメインコンテンツの左座標が同じであることを確認する
            * 1)サイドコンテンツとメインコンテンツの左座標が等しいこと
            */
          var sideContentsLeft = sideContents.getBoundingClientRect().left;
          var mainContentsLeft = mainContents.getBoundingClientRect().left;
          assert.equal(sideContentsLeft, mainContentsLeft, 'UICP1101 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
