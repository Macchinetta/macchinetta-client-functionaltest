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

  describe('CTRL06 jQuery形式で ドロップダウンリストの連動が利用できること', function () {

    // 試験対象サンプルプログラム。
    var sampleFileName = PATH.JQUERY_WORK_WITH_ELEMENT;
    var MSG_JQUERY_WORK_WITH_ELEMENT = 'jquery-work-with-element.';
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
    it('CTRL0601 001 ドロップダウンリストで選択した際、連動したドロップダウンでリスト内の対応した文字が選択されること', function (done) {
      this.timeout(0);

      var dropDwnList = testObj.doc.querySelector('#region');

      // テスト実行
      m.executeSequentialWithDelay([
        function () {

          // 1.ドロップダウンリストから[関東]を選択する
          dropDwnList.value = 'kanto';
          dropDwnList.dispatchEvent(m.simulateEvent('change'));
        },
        function () {

          /**
            * ■確認項目1-1:都道府県のドロップダウンリストのリスト数が7つであることを確認する
            * 1)都道府県のドロップダウンリストのリスト数が7つであること
            * ■確認項目1-2:都道府県のドロップダウンリストを開くと、　東京、神奈川、埼玉、千葉、茨城、栃木、群馬になること確認する
            * 2)ドロップダウンのoptionに東京、神奈川、埼玉、千葉、茨城、栃木、群馬が順に設定されていること
            */
          var dropdownmenu = testObj.doc.querySelectorAll('#prefecture > option');
          assert.equal(dropdownmenu.length, 7, MSG_JQUERY_WORK_WITH_ELEMENT);
          assert.equal(dropdownmenu[0].textContent, '東京', MSG_JQUERY_WORK_WITH_ELEMENT);
          assert.equal(dropdownmenu[1].textContent, '神奈川', MSG_JQUERY_WORK_WITH_ELEMENT);
          assert.equal(dropdownmenu[2].textContent, '埼玉', MSG_JQUERY_WORK_WITH_ELEMENT);
          assert.equal(dropdownmenu[3].textContent, '千葉', MSG_JQUERY_WORK_WITH_ELEMENT);
          assert.equal(dropdownmenu[4].textContent, '茨城', MSG_JQUERY_WORK_WITH_ELEMENT);
          assert.equal(dropdownmenu[5].textContent, '栃木', MSG_JQUERY_WORK_WITH_ELEMENT);
          assert.equal(dropdownmenu[6].textContent, '群馬', MSG_JQUERY_WORK_WITH_ELEMENT);

        },
        function () {
          done();
        }
      ], 0);
    });

    // ----------------------- テストケース -----------------------
  });
}());
