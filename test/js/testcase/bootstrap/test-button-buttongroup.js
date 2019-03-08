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
    sandboxEl : null,
    win : null,
    doc : null
  };

  describe('UICP01 Bootstrap形式のボタングループ化が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_BUTTON_BUTTONGROUP;
    var MSG_BOOTSTRAP_BUTTON_BUTTONGROUP = 'bootstrap_button-buttongroup.';

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
    it('UICP0105 001 a要素で生成したボタンがグループ化できること', function (done) {
      this.timeout(0);

      var div1 = testObj.doc.querySelector('body > div:nth-child(2)');
      var a = testObj.doc.querySelectorAll('body > div:nth-child(2) > a');
      var button1Style = testObj.win.getComputedStyle(a[0]).display;
      var button2Style = testObj.win.getComputedStyle(a[1]).display;
      var button3Style = testObj.win.getComputedStyle(a[2]).display;

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * ■確認項目1　: ボタンがグループ化されていること
            * 1)include : div要素のclass属性に「btn-group」が追加されていること。
            */
          assert.equal(div1.className, 'btn-group', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);

          /**
            * ■確認項目2　: ボタンが表示されていること
            * 1)include : a要素のボタンが表示されていること。
            */
          assert.include(button1Style, 'block', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.include(button2Style, 'block', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.include(button3Style, 'block', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);

          /**
            * ■確認項目3　: div要素配下にa要素が3つ存在していることを確認する
            * 1)equal : div要素配下にa要素が3つ存在していること。
            */
          assert.equal(a.length, 3, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
    it('UICP0105 002 checkbox1～3のボタン全てが選択状態（他のボタンと色が異なる）であることを確認する', function (done) {
      this.timeout(0);

      var checkboxes = testObj.doc.querySelectorAll('body > div:nth-child(4) > label > input');
      var labels = testObj.doc.querySelectorAll('body > div:nth-child(4) > label');
      var befChkCol1 = testObj.win.getComputedStyle(labels[0]).backgroundColor;
      var befChkCol2 = testObj.win.getComputedStyle(labels[1]).backgroundColor;
      var befChkCol3 = testObj.win.getComputedStyle(labels[2]).backgroundColor;

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * 1)bootstrap/button-buttongroup.htmlを開く。
            * 2)CheckBox1を押下する。
            * 3)CheckBox2を押下する。
            * 4)CheckBox3を押下する。
            */
          labels[0].dispatchEvent(m.simulateEvent('click'));
          labels[1].dispatchEvent(m.simulateEvent('click'));
          labels[2].dispatchEvent(m.simulateEvent('click'));
        },
        function () {
          var aftChkCol1 = testObj.win.getComputedStyle(labels[0]).backgroundColor;
          var aftChkCol2 = testObj.win.getComputedStyle(labels[1]).backgroundColor;
          var aftChkCol3 = testObj.win.getComputedStyle(labels[2]).backgroundColor;

          /**
            * ■確認項目1　: checkbox1～3のボタン全てが選択状態（他のボタンと色が異なる）であることを確認する
            * 1)include : クラス名に「btn btn-default active」を含むこと。
            * 2)notEqual : 選択前後で背景色が異なること。
            * 3)isTrue : 選択状態であること。
            */
          assert.include(labels[0].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.include(labels[1].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.include(labels[2].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);

          assert.notEqual(befChkCol1, aftChkCol1, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.notEqual(befChkCol2, aftChkCol2, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.notEqual(befChkCol3, aftChkCol3, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);

          assert.isTrue(checkboxes[0].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.isTrue(checkboxes[1].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.isTrue(checkboxes[2].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
        },
        function () {
          done();
        }
      ], 0);
    });

    it('UICP0105 003 radiobuttonが選択状態（他のボタンと色が異なる）であることを確認する', function (done) {
      this.timeout(0);

      var radios = testObj.doc.querySelectorAll('body > div:nth-child(6) > label > input');
      var labels = testObj.doc.querySelectorAll('body > div:nth-child(6) > label');
      var befRadCol1 = testObj.win.getComputedStyle(labels[0]).backgroundColor;
      var befRadCol2 = testObj.win.getComputedStyle(labels[1]).backgroundColor;
      var befRadCol3 = testObj.win.getComputedStyle(labels[2]).backgroundColor;

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          /**
            * 1)bootstrap/button-buttongroup.htmlを開く。
            * 2)radio1Labelを押下する。
            */
          radios[0].dispatchEvent(m.simulateEvent('click'));
        },
        function () {
          var aftRadCol1 = testObj.win.getComputedStyle(labels[0]).backgroundColor;

          /**
            * ■確認項目1　: radiobuttonの選択状態（他のボタンと色が異なる）を確認する
            * 1)include : radiobutton1のクラス名に「btn btn-default active」を含むこと。
            * 2)notEqual : radiobutton1の選択前後で背景色が異なること。
            * 3)isTrue : radiobutton1が選択状態であること。
            */
          assert.include(labels[0].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.notInclude(labels[1].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.notInclude(labels[2].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);

          assert.notEqual(befRadCol1, aftRadCol1, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);

          assert.isTrue(radios[0].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.isFalse(radios[1].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
        },
        function () {

          /**
            * 1)bootstrap/button-buttongroup.htmlを開く。
            * 2)radio2Labelを押下する。
            */
          radios[1].dispatchEvent(m.simulateEvent('click'));
        },
        function () {
          var aftRadCol2 = testObj.win.getComputedStyle(labels[1]).backgroundColor;

          /**
            * ■確認項目2　: radiobuttonの選択状態（他のボタンと色が異なる）を確認する
            * 1)include : radiobutton2のクラス名に「btn btn-default active」を含むこと。
            * 2)notEqual : radiobutton2の選択前後で背景色が異なること。
            * 3)isTrue : radiobutton2が選択状態であること。
            */
          assert.notInclude(labels[0].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.include(labels[1].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.notInclude(labels[2].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);

          assert.notEqual(befRadCol2, aftRadCol2, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);

          assert.isFalse(radios[0].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.isTrue(radios[1].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.isFalse(radios[2].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
        },
        function () {

          /**
            * 1)bootstrap/button-buttongroup.htmlを開く。
            * 2)radio3Labelを押下する。
            */
          radios[2].dispatchEvent(m.simulateEvent('click'));
        },
        function () {
          var aftRadCol3 = testObj.win.getComputedStyle(labels[2]).backgroundColor;

          /**
            * ■確認項目3　: radiobuttonの選択状態（他のボタンと色が異なる）を確認する
            * 1)include : radiobutton3のクラス名に「btn btn-default active」を含むこと。
            * 2)notEqual : radiobutton3の選択前後で背景色が異なること。
            * 3)isTrue : radiobutton3が選択状態であること。
            */
          assert.notInclude(labels[0].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.notInclude(labels[1].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.include(labels[2].className, 'btn btn-default active', MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);

          assert.notEqual(befRadCol3, aftRadCol3, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);

          assert.isFalse(radios[0].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.isFalse(radios[1].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
          assert.isTrue(radios[2].checked, MSG_BOOTSTRAP_BUTTON_BUTTONGROUP);
        },
        function () {
          done();
        }
      ], 0);
    });

      // ----------------------- テストケース -----------------------
  });
}());
