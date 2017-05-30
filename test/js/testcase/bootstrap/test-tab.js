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

  describe('UICP07 Bootstrap形式のタブが利用できる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.BOOTSTRAP_TAB;

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
    it('UICP0705 001-002 タブが利用できる', function (done) {
      this.timeout(0);

      var tab1Pane = testObj.doc.querySelector('#tab1');
      var tab2Pane = testObj.doc.querySelector('#tab2');
      var tabs = testObj.doc.querySelectorAll('a');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 1.初期表示
          /**
            * ■確認項目1:タブが利用できることを確認する
            * 1)タブ1のclassNameが'tab-pane active'であること
            * 2)タブ2のclassNameが'tab-pane'であること
            * 3)タブ1とタブ2の上部座標が等しいこと
            * 4)タブ1、タブ2の各パネルの表示状態がそれぞれ'block'、'none'であること
            */
          var tab1PaneClassName = tab1Pane.className;
          assert.equal(tab1PaneClassName, 'tab-pane active', 'UICP0601 001');

          var tab2PaneClassName = tab2Pane.className;
          assert.equal(tab2PaneClassName, 'tab-pane', 'UICP0601 001');

          var tab1PaneTop = tabs[0].getBoundingClientRect().top;
          var tab2PaneTop = tabs[1].getBoundingClientRect().top;
          assert.equal(tab1PaneTop, tab2PaneTop, 'UICP0601 001');

          var tab1PaneStyle = testObj.win.getComputedStyle(tab1Pane).display;
          assert.equal(tab1PaneStyle, 'block', 'UICP0601 001');

          var tab2PaneStyle = testObj.win.getComputedStyle(tab2Pane).display;
          assert.equal(tab2PaneStyle, 'none', 'UICP0601 001');
        },
        function () {

          // 2.タブ2のリンクを押下する
          tabs[1].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1:タブが利用できることを確認する
            * 1)タブ1のclassNameが'tab-pane'であること
            * 2)タブ2のclassNameが'tab-pane active'であること
            * 3)タブ1とタブ2の上部座標が等しいこと
            * 4)タブ1、タブ2の各パネルの表示状態がそれぞれ'none'、'block'であること
            */
          var tab1PaneClassName = tab1Pane.className;
          assert.equal(tab1PaneClassName, 'tab-pane', 'UICP0601 002');

          var tab2PaneClassName = tab2Pane.className;
          assert.equal(tab2PaneClassName, 'tab-pane active', 'UICP0601 002');

          var tab1PaneTop = tabs[0].getBoundingClientRect().top;
          var tab2PaneTop = tabs[1].getBoundingClientRect().top;
          assert.equal(tab1PaneTop, tab2PaneTop, 'UICP0601 002');

          var tab1PaneStyle = testObj.win.getComputedStyle(tab1Pane).display;
          assert.equal(tab1PaneStyle, 'none', 'UICP0601 002');

          var tab2PaneStyle = testObj.win.getComputedStyle(tab2Pane).display;
          assert.equal(tab2PaneStyle, 'block', 'UICP0601 002');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
