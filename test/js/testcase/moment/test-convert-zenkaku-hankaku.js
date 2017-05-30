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

  describe('CTRL07 特定文字の全角半角変換(英数字＋記号)ができること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.MOMENT_CONVERT_ZENKAKU_HANKAKU;
    var MSG_MOMENT_CONVERT_ZENKAKU_HANKAKU = 'moment-convert-zenkaku-hankaku.';

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
    it('CTRL0704 001 テキストボックスの値が「ＤＥＦｇｈｉ４５６　（）」になっていることを確認する', function (done) {
      this.timeout(0);

      var zenkakuString = testObj.doc.querySelector('#zenkaku-string');


      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 上部のテキストボックスに「DEFghi456 ()」と入力する。
          zenkakuString.value = 'DEFghi456 ()';
          zenkakuString.dispatchEvent(m.simulateEvent('input'));

          // 上部のテキストボックスからフォーカスを外す
          zenkakuString.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「ＤＥＦｇｈｉ４５６　（）」になっていることを確認する
          assert.equal(zenkakuString.value, 'ＤＥＦｇｈｉ４５６　（）', MSG_MOMENT_CONVERT_ZENKAKU_HANKAKU);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0704 002 テキストボックスの値が「あいうえ＃＄％＆」になっていることを確認する', function (done) {
      this.timeout(0);

      var zenkakuString = testObj.doc.querySelector('#zenkaku-string');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 上部のテキストボックスに「あいうえ#$%&」を入力する
          zenkakuString.value = 'あいうえ#$%&';
          zenkakuString.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          zenkakuString.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「あいうえ＃＄％＆」になっていることを確認する
          assert.equal(zenkakuString.value, 'あいうえ＃＄％＆', MSG_MOMENT_CONVERT_ZENKAKU_HANKAKU);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0704 003 テキストボックスの値が「DEFghi456 ()」になっていることを確認する', function (done) {
      this.timeout(0);

      var hankakuString = testObj.doc.querySelector('#hankaku-string');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 下部のテキストボックスに「ＤＥＦｇｈｉ４５６　（）」と入力する。
          hankakuString.value = 'ＤＥＦｇｈｉ４５６　（）';
          hankakuString.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          hankakuString.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「DEFghi456 ()」になっていることを確認する
          assert.equal(hankakuString.value, 'DEFghi456 ()', MSG_MOMENT_CONVERT_ZENKAKU_HANKAKU);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0704 004 テキストボックスの値が「あいうえ#$%&」になっていることを確認する', function (done) {
      this.timeout(0);

      var hankakuString = testObj.doc.querySelector('#hankaku-string');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 下部のテキストボックスに「ＡＢＣａｂｃ１２３　（）」と入力する。
          hankakuString.value = 'あいうえ＃＄％＆';
          hankakuString.dispatchEvent(m.simulateEvent('input'));

          // テキストボックスからフォーカスを外す
          hankakuString.dispatchEvent(m.simulateEvent('blur'));

        },

        function () {

          // テキストボックスの値が「あいうえ#$%&」になっていることを確認する
          assert.equal(hankakuString.value, 'あいうえ#$%&', MSG_MOMENT_CONVERT_ZENKAKU_HANKAKU);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());