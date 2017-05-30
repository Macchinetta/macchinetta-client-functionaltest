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

  describe('APND01 SlickGridのテーブルをタブ内に表示する際テーブルの表示が崩れる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.TAB_BEFORE;

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
    it('APND0103 001 SlickGridのテーブルをタブ内に表示する際テーブルの表示が崩れる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.初期表示

          // タブのエレメントを取得する。
          var tabs = testObj.doc.querySelectorAll('a');

          // 2.タブ2のリンクを押下する
          tabs[1].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目1
          // テーブルデータ6列目のエレメントを取得する。(複数取得される場合、最初のエレメントのみ取得する。)
          var td = testObj.doc.querySelector('.r5');

          // テーブルデータ6列目のエレメントが存在しないことを確認する。
          assert.isNull(td, 'APEND0103 001');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
