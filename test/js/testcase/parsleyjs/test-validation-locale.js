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

  describe('CTRL08 Parsleyを用いたエラーメッセージのロケール設定、および、独自の入力値チェックができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.VALIDATION_LOCALE;

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
    it('CTRL0802 001-003 入力値チェックができる(エラーメッセージのロケール設定、および、独自の入力値チェック)', function (done) {
      this.timeout(0);

      var textLang = testObj.doc.querySelector('#lang');
      var textUserid = testObj.doc.querySelector('#user-id');
      var textCapacity = testObj.doc.querySelector('#capacity');
      var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 1.ブラウザからローケルを取得する。適用したローケルを画面に表示する。
          var langValue = textLang.value;

          /**
            * ■確認項目1:ブラウザから取得したローケルを確認する
            * 1)ブラウザから取得したローケルが'ja'であること
            */
          assert.equal(langValue, 'ja', 'APND0302 001');
        },
        function () {

          // 2.入力フォームに下記内容を設定し、送信ボタンを押下する
          // ユーザID：01
          // サーバ容量：4
          textUserid.value = '01';
          textUserid.dispatchEvent(m.simulateEvent('input'));
          textCapacity.value = '4';
          textCapacity.dispatchEvent(m.simulateEvent('input'));
          submitBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目2:サーバ容量のテキストボックスの下に独自チェック違反(5の倍数でない)のメッセージが出力されることを確認する
            * 1)サーバ容量のテキストボックスの下に'5 の倍数である必要があります。'のメッセージが出力されること
            */
          var capacityErrlst = testObj.doc.querySelector('li.parsley-multipleof');
          var capacityErrmsg = capacityErrlst.textContent;
          assert.equal(capacityErrmsg, '5 の倍数である必要があります。', 'APND0302 002');
        },
        function () {

          // 3.入力フォームに下記内容を設定し、送信ボタンを押下する
          // ユーザID：01
          // サーバ容量：15
          textUserid.value = '01';
          textUserid.dispatchEvent(m.simulateEvent('input'));
          textCapacity.value = '15';
          textCapacity.dispatchEvent(m.simulateEvent('input'));
          submitBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目3:サーバ容量のテキストボックスの下に最大値違反のメッセージが出力されることを確認する
            * 1)サーバ容量のテキストボックスの下に'10 以下の値にしてください。'のメッセージが出力されること
            */
          var capacityErrlst = testObj.doc.querySelector('li.parsley-max');
          var capacityErrmsg = capacityErrlst.textContent;
          assert.equal(capacityErrmsg, '10 以下の値にしてください。', 'APND0302 003');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
