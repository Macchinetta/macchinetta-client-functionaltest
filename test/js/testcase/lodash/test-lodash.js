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

  // message用定数定義
  var MSG_LODASH = 'lodash.';

  describe('APND02 Lodashによるコーディング支援', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.LODASH;

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
    it('APND0201 001 リストの全ての要素に対して繰り返し処理ができ、テンプレートエンジンが使用できる', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {
          var txtBoxes = testObj.doc.querySelectorAll('div > input');

          // 1.初期表示
          /**
            * ■確認項目1-1:リストの全ての要素に対して繰り返し処理ができていること
            * 1)テキストボックスの値が'1,2,3'であること
            * ■確認項目1-2:リスト要素のうち条件に一致した値だけを取り出すことができていること
            * 2)テキストボックスの値が'2,4,6'であること
            * ■確認項目1-3:リスト要素のそれぞれに関すを適用した新たなリストを返すことができること
            * 3)テキストボックスの値が'3,6,9'であること
            * ■確認項目1-4:指定したプロパティに一致する要素からなるリストを返すことができること
            * 4)テキストボックスの値が'[{"name":"barney","age":36,"pets":["hoppy"]}]'であること
            * ■確認項目1-5:テンプレートエンジンを用いてプロパティの値で置き換えることができること
            * 5)テキストボックスの値が'hello fred'であること
            * ■確認項目1-6:テンプレートエンジンを用いてプロパティの値をHTMLエスケープして置き換えることができること
            * 6)テキストボックスの値が'<b>&lt;script&gt;</b>'であること
            * ■確認項目1-7:テンプレート内でJavaScriptコードを実行できること
            * 7)テキストボックスの値が'<li>fred</li><li>barney</li>'であること
            */
          assert.equal(txtBoxes[0].value, '1,2,3', MSG_LODASH);
          assert.equal(txtBoxes[1].value, '2,4,6', MSG_LODASH);
          assert.equal(txtBoxes[2].value, '3,6,9', MSG_LODASH);
          assert.equal(txtBoxes[3].value, '[{"name":"barney","age":36,"pets":["hoppy"]}]', MSG_LODASH);
          assert.equal(txtBoxes[4].value, 'hello fred', MSG_LODASH);
          assert.equal(txtBoxes[5].value, '<b>&lt;script&gt;</b>', MSG_LODASH);
          assert.equal(txtBoxes[6].value, '<li>fred</li><li>barney</li>', MSG_LODASH);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
