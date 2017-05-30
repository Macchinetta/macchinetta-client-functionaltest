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
    sandboxEl : null,
    win : null,
    doc : null
  };

  describe('APND02 Lo-Dashによるコーディング支援', function () {

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
      var textBoxCase1 = testObj.doc.querySelector('#case1');
      var textBoxCase2 = testObj.doc.querySelector('#case2');
      var textBoxCase3 = testObj.doc.querySelector('#case3');
      var textBoxCase4 = testObj.doc.querySelector('#case4');
      var textBoxCase5 = testObj.doc.querySelector('#case5');
      var textBoxCase6 = testObj.doc.querySelector('#case6');
      var textBoxCase7 = testObj.doc.querySelector('#case7');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

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
          var case1List = textBoxCase1.value;
          assert.equal(case1List, '1,2,3', 'APND0501 001');
          var case2List = textBoxCase2.value;
          assert.equal(case2List, '2,4,6', 'APND0501 001');
          var case3List = textBoxCase3.value;
          assert.equal(case3List, '3,6,9', 'APND0501 001');
          var case4List = textBoxCase4.value;
          assert.equal(case4List, '[{"name":"barney","age":36,"pets":["hoppy"]}]', 'APND0501 001');
          var case5List = textBoxCase5.value;
          assert.equal(case5List, 'hello fred', 'APND0501 001');
          var case6List = textBoxCase6.value;
          assert.equal(case6List, '<b>&lt;script&gt;</b>', 'APND0501 001');
          var case7List = textBoxCase7.value;
          assert.equal(case7List, '<li>fred</li><li>barney</li>', 'APND0501 001');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
