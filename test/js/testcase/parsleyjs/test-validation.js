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

  describe('CTRL08 Parsleyを用いた入力値チェックができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.VALIDATION;

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
    it('CTRL0801 001-002 入力値チェックができる(ライブラリで用意している入力値チェック)', function (done) {
      this.timeout(0);

      var txtboxAge = testObj.doc.querySelector('#age');
      var txtboxBirth = testObj.doc.querySelector('#birth-of-date');
      var txtboxUser = testObj.doc.querySelector('#user-id');
      var txtboxPasswd = testObj.doc.querySelector('#password');
      var txtboxCnfrm = testObj.doc.querySelector('#confirm-password');
      var txtboxEmail = testObj.doc.querySelector('#email');
      var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 1.入力フォームに下記内容を設定し、送信ボタンを押下する
          // 名前：(空白)
          // 年齢：19
          // 生年月日：test
          // ユーザID：0
          // パスワード：password
          // パスワード再入力：pass
          // メールボックス：Macchinetta
          txtboxAge.value = '19';
          txtboxAge.dispatchEvent(m.simulateEvent('input'));
          txtboxBirth.value = 'test';
          txtboxBirth.dispatchEvent(m.simulateEvent('input'));
          txtboxUser.value = '0';
          txtboxUser.dispatchEvent(m.simulateEvent('input'));
          txtboxPasswd.value = 'password';
          txtboxPasswd.dispatchEvent(m.simulateEvent('input'));
          txtboxCnfrm.value = 'pass';
          txtboxCnfrm.dispatchEvent(m.simulateEvent('input'));
          txtboxEmail.value = 'Macchinetta';
          submitBtn.dispatchEvent(m.simulateEvent('click'));

          /**
            * ■確認項目1-1:名前のテキストボックスの下に必須チェック違反のメッセージが出力されることを確認する
            * 1)名前のテキストボックスの下に'この値は必須です。'のメッセージが出力されること。
            * 2)名前入力違反用のclassName属性が'has-error'であること
            * ■確認項目1-2:年齢のテキストボックスの下にn以上の数値の違反のメッセージが出力されることを確認する
            * 3)年齢のテキストボックスの下に'未成年は登録できません。'のメッセージが出力されること
            * 4)年齢入力違反用のclassName属性が'has-error'であること
            * ■確認項目1-3:生年月日のテキストボックスの下に日付フォーマットの違反のメッセージが出力されることを確認する
            * 5)生年月日のテキストボックスの下に'無効な値です。'のメッセージが出力されること
            * 6)生年月日入力違反用のclassName属性が'has-error'であること
            * ■確認項目1-4:ユーザIDのテキストボックスの下にn以上m以下のチェック違反違反のメッセージが出力されることを確認する
            * 7)ユーザIDのテキストボックスの下に'2 から 8 文字の間で入力してください。'のメッセージが出力されること
            * 8)ユーザID入力違反用のclassName属性が'has-error'であること
            * ■確認項目1-5:パスワード再入力のテキストボックスの下にパスワードとの同値チェック違反のメッセージが出力されることを確認する
            * 9)パスワード再入力のテキストボックスの下に'値が違います。'のメッセージが出力されること
            * 10)パスワード再入力違反用のclassName属性が'has-error'であること
            * ■確認項目1-6:メールアドレスのテキストボックスの下にメールアドレスのフォーマットの違反のメッセージが出力されることを確認する
            * 11)メールアドレスのテキストボックスの下に'正しいメールアドレスを入力してください。'のメッセージが出力されること
            * 12)メールアドレス入力違反用のclassName属性が'has-error'であること
            * ■確認項目1-7:チェックボックスの必須チェック違反で「承認する」が赤文字になっていることを確認する
            * 13)チェックボックスの必須チェック違反で「承認する」が赤文字になっていること
            * 14)チェックボックス入力違反用のclassName属性が'has-error'であること
            */
          var nameErrlst = testObj.doc.querySelector('li.parsley-required');
          var nameErrmsg = nameErrlst.textContent;
          assert.equal(nameErrmsg, 'この値は必須です。', 'APND0301 001');
          var nameErrClassName = testObj.doc.querySelector('#form div:nth-child(1)').className;
          assert.equal(nameErrClassName, 'has-error', 'APND0301 001');

          var ageErrlst = testObj.doc.querySelector('li.parsley-min');
          var ageErrmsg = ageErrlst.textContent;
          assert.equal(ageErrmsg, '未成年は登録できません。', 'APND0301 001');
          var ageErrClassName = testObj.doc.querySelector('#form div:nth-child(2)').className;
          assert.equal(ageErrClassName, 'has-error', 'APND0301 001');

          var birthErrlst = testObj.doc.querySelector('li.parsley-dateiso');
          var birthErrmsg = birthErrlst.textContent;
          assert.equal(birthErrmsg, '無効な値です。', 'APND0301 001');
          var birthErrClassName = testObj.doc.querySelector('#form div:nth-child(3)').className;
          assert.equal(birthErrClassName, 'has-error', 'APND0301 001');

          var userErrlst = testObj.doc.querySelector('li.parsley-length');
          var userErrmsg = userErrlst.textContent;
          assert.equal(userErrmsg, '2 から 8 文字の間で入力してください。', 'APND0301 001');
          var userErrClassName = testObj.doc.querySelector('#form div:nth-child(4)').className;
          assert.equal(userErrClassName, 'has-error', 'APND0301 001');

          var confirmErrlst = testObj.doc.querySelector('li.parsley-equalto');
          var confirmErrmsg = confirmErrlst.textContent;
          assert.equal(confirmErrmsg, '値が違います。', 'APND0301 001');
          var confirmErrClassName = testObj.doc.querySelector('#form div:nth-child(6)').className;
          assert.equal(confirmErrClassName, 'has-error', 'APND0301 001');

          var emailErrlst = testObj.doc.querySelector('li.parsley-type');
          var emailErrmsg = emailErrlst.textContent;
          assert.equal(emailErrmsg, '正しいメールアドレスを入力してください。', 'APND0301 001');
          var emailErrClassName = testObj.doc.querySelector('#form div:nth-child(7)').className;
          assert.equal(emailErrClassName, 'has-error', 'APND0301 001');

          var agreeMsg = testObj.doc.querySelector('#form div:nth-child(8)');
          var agreeMsgClassName = agreeMsg.className;
          assert.equal(agreeMsgClassName, 'has-error', 'APND0301 001');
          var agreeMsgLabel = testObj.doc.querySelector('label[for=\'agree\']');
          var agreeMsgColor = testObj.win.getComputedStyle(agreeMsgLabel).color;
          assert.equal(agreeMsgColor, 'rgb(255, 0, 0)', 'APND0301 001');
        },
        function () {

          // 2.年齢のテキストボックスに-1と入力し、送信ボタンを押下する
          txtboxAge.value = '-1';
          txtboxAge.dispatchEvent(m.simulateEvent('input'));
          submitBtn.dispatchEvent(m.simulateEvent('click'));

          /**
            * ■確認項目2:年齢のテキストボックスに正の整数値チェック違反のメッセージが出力されることを確認する
            * 1)年齢のテキストボックスに'正しい桁数で入力してください。'のメッセージが出力されること
            * 2)年齢入力違反用のclassName属性が'has-error'であること
            */
          var ageErrlst = testObj.doc.querySelector('li.parsley-type');
          var ageErrmsg = ageErrlst.textContent;
          assert.equal(ageErrmsg, '正しい桁数で入力してください。', 'APND0301 002');
          var ageErrClassName = testObj.doc.querySelector('#form div:nth-child(2)').className;
          assert.equal(ageErrClassName, 'has-error', 'APND0301 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
