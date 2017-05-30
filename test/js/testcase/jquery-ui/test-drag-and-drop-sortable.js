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
  var expect = chai.expect;
  var testObj = {
    sandboxEl: null,
    win: null,
    doc: null
  };

  describe('UICP13 jQuery UI形式でリストでのドラッグ＆ドロップができる', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_DRAG_AND_DROP_SORTABLE;

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
    it('UICP1302 001 同一リスト内でドラッグ＆ドロップができる', function (done) {
      this.timeout(0);

      var list1 = testObj.doc.getElementsByClassName('jquery-ui-sortable')[0].children;
      var list1No1 = list1[0];
      var list1No3 = list1[2];

      // ドラッグスタートとなる座標を取得
      var list1No1Left = list1No1.getBoundingClientRect().left;
      var list1No1Top = list1No1.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      var list1No3Left = list1No3.getBoundingClientRect().left;
      var list1No3Bottom = list1No3.getBoundingClientRect().bottom;

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },

        function () {

          // 1.項目1－1をドラッグする
          list1No1.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: list1No1Left,
            clientY: list1No1Top,
            which: 1
          }));
          list1No1.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: list1No3Left,
            clientY: list1No3Bottom - 1,
            which: 1
          }));
        },
        function () {

          // 2.項目1－3の下に項目1－1をドロップする
          list1No1.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          // オブジェクトの再取得
          list1 = testObj.doc.getElementsByClassName('jquery-ui-sortable')[0].children;
          list1No3 = list1[2];

          /**
            * ■確認項目1:一番左のリストの1番下が項目1－1になっていることを確認する
            * 1)テキストの値が'項目 1-1'を含んでいること
            */
          var list1No3Text = list1No3.innerHTML;
          expect(list1No3Text, 'UICP1002 001').to.contain('項目 1-1');
        },
        function () {
          done();
        }
      ], 0);
    });

    it('UICP1302 002 異なるリスト間でドラッグ＆ドロップができる', function (done) {
      this.timeout(0);

      var list1 = testObj.doc.getElementsByClassName('jquery-ui-sortable')[0].children;
      var list1No1 = list1[0];
      var list2 = testObj.doc.getElementsByClassName('jquery-ui-sortable')[1].children;
      var list2No1 = list2[0];

      // ドラッグスタートとなる座標を取得
      var list1No1Left = list1No1.getBoundingClientRect().left;
      var list1No1Top = list1No1.getBoundingClientRect().top;

      // ドロップ対象となる座標を取得
      var list2No1Left = list2No1.getBoundingClientRect().left;
      var list2No1Bottom = list2No1.getBoundingClientRect().bottom;

      // テスト実行
      m.executeSequentialWithDelay([

        function () {

          // 画面のサイズを以下に固定することで、画面サイズによる座標のずれをなくす。
          testObj.sandboxEl.width = 800;
          testObj.sandboxEl.height = 600;
        },

        function () {

          // 1.項目1－1をドラッグする
          list1No1.dispatchEvent(m.simulateEvent('mousedown', {
            clientX: list1No1Left,
            clientY: list1No1Top,
            which: 1
          }));
          list1No1.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: list1No1Left,
            clientY: list2No1Bottom,
            which: 1
          }));
          list1No1.dispatchEvent(m.simulateEvent('mousemove', {
            clientX: list2No1Left,
            clientY: list2No1Bottom,
            which: 1
          }));
        },
        function () {

          // 2.項目2－1の下に項目1－1をドロップする
          list1No1.dispatchEvent(m.simulateEvent('mouseup'));
        },
        function () {

          // オブジェクトの再取得
          var list2 = testObj.doc.getElementsByClassName('jquery-ui-sortable')[1].children;
          list2No1 = list2[1];

          /**
            * ■確認項目1:中央のリストの上から2番目が項目1－1になっていることを確認する
            * 1)テキストの値が'項目 1-1'を含んでいること
            */
          var list2No1Text = list2No1.innerHTML;
          expect(list2No1Text, 'UICP1002 001').to.contain('項目 1-1');
        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
