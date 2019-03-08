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
  var MSG_JQUERY_UI_PROGRESSBAR = 'jquery-ui-progressbar.';

  describe('UICP12 jQuery UI形式のプログレスバーが利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_UI_PROGRESSBAR;

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
    it('UICP1201 001 Loading・・・となっているプログレスバーが表示されていること', function (done) {

      var progressbar = testObj.doc.querySelector('#progressbar > div.ui-progressbar-value.ui-widget-header.ui-corner-left > div');
      var label = testObj.doc.querySelector('#progressbar > div.progress-label');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {

            // ■確認項目1 : Loading・・・となっているプログレスバーが表示されていることを確認する。
            //1)equal : プログレスバーが表示されていること。また、「Loading...」となっていること。
            assert.equal(testObj.win.getComputedStyle(progressbar).display, 'block', MSG_JQUERY_UI_PROGRESSBAR);
            assert.equal(label.textContent, 'Loading...', MSG_JQUERY_UI_PROGRESSBAR);
          }
        },
        {
          fn: function () {
            done();
          }
        }
      ], 0);
    });
    it('UICP1201 002 Complete!と表示されていること', function (done) {
      this.timeout(13000);

      var label = testObj.doc.querySelector('#progressbar > div.progress-label');
      var button = testObj.doc.getElementById('execute-progressbar');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {

            //EXECUTEボタン押下
            button.dispatchEvent(m.simulateEvent('click'));
          }
        },
        {
          fn: function () {

            // ■確認項目1 : プログレスバーのバー自体と数値がカウントアップしていくことを確認する。
            //1)isAtMost : 第一引数 <= 第二引数の関係であること。
            var progressbar = testObj.doc.querySelector('#progressbar > div.ui-progressbar-value.ui-widget-header.ui-corner-left');
            assert.isAtMost(50, parseInt(label.textContent, 10), MSG_JQUERY_UI_PROGRESSBAR);
            assert.isAtMost(parseInt(label.textContent, 10), 100, MSG_JQUERY_UI_PROGRESSBAR);
            assert.isAtMost(parseInt(progressbar.style.width, 10), 80, MSG_JQUERY_UI_PROGRESSBAR);
            assert.isAtMost(20, parseInt(progressbar.style.width, 10), MSG_JQUERY_UI_PROGRESSBAR);
          },

          //プログレスバーが半分程度になるまで待機
          delay: 5000
        },
        {
          fn: function () {

            // ■確認項目1 : プログレスバーが「Complete!」になることを確認する。
            //1)equal : プログレスバーが「Complete!」であること。また、Widthが100%であること。
            var progressbar = testObj.doc.querySelector('#progressbar > div.ui-progressbar-value.ui-widget-header.ui-corner-left');
            assert.equal(label.textContent, 'Complete!', MSG_JQUERY_UI_PROGRESSBAR);
            assert.equal(progressbar.style.width, '100%', MSG_JQUERY_UI_PROGRESSBAR);
          },

          //「Complete!」になるまで待機
          delay: 7000
        },
        {
          fn: function () {
            done();
          }
        }
      ], 0);
    });
    it('UICP1201 003 Loading・・・となっているプログレスバーが表示されていること', function (done) {
      this.timeout(13000);

      var label = testObj.doc.querySelector('#progressbar > div.progress-label');
      var button = testObj.doc.getElementById('execute-progressbar');
      var button2 = testObj.doc.getElementById('reset-progressbar');

      // テスト実行
      m.executeSequentialWithSpecificDelay([
        {
          fn: function () {

            //EXECUTEボタン押下
            button.dispatchEvent(m.simulateEvent('click'));
          }
        },
        {
          fn: function () {

            // ■確認項目1 : プログレスバーが「Complete!」になることを確認する。
            //1)equal : プログレスバーが「Complete!」であること。また、Widthが100%であること。
            var progressbar = testObj.doc.querySelector('#progressbar > div.ui-progressbar-value.ui-widget-header.ui-corner-left');
            assert.equal(label.textContent, 'Complete!', MSG_JQUERY_UI_PROGRESSBAR);
            assert.equal(progressbar.style.width, '100%', MSG_JQUERY_UI_PROGRESSBAR);
          },

          //「Complete!」になるまで待機
          delay: 12000
        },
        {
          fn: function () {

            //RESET PROGRESSBARボタン押下
            button2.dispatchEvent(m.simulateEvent('click'));
          }
        },
        {
          fn: function () {

            // ■確認項目2 : Loading・・・となっているプログレスバーが表示されていることを確認する。
            //1)equal : プログレスバーが表示されていること。また、「Loading...」となっていること。
            var progressbar = testObj.doc.querySelector('#progressbar > div.ui-progressbar-value.ui-widget-header.ui-corner-left > div');
            assert.equal(testObj.win.getComputedStyle(progressbar).display, 'block', MSG_JQUERY_UI_PROGRESSBAR);
            assert.equal(label.textContent, 'Loading...', MSG_JQUERY_UI_PROGRESSBAR);
          }
        },
        {
          fn: function () {
            done();
          }
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
