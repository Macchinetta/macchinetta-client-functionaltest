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

  describe('UICP10 jQuery UI形式でローカライズファイルを複数読み込みができること(日本語→英語)', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_DATEPICKER_LOCAL_MULTIPLE_JA_EN_GB;
    var MSG_JQUERY_UI_DATEPICKER_LOCAL_MULTIPLE_JA_EN_GB = 'jquery-ui_datepicker-locale-multiple-ja-en-GB.';
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
    it('UICP1004 002 英語で書かれたカレンダーが表示されること', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-localize-multiple-ja-en-GB');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));

        },
        function () {

          /**
            * ■確認項目1:ローカライズファイルを複数読み込んだ際、最後に読み込まれたファイルが適用されること（日本語、英語の順）を確認する
            * 1)日曜日のタイトルが'Su'であること
            */
          var localSunday = testObj.doc.querySelector('#ui-datepicker-div > table > thead > tr > th:nth-child(7) > span').textContent
          assert.equal(localSunday, 'Su', MSG_JQUERY_UI_DATEPICKER_LOCAL_MULTIPLE_JA_EN_GB);

        },
        function () {
          done();
        }
      ], 1000);
    });
  });
}());
