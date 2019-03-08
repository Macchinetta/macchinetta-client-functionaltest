/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
/*
 * トップページ用のjs。
 * common.jsも同時に読み込むこと。
 */

'use strict';

(function () {

  // ---------------------------------------------------------------------------
  // 共通変数定義
  // ---------------------------------------------------------------------------
  // 改行コードの定義
  var lineFeedCode = '\r\n';

  // ファイル区切り文字
  var csvDelimiter = ',';

  // ファイル名の定義
  var fileName = 'testResult.log';

  // 試験実行日時
  var testExeDateTime = '';

  // ドキュメントモード
  var documentMode = document.documentMode;

  // 横幅(スクロールバーを含んだ値)
  var innerWidth = window.innerWidth;

  // 横幅(ブラウザウィンドウの枠全体（ウィンドウ枠のデザイン含む）の幅)
  var outerWidth = window.outerWidth;

  // 試験結果ログ出力可否
  var fileDLFlg = false;

  // 試験結果ログ保存未対応の場合のエラーメッセージ
  var unsupportedFileApiMsg = '試験結果ログ保存未対応のブラウザです';

  /**
   * 初期化関数定義 (ウィンドウ読み込み後に行う初期処理)。
   */
  window.onload = function () {

    // 試験結果ログ出力ボタンを非活性化
    document.getElementById('btn-evidence-save').disabled = true;

    // 試験結果ログ出力可否
    fileDLFlg = (window.File && window.FileReader && window.FileList && window.Blob) !== undefined;
    document.getElementById('sample-html').onclick = handlers.openSampleHtmlList;
    document.getElementById('singleTest').onclick = handlers.openSingleTest;
    document.getElementById('btn-test-exe').onclick = handlers.onClickTestExeButton;

    // ファイルダウンロード未対応の場合は非活性化とする
    if (!fileDLFlg) {
      alert(unsupportedFileApiMsg);
    } else {
      document.getElementById('btn-evidence-save').onclick = handlers.onClickSaveButton;
    }

    // 現在時刻を設定
    testExeDateTime = getNowDateTime();
  };

  /**
   * イベントハンドラ関数定義。
   */
  var handlers = {

    // 手動試験用サンプル一覧リンク押下時
    openSampleHtmlList: function () {
      m.openNewWindow('sample.html');
    },

    // 自動試験単実行用サンプル一覧リンク押下時
    openSingleTest: function () {
      m.openNewWindow('singleTest.html');
    },

    // 自動試験実行ボタン押下時
    onClickTestExeButton: function () {

      // 自動試験の実行
      document.getElementById('top-frame').src = 'test.html';

      // 現在時刻を設定
      testExeDateTime = getNowDateTime();

      // 試験結果ログ出力対応ブラウザの場合、ボタンの活性化
      if (fileDLFlg) {
        document.getElementById('btn-evidence-save').disabled = false;
      }
    },

    // 試験結果出力ボタン押下時
    onClickSaveButton: function () {

      // 出力用データ作成処理
      var blob = getBlobUrl(createResultLog());

      // ファイル出力処理
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, fileName);
      } else {

        // Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  /**
   * 試験結果の作成。
   * @return {string} 整形済みの試験結果
   */
  function createResultLog() {
    var topFrameContents = document.getElementById('top-frame').contentDocument;

    // 試験サマリ
    var evCommonData = '\"試験日時：' +
                       testExeDateTime +
                       '\"' +
                       csvDelimiter +
                       '\"試験結果：' +
                       'OK [ ' +
                       topFrameContents.getElementsByTagName('em')[0].innerText +
                       ' ]' +
                       ' NG [ ' +
                       topFrameContents.getElementsByTagName('em')[1].innerText +
                       ' ] \"' +
                       csvDelimiter +
                       '\"userAgent：' +
                       navigator.userAgent +
                       '\"' +
                       csvDelimiter +
                       '\"documentMode：' +
                       documentMode +
                       '\"' +
                       csvDelimiter +
                       '\"innerWidth：' +
                       innerWidth +
                       '\"' +
                       csvDelimiter +
                       '\"outerWidth：' +
                       outerWidth + '\"' +
                       lineFeedCode +
                       lineFeedCode;

    // 試験結果(ヘッダ)
    var evItem = '\"通番\"' +
                 csvDelimiter +
                 '\"試験項目ID\"' +
                 csvDelimiter +
                 '\"試験項目\"' +
                 csvDelimiter +
                 '\"試験時間\"' +
                 csvDelimiter +
                 '\"試験結果\"' +
                 csvDelimiter +
                 '\"NG原因\"' +
                 lineFeedCode;

    // 試験結果
    var evTestData = '';

    // すべてのテスト結果一覧
    var testResultEls = topFrameContents.getElementsByClassName('test');

    // テスト結果一覧分処理を実施
    for (var i = 0; i < testResultEls.length; i++) {

      // 試験項目
      var duration = testResultEls[i].getElementsByClassName('duration')[0];

      // 秒数が取得できない場合は「-」
      var durationText = '';
      if (!(null === duration || undefined === duration)) {
        durationText = duration.textContent;
      }
      var durationLength = (durationText.length) * (-1) - 2;
      var testResultData = testResultEls[i].getElementsByTagName('h2')[0].textContent.slice(0, durationLength);

      // 秒数が取得できない場合は「-」
      if ('' === durationText) {
        durationText = '-';
      }

      // 通番
      evTestData += '\"' + ('000' + (i + 1)).slice(-3) + '\"' + csvDelimiter;

      // 5～8桁目がすべて数字であることの確認。
      var idCheck = isFinite(testResultData.slice(4, 8));
      if (idCheck && 8 < testResultData.length) {

        // 試験項目IDが取れる場合
        evTestData += '\"' + testResultData.slice(0, 8) + '\"' + csvDelimiter;

        // ダブルクォーテーションは2個に置換
        evTestData += '\"' + replaceAll(testResultData.slice(testResultData.indexOf(' ') + 1)) + '\"' + csvDelimiter;
      } else {

        // 試験項目IDが取れない場合
        evTestData += '\"-\"' + csvDelimiter;
        evTestData += '\"' + replaceAll(testResultData) + '\"' + csvDelimiter;
      }
      evTestData += '\"' + durationText + '\"' + csvDelimiter;
      var error = testResultEls[i].getElementsByClassName('error')[0];

      // エラーが取得できない場合はOK
      if (null === error || undefined === error) {
        evTestData += '\"OK\"' + csvDelimiter + '\"-\"';
      } else {
        evTestData += '\"NG\"' + csvDelimiter + '\"' + replaceAll(error.textContent) + '\"';
      }

      // 試験1項目分完了。改行コードの追加。
      evTestData += lineFeedCode;
    }
    return evCommonData + evItem + evTestData;
  }

  /**
   * ファイルオブジェクトの取得。
   * @param {object} content - 出力するコンテンツ(テキスト)
   * @return {object} ファイルオブジェクト
   */
  function getBlobUrl(content) {

    // ファイルの生成
    return new Blob([content], {
      type: 'text/plain'
    });
  }

  /**
   * 現在日時(yyyy/MM/dd hh:mm)を取得。
   * @return {string} 現在日時
   *
   */
  function getNowDateTime() {

    // 試験日
    var today = new Date();
    var year = today.getFullYear();
    var month = ('00' + (today.getMonth() + 1)).slice(-2);
    var date = ('00' + today.getDate()).slice(-2);
    var hour = ('00' + today.getHours()).slice(-2);
    var minute = ('00' + today.getMinutes()).slice(-2);
    return year + '/' + month + '/' + date + ' ' + hour + ':' + minute;
  }

  /**
   * 指定した文字列について、ダブルクォート1つを2つ、改行コードをタブへ変換する。
   * @param {string} content - 出力するコンテンツ(テキスト)
   * @return {string} 置き換えた文字列
   */
  function replaceAll(str) {
    return str.replace(/\"/g, '\"\"').replace(/\n/g, '\t');
  }

}());
