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
  describe('UICP01 jQuery UI形式のspan要素やdiv要素でのボタンが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_BUTTON_TAG_CHANGE;
    var MSG_JQUERY_UI_BUTTON_TAG_CHANGE = 'jquery_ui_button_tag_change.';

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
    it('UICP0103 001 ボタンが4つ表示されていることを確認する', function (done) {
      this.timeout(0);
      var div1 = testObj.doc.querySelector('#div1');
      var span1 = testObj.doc.querySelector('#span1');
      var div2 = testObj.doc.querySelector('#div2');
      var span2 = testObj.doc.querySelector('#span2');

      var div1Style = testObj.win.getComputedStyle(div1).display;
      var span1Style = testObj.win.getComputedStyle(span1).display;
      var div2Style = testObj.win.getComputedStyle(div2).display;
      var span2Style = testObj.win.getComputedStyle(span2).display;

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // ■確認項目1
          // ・ボタンが4つ表示されていることを確認する。
          assert.isNotNull(div1, MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.isNotNull(span1, MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.isNotNull(div2, MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.isNotNull(span2, MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.equal(div1Style, 'inline-block', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.equal(span1Style, 'inline-block', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.equal(div2Style, 'inline-block', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.equal(span2Style, 'inline-block', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0103 007 divボタン2にEnterキーを押下してテキストボックスの値を確認する', function (done) {
      this.timeout(0);
      var div2 = testObj.doc.querySelector('#div2');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          /**
           * 1)client-functionaltest/jquery-ui/button-tag-change.htmlを開く。
           * 2)divボタン2を押下する。
           * 3)Enterキーを押下する
           */
          div2.dispatchEvent(m.simulateEvent('click'));
          div2.dispatchEvent(m.simulateEvent('keypress', {
            keyCode: KEY.ENTER
          }));
          div2.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: KEY.ENTER
          }));
          div2.dispatchEvent(m.simulateEvent('keyup', {
            keyCode: KEY.ENTER
          }));
        },
        function () {

          // ■確認項目1
          // テキストボックスの値が上から順に、「div2:keyup」、「div2:keypress」、「div2:keydown」になっていることを確認する。
          var keypressStatus = testObj.doc.querySelector('#keypress-status');
          var keydownStatus = testObj.doc.querySelector('#keydown-status');
          var keyupStatus = testObj.doc.querySelector('#keyup-status');

          // Enterキーをchaiで発火するでは「document.activeElement.id」が取得できないため、固定値で確認する。
          var keyupStatusValue = 'div2' + keyupStatus.value;
          var keypressStatusValue = 'div2' + keypressStatus.value;
          var keydownStatusValue = 'div2' + keydownStatus.value;
          assert.equal(keyupStatusValue, 'div2:keyup', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.equal(keypressStatusValue, 'div2:keypress', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.equal(keydownStatusValue, 'div2:keydown', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0103 008 spanボタン2にEnterキーを押下してテキストボックスの値を確認する', function (done) {
      this.timeout(0);
      var span2 = testObj.doc.querySelector('#span2');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          /**
           * 1)client-functionaltest/jquery-ui/button-tag-change.htmlを開く。
           * 2)spanボタン2を押下する
           * 3)Enterキーを押下する
           */
          span2.dispatchEvent(m.simulateEvent('click'));
          span2.dispatchEvent(m.simulateEvent('keypress', {
            keyCode: KEY.ENTER
          }));
          span2.dispatchEvent(m.simulateEvent('keydown', {
            keyCode: KEY.ENTER
          }));
          span2.dispatchEvent(m.simulateEvent('keyup', {
            keyCode: KEY.ENTER
          }));
        },
        function () {

          // ■確認項目1
          // テキストボックスの値が上から順に、「span2:keyup」、「span2:keypress」、「span2:keydown」になっていることを確認する。
          var keypressStatus = testObj.doc.querySelector('#keypress-status');
          var keydownStatus = testObj.doc.querySelector('#keydown-status');
          var keyupStatus = testObj.doc.querySelector('#keyup-status');

          // Enterキーをchaiで発火するでは「document.activeElement.id」が取得できないため、固定値で確認する。
          var keyupStatusValue = 'span2' + keyupStatus.value;
          var keypressStatusValue = 'span2' + keypressStatus.value;
          var keydownStatusValue = 'span2' + keydownStatus.value;
          assert.equal(keyupStatusValue, 'span2:keyup', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.equal(keypressStatusValue, 'span2:keypress', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
          assert.equal(keydownStatusValue, 'span2:keydown', MSG_JQUERY_UI_BUTTON_TAG_CHANGE);
        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());