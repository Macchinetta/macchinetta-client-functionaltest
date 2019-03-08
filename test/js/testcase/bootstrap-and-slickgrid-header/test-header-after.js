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

  describe('APND01 BootstrapとSlickGridを同時使用時にテーブルを正しく表示する', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.HEADER_AFTER;

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
    it('APND0102 001 BootstrapとSlickGridを同時使用時にテーブルを正しく表示する', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.初期表示
          // テーブルヘッダ6列目のエレメントから、絶対座標(右側)を取得する。
          var rightHeaderPosition = testObj.doc.querySelector('[id$=\'effort-driven\']')
            .getBoundingClientRect().right;

          // テーブルデータ6列目のエレメントから、絶対座標(右側)を取得する。
          // (エレメントが複数取得される場合、最初のエレメントのみ取得する。)
          var rightDataPosition = testObj.doc.querySelector('.r5')
            .getBoundingClientRect().right;

          // テーブルヘッダのエレメントから、高さを取得する。
          var heightHeader = testObj.doc.getElementsByClassName('slick-header')[0].clientHeight;

          // ■確認項目1
          // テーブルヘッダ6列目のエレメントから取得する絶対座標(右側)と
          // テーブルデータ6列目のエレメントから取得する絶対座標(右側)が同じであることを確認する。
          // かつ、
          // テーブルヘッダのエレメントから取得した高さが 24(px) であることを確認する。
          var isCorrectRightPosition = (rightHeaderPosition === rightDataPosition) ? true : false;
          var isCorrectHeight = (heightHeader === 24) ? true : false;
          assert.isTrue((isCorrectRightPosition === true && isCorrectHeight === true), 'APND0102 001');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
