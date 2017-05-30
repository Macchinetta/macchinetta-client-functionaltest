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
  var expect = chai.expect;
  var testObj = {
    sandboxEl : null,
    win : null,
    doc : null
  };

  describe('UICP01 jQuery UI形式のボタングループ化が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_BUTTON_BUTTONSET;
    var MSG_JQUERY_UI_BUTTON_BUTTONSET = 'jquery-ui_button-buttonset.';

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
    it('UICP0102 001 a要素で生成したボタンがグループ化できること', function (done) {
      this.timeout(0);

      var div1 = testObj.doc.querySelector('body > div:nth-child(2)');
      var a = testObj.doc.querySelectorAll('body > div:nth-child(2) > a');
      var a1 = testObj.doc.querySelector('body > div:nth-child(2) > a.ui-button.ui-widget.ui-state-default.ui-button-text-only.ui-corner-left');
      var a2 = testObj.doc.querySelector('body > div:nth-child(2) > a:nth-child(3)');
      var a3 = testObj.doc.querySelector('body > div:nth-child(2) > a.ui-button.ui-widget.ui-state-default.ui-button-text-only.ui-corner-right');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ■確認項目1
          // class属性に「ui-buttonset」が追加されていること。
          assert.equal(div1.getAttribute('class'), 'buttonset ui-buttonset', MSG_JQUERY_UI_BUTTON_BUTTONSET);

          // ■確認項目2
          // a要素に「role="button"」が追加されていること。
          assert.equal(a1.getAttribute('role'), 'button', MSG_JQUERY_UI_BUTTON_BUTTONSET);
          assert.equal(a2.getAttribute('role'), 'button', MSG_JQUERY_UI_BUTTON_BUTTONSET);
          assert.equal(a3.getAttribute('role'), 'button', MSG_JQUERY_UI_BUTTON_BUTTONSET);

          // ■確認項目3
          // ・div要素配下にa要素が3つ存在していること。
          assert.equal(a.length, 3, MSG_JQUERY_UI_BUTTON_BUTTONSET);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0102 002 checkbox1～3のボタン全てが選択状態（他のボタンと色が異なる）であることを確認する', function (done) {
      this.timeout(0);

      var checkBox1 = testObj.doc.querySelector('#checkbox1');
      var checkBox2 = testObj.doc.querySelector('#checkbox2');
      var checkBox3 = testObj.doc.querySelector('#checkbox3');
      var checkBox1Label = testObj
        .doc.querySelector('body > div:nth-child(3) > label.ui-button.ui-widget.ui-state-default.ui-button-text-only.ui-corner-left');
      var checkBox2Label = testObj.doc.querySelector('body > div:nth-child(3) > label:nth-child(5)');
      var checkBox3Label = testObj
        .doc.querySelector('body > div:nth-child(3) > label.ui-button.ui-widget.ui-state-default.ui-button-text-only.ui-corner-right');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
           * 1)jquery-ui/button-buttonset.htmlを開く。
           * 2)CheckBox1を押下する。
           * 3)CheckBox2を押下する。
           * 4)CheckBox3を押下する。
           */
          checkBox1Label.dispatchEvent(m.simulateEvent('click'));
          checkBox2Label.dispatchEvent(m.simulateEvent('click'));
          checkBox3Label.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目1
          // チェックボックスを押下した後、クラス名とチェック状態で要素を確認する。
          expect(checkBox1Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.contain('ui-state-active');
          expect(checkBox2Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.contain('ui-state-active');
          expect(checkBox3Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.contain('ui-state-active');

          assert.isTrue(checkBox1.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);
          assert.isTrue(checkBox2.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);
          assert.isTrue(checkBox3.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);

        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0102 003 radiobuttonの選択状態（他のボタンと色が異なる）を確認する', function (done) {
      this.timeout(0);

      var radio1 = testObj.doc.querySelector('#radio1');
      var radio2 = testObj.doc.querySelector('#radio2');
      var radio3 = testObj.doc.querySelector('#radio3');
      var radio1Label = testObj.doc
        .querySelector('body > div:nth-child(4) > label.ui-button.ui-widget.ui-state-default.ui-button-text-only.ui-corner-left');
      var radio2Label = testObj.doc
        .querySelector('body > div:nth-child(4) > label:nth-child(5)');
      var radio3Label = testObj.doc
        .querySelector('body > div:nth-child(4) > label.ui-button.ui-widget.ui-state-default.ui-button-text-only.ui-corner-right');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
           * 1)jquery-ui/button-buttonset.htmlを開く。
           * 2)radio1Labelを押下する。
           */
          radio1Label.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目2
          // ラジオボタンを押下した後、クラス名とチェック状態で要素を確認する。

          expect(radio1Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.contain('ui-state-active');
          expect(radio2Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.not.contain('ui-state-active');
          expect(radio3Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.not.contain('ui-state-active');

          assert.isTrue(radio1.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);
          assert.isFalse(radio2.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);
          assert.isFalse(radio3.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);

        },
        function () {

          /**
           * 1)jquery-ui/button-buttonset.htmlを開く。
           * 2)radio2Labelを押下する。
           */
          radio2Label.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目3
          // ラジオボタンを押下した後、クラス名とチェック状態で要素を確認する。

          expect(radio1Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.not.contain('ui-state-active');
          expect(radio2Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.contain('ui-state-active');
          expect(radio3Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.not.contain('ui-state-active');

          assert.isFalse(radio1.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);
          assert.isTrue(radio2.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);
          assert.isFalse(radio3.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);

        },
        function () {

          /**
           * 1)jquery-ui/button-buttonset.htmlを開く。
           * 2)radio3Labelを押下する。
           */
          radio3Label.dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目4
          // ラジオボタンを押下した後、クラス名とチェック状態で要素を確認する。

          expect(radio1Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.not.contain('ui-state-active');
          expect(radio2Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.not.contain('ui-state-active');
          expect(radio3Label.className, MSG_JQUERY_UI_BUTTON_BUTTONSET).to.contain('ui-state-active');

          assert.isFalse(radio1.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);
          assert.isFalse(radio2.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);
          assert.isTrue(radio3.checked, MSG_JQUERY_UI_BUTTON_BUTTONSET);

        },
        function () {
          done();
        }
      ], 0);
    });
  });
}());
