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

  describe('UICP12 Bootstrap形式のプログレスバーを利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_PROGRESSBAR;

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
    it('UICP1203 001-002 プログレスバーを利用できる', function (done) {
      this.timeout(0);
      var progressBar = testObj.doc.querySelector('#progressbar');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {

            // 1.初期表示
            /**
              * ■確認項目1:プログレスバーが0%で表示されることを確認する
              * 1)プログレスバーのwidthが''であること
              */
            var progressBarStyleDdisplay = progressBar.style.width;
            assert.equal(progressBarStyleDdisplay, '', 'UICP0901 001');
          }
        },
        {

          // 2.プログレスバーが100％になるのに必要な時間待機する
          fn: function () {

            /**
              * ■確認項目2:プログレスバーが100%で表示されることを確認する
              * 1)プログレスバーのwidthが'100%'であること
              */
            var progressBarStyleDdisplay = progressBar.style.width;
            assert.equal(progressBarStyleDdisplay, '100%', 'UICP0901 002');
            done();
          },
          delay: 12000
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
