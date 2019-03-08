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
  var MSG_CUSTOM_VALIDATION = 'custom-validation.';

  describe('CTRL08 Parsleyを用いて独自の入力チェックが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.CUSTOM_VALIDATION;

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
    it('CTRL0802 001 数値以外の値を入力するとエラーになること', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {
          var multiCk3txtBox = testObj.doc.querySelector('#numberCheck1');
          var multiCk5txtBox = testObj.doc.querySelector('#numberCheck2');

          /**
            * 1.入力フォームに値を設定する
            * 対象項目：倍数チェック(3)、倍数チェック(5)
            */
          multiCk3txtBox.value = 'a';
          multiCk3txtBox.dispatchEvent(m.simulateEvent('input'));
          multiCk5txtBox.value = 'a';
          multiCk5txtBox.dispatchEvent(m.simulateEvent('input'));
        },
        function () {
          var submitBtn = testObj.doc.querySelector('#form > div:nth-child(3) > input');

          /**
            * 2.送信ボタンを押下する
            */
          submitBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1-1:各ラベルの色が'rgb(255, 0, 0)'であること。
            * 対象項目：倍数チェック(3)、倍数チェック(5)
            */
          var labels = testObj.doc.querySelectorAll('#form > div > label');
          var multiCk3lblCol = testObj.win.getComputedStyle(labels[0]).color;
          var multiCk5lblCol = testObj.win.getComputedStyle(labels[1]).color;

          assert.equal(multiCk3lblCol, 'rgb(255, 0, 0)', MSG_CUSTOM_VALIDATION);
          assert.equal(multiCk5lblCol, 'rgb(255, 0, 0)', MSG_CUSTOM_VALIDATION);

          /**
            * ■確認項目1-2:各エラーメッセージが正しく表示されること。
            * 対象項目：倍数チェック(3)、倍数チェック(5)
            */
          var errorMsgs = testObj.doc.querySelectorAll('#form > div > ul > li');
          var multiCk3errMsg = errorMsgs[0].textContent;
          var multiCk5errMsg = errorMsgs[1].textContent;

          assert.equal(multiCk3errMsg, '数値を入力してください。', MSG_CUSTOM_VALIDATION);
          assert.equal(multiCk5errMsg, '数値を入力してください。', MSG_CUSTOM_VALIDATION);

          /**
            * ■確認項目1-3:各エラーメッセージの色がrgb(255, 0, 0)'であること。
            * 対象項目：倍数チェック(3)、倍数チェック(5)
            */
          var multiCk3errMsgCol = testObj.win.getComputedStyle(errorMsgs[0]).color;
          var multiCk5errMsgCol = testObj.win.getComputedStyle(errorMsgs[1]).color;

          assert.equal(multiCk3errMsgCol, 'rgb(255, 0, 0)', MSG_CUSTOM_VALIDATION);
          assert.equal(multiCk5errMsgCol, 'rgb(255, 0, 0)', MSG_CUSTOM_VALIDATION);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0802 002 倍数でない値を入力するとエラーになること', function (done) {
      this.timeout(0);

      // テスト実行
      m.executeSequentialWithDelay([
        function () {
          var multiCk3txtBox = testObj.doc.querySelector('#numberCheck1');
          var multiCk5txtBox = testObj.doc.querySelector('#numberCheck2');

          /**
            * 1.入力フォームに値を設定する
            * 対象項目：倍数チェック(3)、倍数チェック(5)
            */
          multiCk3txtBox.value = '1';
          multiCk3txtBox.dispatchEvent(m.simulateEvent('input'));
          multiCk5txtBox.value = '1';
          multiCk5txtBox.dispatchEvent(m.simulateEvent('input'));
        },
        function () {
          var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');

          /**
            * 2.送信ボタンを押下する
            */
          submitBtn.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1-1:各ラベルの色が'rgb(255, 0, 0)'であること。
            * 対象項目：倍数チェック(3)、倍数チェック(5)
            */
          var labels = testObj.doc.querySelectorAll('#form > div > label');
          var multiCk3col = testObj.win.getComputedStyle(labels[0]).color;
          var multiCk5col = testObj.win.getComputedStyle(labels[1]).color;

          assert.equal(multiCk3col, 'rgb(255, 0, 0)', MSG_CUSTOM_VALIDATION);
          assert.equal(multiCk5col, 'rgb(255, 0, 0)', MSG_CUSTOM_VALIDATION);

          /**
            * ■確認項目1-2:各エラーメッセージが正しく表示されること。
            * 対象項目：倍数チェック(3)、倍数チェック(5)
            */
          var errorMsgs = testObj.doc.querySelectorAll('#form > div > ul > li');
          var multiCk3errMsg = errorMsgs[0].textContent;
          var multiCk5errMsg = errorMsgs[1].textContent;

          assert.equal(multiCk3errMsg, '3 の倍数である必要があります。', MSG_CUSTOM_VALIDATION);
          assert.equal(multiCk5errMsg, '5 の倍数である必要があります。', MSG_CUSTOM_VALIDATION);

          /**
            * ■確認項目1-3:各エラーメッセージの色がrgb(255, 0, 0)'であること。
            * 対象項目：倍数チェック(3)、倍数チェック(5)
            */
          var multiCk3errMsgCol = testObj.win.getComputedStyle(errorMsgs[0]).color;
          var multiCk5errMsgCol = testObj.win.getComputedStyle(errorMsgs[1]).color;

          assert.equal(multiCk3errMsgCol, 'rgb(255, 0, 0)', MSG_CUSTOM_VALIDATION);
          assert.equal(multiCk5errMsgCol, 'rgb(255, 0, 0)', MSG_CUSTOM_VALIDATION);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('CTRL0802 003 倍数値を入力するとエラーにならないこと', function (done) {
      this.timeout(0);
      var multiCk3txtBox = testObj.doc.querySelector('#numberCheck1');
      var multiCk5txtBox = testObj.doc.querySelector('#numberCheck2');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * 1.入力フォームに値を設定する
            * 対象項目：倍数チェック(3)、倍数チェック(5)
            */
          multiCk3txtBox.value = '3';
          multiCk3txtBox.dispatchEvent(m.simulateEvent('input'));
          multiCk5txtBox.value = '5';
          multiCk5txtBox.dispatchEvent(m.simulateEvent('input'));
        },
        function () {
          var submitBtn = testObj.doc.querySelector('input[type=\'submit\']');

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
          assert.equal(errorMsgsLength, 0, MSG_CUSTOM_VALIDATION);

          /**
            * ■確認項目1-2:テキストボックスの値が空になること。
            * equal)テキストボックスの値が空であることを確認する。
            */
          assert.equal(multiCk3txtBox.textContent, '', MSG_CUSTOM_VALIDATION);
          assert.equal(multiCk5txtBox.textContent, '', MSG_CUSTOM_VALIDATION);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
