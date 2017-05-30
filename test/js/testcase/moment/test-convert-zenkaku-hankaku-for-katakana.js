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

  describe('CTRL07 特定文字の全角半角変換(カタカナ)ができること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.MOMENT_CONVERT_ZENKAKU_HANKAKU_FOR_KATAKANA;
    var MSG_MOMENT_CONVERT_ZENKAKU_HANKAKU_FOR_KATAKANA = 'moment-convert-zenkaku-hankaku-for-katakana.';

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
    it('CTRL0705 001 テキストボックスの値が「カキクケコ」になっていることを確認する', function (done) {
      this.timeout(0);

      var zenkakuString = testObj.doc.querySelector('#zenkaku-string');


      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 上部のテキストボックスに「ｶｷｸｹｺ」を入力する。
          zenkakuString.value = 'ｶｷｸｹｺ';
          zenkakuString.dispatchEvent(m.simulateEvent('input'));

          // 上部のテキストボックスからフォーカスを外す
          zenkakuString.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「カキクケコ」になっていることを確認する
          assert.equal(zenkakuString.value, 'カキクケコ', MSG_MOMENT_CONVERT_ZENKAKU_HANKAKU_FOR_KATAKANA);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0705 002 テキストボックスの値が「ｶｷｸｹｺ」になっていることを確認する', function (done) {
      this.timeout(0);

      var hankakuString = testObj.doc.querySelector('#hankaku-string');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 下部のテキストボックスに「カキクケコ」を入力する
          hankakuString.value = 'カキクケコ';
          hankakuString.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          hankakuString.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「ｶｷｸｹｺ」になっていることを確認する
          assert.equal(hankakuString.value, 'ｶｷｸｹｺ', MSG_MOMENT_CONVERT_ZENKAKU_HANKAKU_FOR_KATAKANA);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
