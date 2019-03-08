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
  var MSG_JQUERY_UI_ACCORDION_BASIC = 'jquery-ui-accordion-basic.';

  describe('UICP06 jQuery UI形式の基本的なアコーディオンが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_ACCORDION_BASIC;

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

/**
    * 本テストでは、アコーディオンのパネルが開いていることを確認するために、パネルの高さが正しいかどうかで判断している。
    * ただし、パネルの高さはブラウザごとに異なっており、
    * Edge、IE、Firefoxでは高さが85となるのに対し、Chromeでは高さが84となる。
    * そのため、パネルの高さを測る際は、85を基準とし、+-1の範囲を許容するようにしている。
    */

    it('UICP0601 001 それぞれ対応したパネルが開き、その他のパネルが閉じること。１つのパネルしか開いていないこと。', function (done) {
      this.timeout(0);
      var accordionHeader = testObj.doc.querySelectorAll('#accordion > h3');
      var accordionBody = testObj.doc.querySelectorAll('#accordion > div');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // ■確認項目1　: アコーディオン1のみパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          //2)assert : パネルの高さが正しいか確認する。
          assert(accordionBody[0].clientHeight >= 84 && accordionBody[0].clientHeight <= 86, MSG_JQUERY_UI_ACCORDION_BASIC);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_BASIC);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_BASIC);
        },
        function () {

          // アコーディオン2を押下する。
          accordionHeader[1].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目2　: アコーディオン2のみパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          //2)assert : パネルの高さが正しいか確認する。
          assert.equal(accordionBody[0].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_BASIC);
          assert(accordionBody[1].clientHeight >= 84 && accordionBody[1].clientHeight <= 86, MSG_JQUERY_UI_ACCORDION_BASIC);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_BASIC);
        },
        function () {

          // アコーディオン3を押下する。
          accordionHeader[2].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目3　: アコーディオン3のみパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          //2)assert : パネルの高さが正しいか確認する。
          assert.equal(accordionBody[0].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_BASIC);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_BASIC);
          assert(accordionBody[2].clientHeight >= 84 && accordionBody[2].clientHeight <= 86, MSG_JQUERY_UI_ACCORDION_BASIC);
        },
        function () {

          // アコーディオン1を押下する。
          accordionHeader[0].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目4　: アコーディオン1のみパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          //2)assert : パネルの高さが正しいか確認する。
          assert(accordionBody[0].clientHeight >= 84 && accordionBody[0].clientHeight <= 86, MSG_JQUERY_UI_ACCORDION_BASIC);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_BASIC);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_BASIC);
        },
        function () {

          // アコーディオン1をもう一度押下する。
          accordionHeader[0].dispatchEvent(m.simulateEvent('click'));
        },
        function () {

          // ■確認項目5　: アコーディオン1のみパネルが開いていること
          //1)assert.equal : パネルの高さが期待値と等しいこと確認する。
          //2)assert : パネルの高さが正しいか確認する。
          assert(accordionBody[0].clientHeight >= 84 && accordionBody[0].clientHeight <= 86, MSG_JQUERY_UI_ACCORDION_BASIC);
          assert.equal(accordionBody[1].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_BASIC);
          assert.equal(accordionBody[2].clientHeight, '0', MSG_JQUERY_UI_ACCORDION_BASIC);
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
