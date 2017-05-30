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

  // message用定数定義
  var MSG_JQUERY_UI_ACCORDION_MULTIPLE = 'jquery-ui-accordion-multiple.';

  describe('UICP06 jQuery UI形式で全てのパネルが開くアコーディオンが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_ACCORDION_MULTIPLE;

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
    it('UICP0603 001 全てのパネルが閉じていること', function (done) {
      this.timeout(0);
      var accordionBody = testObj.doc.querySelectorAll('#accordion > div > div');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ■確認項目1　: 全てのパネルが閉じていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          assert.equal(accordionBody[0].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
        },
        function () {
          done();
        }
      ], 0);
    });
    it('UICP0603 002 全てのパネルが開いた状態になること', function (done) {
      this.timeout(0);
      var accordionHeader = testObj.doc.querySelectorAll('#accordion >div > h3');
      var accordionBody = testObj.doc.querySelectorAll('#accordion > div > div');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // アコーディオン1を押下する。
          accordionHeader[0].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目1　: アコーディオン1のみパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          assert.equal(accordionBody[0].clientHeight, '93', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
        },
        function () {

          // アコーディオン2を押下する。
          accordionHeader[1].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目2　: アコーディオン1,2のみパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          //2)assert : パネルの高さが正しいか確認する。
          //           Chtome54でアコーディオン２のパネルの高さが92だったため、＋－1の範囲を許容するようにしている。
          assert.equal(accordionBody[0].clientHeight, '93', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert(accordionBody[1].clientHeight >= 92 && accordionBody[1].clientHeight <= 94, MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
        },
        function () {

          // アコーディオン3を押下する。
          accordionHeader[2].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目2　: すべてのパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          //2)assert : パネルの高さが正しいか確認する。
          //           Chtome54でアコーディオン２,３のパネルの高さが92だったため、＋－1の範囲を許容するようにしている。
          assert.equal(accordionBody[0].clientHeight, '93', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert(accordionBody[1].clientHeight >= 92 && accordionBody[1].clientHeight <= 94, MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert(accordionBody[2].clientHeight >= 92 && accordionBody[1].clientHeight <= 94, MSG_JQUERY_UI_ACCORDION_MULTIPLE);
        },

        //アコーディオンは各処理の反映に時間がかかるため500msを指定
        function () {
          done();
        }
      ], 500);
    });
    it('UICP0603 003 それぞれ開いたパネルを閉じた時に、全てのパネルが閉じていること', function (done) {
      this.timeout(0);
      var accordionHeader = testObj.doc.querySelectorAll('#accordion > div > h3');
      var accordionBody = testObj.doc.querySelectorAll('#accordion > div > div');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // アコーディオン1を押下する。
          accordionHeader[0].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目1　: アコーディオン1のみパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          assert.equal(accordionBody[0].clientHeight, '93', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
        },
        function () {

          // もう一度アコーディオン1を押下する。
          accordionHeader[0].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目２　: 全てのパネルが閉じていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          assert.equal(accordionBody[0].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
        },
        function () {

          // アコーディオン2を押下する。
          accordionHeader[1].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目3　: アコーディオン2のみパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          //2)assert : パネルの高さが正しいか確認する。
          //           Chtome54でアコーディオン２のパネルの高さが92だったため、＋－1の範囲を許容するようにしている。
          assert.equal(accordionBody[0].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert(accordionBody[1].clientHeight >= 92 && accordionBody[1].clientHeight <= 94, MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
        },
        function () {

          // もう一度アコーディオン2を押下する。
          accordionHeader[1].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目4　: 全てのパネルが閉じていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          assert.equal(accordionBody[0].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
        },
        function () {

          // アコーディオン３を押下する。
          accordionHeader[2].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目５　: アコーディオン３のみパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          //2)assert : パネルの高さが正しいか確認する。
          //           Chtome54でアコーディオン３のパネルの高さが92だったため、＋－1の範囲を許容するようにしている。
          assert.equal(accordionBody[0].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert(accordionBody[2].clientHeight >= 92 && accordionBody[1].clientHeight <= 94, MSG_JQUERY_UI_ACCORDION_MULTIPLE);
        },
        function () {

          // もう一度アコーディオン３を押下する。
          accordionHeader[2].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目６　: 全てのパネルが閉じていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          assert.equal(accordionBody[0].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_MULTIPLE);
        },

        //アコーディオンは各処理の反映に時間がかかるため500msを指定
        function () {
          done();
        }
      ], 500);
    });

    // ----------------------- テストケース -----------------------
  });
}());
