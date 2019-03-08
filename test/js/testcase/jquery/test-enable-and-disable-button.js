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

  describe('CTRL03 jQuery形式のボタンの活性状態を変更できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.ENABLE_AND_DISABLE_BUTTON;

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
    it('CTRL0301 001-002 ボタンの活性状態を変更できる', function (done) {
      this.timeout(0);

      var checkBox = testObj.doc.querySelector('#check');
      var submitButton = testObj.doc.querySelector('#submit');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 1.初期状態
          /**
            * 確認項目1:送信ボタンが非活性状態であることを確認する
            * 1)送信ボタンのdisabled属性がtureであること
            */
          var buttonDisabled = submitButton.disabled;
          assert.isTrue(buttonDisabled, 'CTRL0301 001');
        },
        function () {

          // 2.チェックボックスを選択状態にする
          checkBox.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 確認項目2:送信ボタンが活性状態であることを確認する
            * 1)送信ボタンのdisabled属性がfalseであること
            */
          var buttonDisabled = submitButton.disabled;
          assert.isFalse(buttonDisabled, 'CTRL0301 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
