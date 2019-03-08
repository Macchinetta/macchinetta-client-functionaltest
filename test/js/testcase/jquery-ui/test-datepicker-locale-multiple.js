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

  describe('UICP10 jQuery UI形式でローカライズファイルを複数読み込みができること(英語→日本語)', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_DATEPICKER_LOCAL_MULTIPLE;
    var MSG_JQUERY_UI_DATEPICKER_LOCAL_MULTIPLE = 'jquery-ui_datepicker-locale-multiple.';
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
    it('UICP1004 001 日本語で書かれたカレンダーが表示されること', function (done) {
      this.timeout(0);
      var textBox = testObj.doc.querySelector('#jquery-ui-datepicker-localize-multiple-en-GB-ja');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // テキストエリアにフォーカスをあてる
          textBox.dispatchEvent(m.simulateEvent('focus'));

        },
        function () {

          /**
            * ■確認項目1:ローカライズファイルを複数読み込んだ際、最後に読み込まれたファイルが適用されること（英語、日本語の順）を確認する
            * 1)日曜日のタイトルが'日'であること
            */
          var localSunday = testObj.doc.querySelector('#ui-datepicker-div > table > ' +
          'thead > tr > th:nth-child(1) > span').textContent;
          assert.equal(localSunday, '日', MSG_JQUERY_UI_DATEPICKER_LOCAL_MULTIPLE);

        },
        function () {
          done();
        }
      ], 1000);
    });
  });
}());
