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
  var MSG_VALIDATION = 'validation.';

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
    it('CTRL0801 001 入力値チェック(ライブラリで用意している入力値チェック)ができること', function (done) {
      this.timeout(0);
      var ageTxtBox = testObj.doc.querySelector('#age');
      var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {
          var birthTxtBox = testObj.doc.querySelector('#birth-of-date');
          var userTxtBox = testObj.doc.querySelector('#user-id');
          var passwdTxtBox = testObj.doc.querySelector('#password');
          var confirmTxtBox = testObj.doc.querySelector('#confirm-password');
          var emailTxtBox = testObj.doc.querySelector('#email');

          /**
            * 1.入力フォームに値を設定する
            * 対象項目：年齢、生年月日、ユーザーID、パスワード、パスワード再入力、メールアドレス
            */
          ageTxtBox.value = '19';
          ageTxtBox.dispatchEvent(m.simulateEvent('input'));
          birthTxtBox.value = 'test';
          birthTxtBox.dispatchEvent(m.simulateEvent('input'));
          userTxtBox.value = '0';
          userTxtBox.dispatchEvent(m.simulateEvent('input'));
          passwdTxtBox.value = 'password';
          passwdTxtBox.dispatchEvent(m.simulateEvent('input'));
          confirmTxtBox.value = 'pass';
          confirmTxtBox.dispatchEvent(m.simulateEvent('input'));
          emailTxtBox.value = 'Macchinetta';
          emailTxtBox.dispatchEvent(m.simulateEvent('input'));
        },
        function () {

          /**
            * 2.送信ボタンを押下する
            */
          submitBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1-1:各ラベルの色が'rgb(255, 0, 0)'であること。
            * 対象項目：名前、年齢、生年月日、ユーザーID、パスワード再入力、メールアドレス、承認する
            */
          var labels = testObj.doc.querySelectorAll('#form > div > label');
          var namelblCol = testObj.win.getComputedStyle(labels[0]).color;
          var agelblCol = testObj.win.getComputedStyle(labels[1]).color;
          var birthlblCol = testObj.win.getComputedStyle(labels[2]).color;
          var userlblCol = testObj.win.getComputedStyle(labels[3]).color;
          var confirmlblCol = testObj.win.getComputedStyle(labels[5]).color;
          var emaillblCol = testObj.win.getComputedStyle(labels[6]).color;
          var agreelblCol = testObj.win.getComputedStyle(labels[7]).color;

          assert.equal(namelblCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(agelblCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(birthlblCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(userlblCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(confirmlblCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(emaillblCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(agreelblCol, 'rgb(255, 0, 0)', MSG_VALIDATION);

          /**
            * ■確認項目1-2:各エラーメッセージが正しく表示されること。
            * 対象項目：名前、年齢、生年月日、ユーザーID、パスワード再入力、メールアドレス、承認する
            */
          var errorMsgs = testObj.doc.querySelectorAll('#form > div > ul > li');
          var agreeErr = testObj.doc.querySelector('#form > ul > li');
          var nameErrMsg = errorMsgs[0].textContent;
          var ageErrMsg = errorMsgs[1].textContent;
          var birthErrMsg = errorMsgs[2].textContent;
          var userErrMsg = errorMsgs[3].textContent;
          var confirmErrMsg = errorMsgs[4].textContent;
          var emailErrMsg = errorMsgs[5].textContent;
          var agreeErrMsg = agreeErr.textContent;

          assert.equal(nameErrMsg, 'この値は必須です。', MSG_VALIDATION);
          assert.equal(ageErrMsg, '未成年は登録できません。', MSG_VALIDATION);
          assert.equal(birthErrMsg, '無効な値です。', MSG_VALIDATION);
          assert.equal(userErrMsg, '2 から 8 文字の間で入力してください。', MSG_VALIDATION);
          assert.equal(confirmErrMsg, '値が違います。', MSG_VALIDATION);
          assert.equal(emailErrMsg, '有効なメールアドレスを入力してください。', MSG_VALIDATION);
          assert.equal(agreeErrMsg, 'この値は必須です。', MSG_VALIDATION);

          /**
            * ■確認項目1-3:各エラーメッセージの色がrgb(255, 0, 0)'であること。
            * 対象項目：名前、年齢、生年月日、ユーザーID、パスワード再入力、メールアドレス、承認する
            */
          var nameErrMsgCol = testObj.win.getComputedStyle(errorMsgs[0]).color;
          var ageErrMsgCol = testObj.win.getComputedStyle(errorMsgs[1]).color;
          var birthErrMsgCol = testObj.win.getComputedStyle(errorMsgs[2]).color;
          var userErrMsgCol = testObj.win.getComputedStyle(errorMsgs[3]).color;
          var confirmErrMsgCol = testObj.win.getComputedStyle(errorMsgs[4]).color;
          var emailErrMsgCol = testObj.win.getComputedStyle(errorMsgs[5]).color;
          var agreeErrMsgCol = testObj.win.getComputedStyle(agreeErr).color;

          assert.equal(nameErrMsgCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(ageErrMsgCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(birthErrMsgCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(userErrMsgCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(confirmErrMsgCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(emailErrMsgCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(agreeErrMsgCol, 'rgb(255, 0, 0)', MSG_VALIDATION);

          /**
            * ■確認項目1-4:エラーメッセージを表示する親要素に'has-error'のclassが追加されていること。
            * 対象項目：名前、年齢、生年月日、ユーザーID、パスワード再入力、メールアドレス、承認する
            */
          var classNames = testObj.doc.querySelectorAll('#form > div.has-error');
          var nameErrClassName = classNames[0].className;
          var ageErrClassName = classNames[1].className;
          var birthErrClassName = classNames[2].className;
          var userErrClassName = classNames[3].className;
          var confirmErrClassName = classNames[4].className;
          var emailErrClassName = classNames[5].className;
          var agreeMsgClassName = classNames[6].className;

          assert.equal(nameErrClassName, 'has-error', MSG_VALIDATION);
          assert.equal(ageErrClassName, 'has-error', MSG_VALIDATION);
          assert.equal(birthErrClassName, 'has-error', MSG_VALIDATION);
          assert.equal(userErrClassName, 'has-error', MSG_VALIDATION);
          assert.equal(confirmErrClassName, 'has-error', MSG_VALIDATION);
          assert.equal(emailErrClassName, 'has-error', MSG_VALIDATION);
          assert.equal(agreeMsgClassName, 'has-error', MSG_VALIDATION);
        },
        function () {

          /**
            * 3.入力フォームに値を設定する
            * 対象項目：年齢
            */
          ageTxtBox.value = '-1';
          ageTxtBox.dispatchEvent(m.simulateEvent('input'));
        },
        function () {

          /**
            * ■確認項目2:年齢のテキストボックスに正の整数値チェック違反のメッセージが出力されることを確認する
            * 1)ラベルの色が'rgb(255, 0, 0)'であること。
            * 2)エラーメッセージが正しく表示されること。
            * 3)エラーメッセージの色がrgb(255, 0, 0)'であること。
            * 4)エラーメッセージを表示する親要素に'has-error'のclassが追加されていること。
            */
          var ageLabel = testObj.doc.querySelector('#form > div:nth-child(2) > label');
          var agelblCol = testObj.win.getComputedStyle(ageLabel).color;
          var ageErr = testObj.doc.querySelector('#form > div:nth-child(2) > ul > li');
          var ageErrMsg = ageErr.textContent;
          var ageErrMsgCol = testObj.win.getComputedStyle(ageErr).color;
          var ageErrClassName = testObj.doc.querySelector('#form div:nth-child(2)').className;
          assert.equal(agelblCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(ageErrMsg, '数字を入力してください。', MSG_VALIDATION);
          assert.equal(ageErrMsgCol, 'rgb(255, 0, 0)', MSG_VALIDATION);
          assert.equal(ageErrClassName, 'has-error', MSG_VALIDATION);
        },
        function () {
          done();
        }
      ], 0);
    });

    it('CTRL0801 002 入力が正常値の場合、エラーメッセージが表示されないこと（１）', function (done) {
      this.timeout(0);
      var nameTxtBox = testObj.doc.querySelector('#name');
      var ageTxtBox = testObj.doc.querySelector('#age');
      var userTxtBox = testObj.doc.querySelector('#user-id');
      var passwdTxtBox = testObj.doc.querySelector('#password');
      var confirmTxtBox = testObj.doc.querySelector('#confirm-password');
      var emailTxtBox = testObj.doc.querySelector('#email');
      var agreeCheckBox = testObj.doc.querySelector('#agree');
      var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * 1.入力フォームに値を設定する
            * 対象項目：名前、ユーザーID、パスワード、パスワード再入力、メールアドレス、承認
            **/
          nameTxtBox.value = 'test';
          nameTxtBox.dispatchEvent(m.simulateEvent('input'));
          userTxtBox.value = '01';
          userTxtBox.dispatchEvent(m.simulateEvent('input'));
          passwdTxtBox.value = 'password';
          passwdTxtBox.dispatchEvent(m.simulateEvent('input'));
          confirmTxtBox.value = 'password';
          confirmTxtBox.dispatchEvent(m.simulateEvent('input'));
          emailTxtBox.value = 'mail@co.jp';
          emailTxtBox.dispatchEvent(m.simulateEvent('input'));
          agreeCheckBox.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * 2.送信ボタンを押下する
            */
          submitBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // submit後にページ遷移するため、documentを再取得する。
          testObj.doc = testObj.sandboxEl.contentWindow.document;

          /**
            * ■確認項目1-1:エラーメッセージが表示されていないこと。
            * equal)ul要素、li要素が生成されていないことを確認する。
            */
          var errorMsgsLength = testObj.doc.querySelectorAll('ul > li').length;
          assert.equal(errorMsgsLength, 0, MSG_VALIDATION);

          /**
            * ■確認項目1-2:テキストボックスの値が空になること。
            * equal)テキストボックスの値が空であることを確認する。
            * isFalse)チェックがないことを確認する。
            */
          var inputs = testObj.doc.querySelectorAll('input');
          var agreeInput = testObj.doc.querySelector('.checkbox');
          var nameTxtBox = inputs[0].textContent;
          var ageTxtBox = inputs[1].textContent;
          var birthTxtBox = inputs[2].textContent;
          var userTxtBox = inputs[3].textContent;
          var passwordTxtBox = inputs[4].textContent;
          var confirmTxtBox = inputs[5].textContent;
          var emailTxtBox = inputs[6].textContent;
          var agreeCheck = agreeInput.checked;

          assert.equal(nameTxtBox, '', MSG_VALIDATION);
          assert.equal(ageTxtBox, '', MSG_VALIDATION);
          assert.equal(birthTxtBox, '', MSG_VALIDATION);
          assert.equal(userTxtBox, '', MSG_VALIDATION);
          assert.equal(passwordTxtBox, '', MSG_VALIDATION);
          assert.equal(confirmTxtBox, '', MSG_VALIDATION);
          assert.equal(emailTxtBox, '', MSG_VALIDATION);
          assert.isFalse(agreeCheck, MSG_VALIDATION);
        },
        function () {
          done();
        }
      ], 100);
    });

    it('CTRL0801 003 入力が正常値の場合、エラーメッセージが表示されないこと（２）', function (done) {
      this.timeout(0);
      var nameTxtBox = testObj.doc.querySelector('#name');
      var ageTxtBox = testObj.doc.querySelector('#age');
      var birthTxtBox = testObj.doc.querySelector('#birth-of-date');
      var userTxtBox = testObj.doc.querySelector('#user-id');
      var passwdTxtBox = testObj.doc.querySelector('#password');
      var confirmTxtBox = testObj.doc.querySelector('#confirm-password');
      var emailTxtBox = testObj.doc.querySelector('#email');
      var agreeCheckBox = testObj.doc.querySelector('#agree');
      var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * 1.入力フォームに値を設定する
            * 対象項目：名前、年齢、生年月日、ユーザーID、パスワード、パスワード再入力、メールアドレス、承認
            */
          nameTxtBox.value = 'test';
          nameTxtBox.dispatchEvent(m.simulateEvent('input'));
          ageTxtBox.value = '20';
          ageTxtBox.dispatchEvent(m.simulateEvent('input'));
          birthTxtBox.value = '2000/01/01';
          birthTxtBox.dispatchEvent(m.simulateEvent('input'));
          userTxtBox.value = '01234567';
          userTxtBox.dispatchEvent(m.simulateEvent('input'));
          passwdTxtBox.value = 'password';
          passwdTxtBox.dispatchEvent(m.simulateEvent('input'));
          confirmTxtBox.value = 'password';
          confirmTxtBox.dispatchEvent(m.simulateEvent('input'));
          emailTxtBox.value = 'mail@co.jp';
          emailTxtBox.dispatchEvent(m.simulateEvent('input'));
          agreeCheckBox.dispatchEvent(m.simulateEvent('click'));

        },
        function () {

          /**
            * 2.送信ボタンを押下する
            */
          submitBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // submit後にページ遷移するため、documentを再取得する。
          testObj.doc = testObj.sandboxEl.contentWindow.document;

          /**
            * ■確認項目2-1:エラーメッセージが表示されていないこと。
            * equal)ul要素、li要素が生成されていないことを確認する。
            */
          var errorMsgsLength = testObj.doc.querySelectorAll('ul > li').length;
          assert.equal(errorMsgsLength, 0, MSG_VALIDATION);

          /**
            * ■確認項目2-2:テキストボックスの値が空になること。
            * equal)テキストボックスの値が空であることを確認する。
            * isFalse)チェックがないことを確認する。
            */
          var inputs = testObj.doc.querySelectorAll('input');
          var nameTxtBox = inputs[0].textContent;
          var ageTxtBox = inputs[1].textContent;
          var birthTxtBox = inputs[2].textContent;
          var userTxtBox = inputs[3].textContent;
          var passwordTxtBox = inputs[4].textContent;
          var confirmTxtBox = inputs[5].textContent;
          var emailTxtBox = inputs[6].textContent;
          var agreeCheckBox = inputs[7].checked;

          assert.equal(nameTxtBox, '', MSG_VALIDATION);
          assert.equal(ageTxtBox, '', MSG_VALIDATION);
          assert.equal(birthTxtBox, '', MSG_VALIDATION);
          assert.equal(userTxtBox, '', MSG_VALIDATION);
          assert.equal(passwordTxtBox, '', MSG_VALIDATION);
          assert.equal(confirmTxtBox, '', MSG_VALIDATION);
          assert.equal(emailTxtBox, '', MSG_VALIDATION);
          assert.isFalse(agreeCheckBox, MSG_VALIDATION);
        },
        function () {
          done();
        }
      ], 100);
    });

    // ----------------------- テストケース -----------------------
  });
}());
