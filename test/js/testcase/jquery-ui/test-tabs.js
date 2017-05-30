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

  describe('UICP07 jQuery UI形式の基本的なタブが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_TABS;
    var MSG_JQUERY_UI_TABS = 'jquery-ui-tabs.';

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
    it('UICP0701 001 jQuery UI形式の基本的なタブが利用できること', function (done) {
      this.timeout(0);

      var tab1Pane = testObj.doc.querySelector('#tabs-1');
      var tab2Pane = testObj.doc.querySelector('#tabs-2');
      var tab3Pane = testObj.doc.querySelector('#tabs-3');
      var tabs = testObj.doc.querySelectorAll('a');

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 1.初期表示
          /**
            * ■確認項目1-1:パネルの上側にタブが表示されていることを確認する
            * 1)タブ1、タブ2、タブ3の上部座標が等しいこと
            * 2)タブ1、タブ2、タブ3の各パネルの表示状態がそれぞれ'block'、'none'、'none'であること
            */
          var tab1PaneTop = tabs[0].getBoundingClientRect().top;
          var tab2PaneTop = tabs[1].getBoundingClientRect().top;
          var tab3PaneTop = tabs[2].getBoundingClientRect().top;
          assert.equal(tab1PaneTop, tab2PaneTop, MSG_JQUERY_UI_TABS);
          assert.equal(tab1PaneTop, tab3PaneTop, MSG_JQUERY_UI_TABS);
          assert.equal(tab2PaneTop, tab3PaneTop, MSG_JQUERY_UI_TABS);

          var tab1PaneDisplay = tab1Pane.style.display;
          if (tab1PaneDisplay === '') {
            tab1PaneDisplay = testObj.win.getComputedStyle(tab1Pane).display;
          }
          assert.equal(tab1PaneDisplay, 'block', MSG_JQUERY_UI_TABS);

          var tab2PaneDisplay = tab2Pane.style.display;
          if (tab2PaneDisplay === '') {
            tab2PaneDisplay = testObj.win.getComputedStyle(tab2Pane).display;
          }
          assert.equal(tab2PaneDisplay, 'none', MSG_JQUERY_UI_TABS);

          var tab3PaneDisplay = tab3Pane.style.display;
          if (tab3PaneDisplay === '') {
            tab3PaneDisplay = testObj.win.getComputedStyle(tab3Pane).display;
          }
          assert.equal(tab3PaneDisplay, 'none', MSG_JQUERY_UI_TABS);

        },
        function () {

          // 2.タブ2のリンクを押下する
          tabs[1].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1-2:パネルがタブに応じて切り替わることを確認する（タブ1→タブ2）
            * 1)タブ1、タブ2、タブ3の上部座標が等しいこと
            * 2)タブ1、タブ2、タブ3の各パネルの表示状態がそれぞれ'none'、'block'、'none'であること
            */
          var tab1PaneTop = tabs[0].getBoundingClientRect().top;
          var tab2PaneTop = tabs[1].getBoundingClientRect().top;
          var tab3PaneTop = tabs[2].getBoundingClientRect().top;
          assert.equal(tab1PaneTop, tab2PaneTop, MSG_JQUERY_UI_TABS);
          assert.equal(tab1PaneTop, tab3PaneTop, MSG_JQUERY_UI_TABS);
          assert.equal(tab3PaneTop, tab2PaneTop, MSG_JQUERY_UI_TABS);

          var tab1PaneDisplay = tab1Pane.style.display;
          if (tab1PaneDisplay === '') {
            tab1PaneDisplay = testObj.win.getComputedStyle(tab1Pane).display;
          }
          assert.equal(tab1PaneDisplay, 'none', MSG_JQUERY_UI_TABS);

          var tab2PaneDisplay = tab2Pane.style.display;
          if (tab2PaneDisplay === '') {
            tab2PaneDisplay = testObj.win.getComputedStyle(tab2Pane).display;
          }
          assert.equal(tab2PaneDisplay, 'block', MSG_JQUERY_UI_TABS);

          var tab3PaneDisplay = tab3Pane.style.display;
          if (tab3PaneDisplay === '') {
            tab3PaneDisplay = testObj.win.getComputedStyle(tab3Pane).display;
          }
          assert.equal(tab3PaneDisplay, 'none', MSG_JQUERY_UI_TABS);

        },
        function () {

          // 3.タブ3のリンクを押下する
          tabs[2].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          /**
            * ■確認項目1-3:パネルがタブに応じて切り替わることを確認する（タブ2→タブ3）
            * 1)タブ1、タブ2、タブ3の上部座標が等しいこと
            * 2)タブ1、タブ2、タブ3の各パネルの表示状態がそれぞれ'none'、'none'、'block'であること
            */
          var tab1PaneTop = tabs[0].getBoundingClientRect().top;
          var tab2PaneTop = tabs[1].getBoundingClientRect().top;
          var tab3PaneTop = tabs[2].getBoundingClientRect().top;
          assert.equal(tab1PaneTop, tab2PaneTop, MSG_JQUERY_UI_TABS);
          assert.equal(tab1PaneTop, tab3PaneTop, MSG_JQUERY_UI_TABS);
          assert.equal(tab3PaneTop, tab2PaneTop, MSG_JQUERY_UI_TABS);

          var tab1PaneDisplay = tab1Pane.style.display;
          if (tab1PaneDisplay === '') {
            tab1PaneDisplay = testObj.win.getComputedStyle(tab1Pane).display;
          }
          assert.equal(tab1PaneDisplay, 'none', MSG_JQUERY_UI_TABS);

          var tab2PaneDisplay = tab2Pane.style.display;
          if (tab2PaneDisplay === '') {
            tab2PaneDisplay = testObj.win.getComputedStyle(tab2Pane).display;
          }
          assert.equal(tab2PaneDisplay, 'none', MSG_JQUERY_UI_TABS);

          var tab3PaneDisplay = tab3Pane.style.display;
          if (tab3PaneDisplay === '') {
            tab3PaneDisplay = testObj.win.getComputedStyle(tab3Pane).display;
          }
          assert.equal(tab3PaneDisplay, 'block', MSG_JQUERY_UI_TABS);

        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
