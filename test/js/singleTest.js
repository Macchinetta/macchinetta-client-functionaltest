/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
/*
 * 自動試験単実行用のjs。
 */

/**
 * 表示時に実行するjs。
 */
'use strict';

(function () {
  var target = $('a[id!=""]');
  target.on('click', function (e) {
    e.preventDefault();
    var path = this.id;
    var url = location.href.replace(/\/test\/singleTest.html/, '/test/test.html?grep=') + pathList[path];
    url = url.replace(/\(/g, '\\(').replace(/\)/g, '\\)'); // 文字列にふくまれる「（）」のエスケープ
    url = encodeURI(url); // urlを正常なURIにエンコード
    window.open(url);
  });
  var pathList = {
    'UICP0101': 'UICP01 jQuery UI形式の基本的なボタンが利用できること',
    'UICP0102': 'UICP01 jQuery UI形式のボタングループ化が利用できること',
    'UICP0103': 'UICP01 jQuery UI形式のspan要素やdiv要素でのボタンが利用できること',
    'UICP0104': 'UICP01 Bootstrap形式の基本的なボタンが利用できること',
    'UICP0105': 'UICP01 Bootstrap形式のボタングループ化が利用できること',
    'UICP0106': 'UICP01 Bootstrap形式のspan要素やdiv要素でのボタンが利用できること',
    'UICP0201': 'UICP02 jQuery UI形式のモーダルダイアログが利用できること',
    'UICP0202': 'UICP02 Bootstrapを用いてマークアップ形式のモーダルダイアログが利用できる',
    'UICP0203': 'UICP02 Bootstrapを用いてJavaScript形式のモーダルダイアログが利用できる',
    'UICP0301': 'UICP03 jQuery UI形式のモードレスダイアログが利用できる',
    'UICP0401': 'UICP04 Bootstrap形式のパンくずリストが利用できる',
    'UICP0501': 'UICP05 jQuery UI形式のセレクトメニューが利用できる',
    'UICP0502': 'UICP05 Bootstrap形式のドロップダウンリストが利用できる',
    'UICP0601': 'UICP06 jQuery UI形式の基本的なアコーディオンが利用できること',
    'UICP0602': 'UICP06 jQuery UI形式で全てのパネルを閉じることができるアコーディオンを利用できること',
    'UICP0603': 'UICP06 jQuery UI形式で全てのパネルが開くアコーディオンが利用できること',
    'UICP0604': 'UICP06 Bootstrap形式のアコーディオンが利用できる',
    'UICP0701': 'UICP07 jQuery UI形式の基本的なタブが利用できること',
    'UICP0705': 'UICP07 Bootstrap形式のタブが利用できる',
    'UICP0801': 'UICP08 jQuery UI形式の基本的なスライダーが利用できること',
    'UICP0802': 'UICP08 jQuery UI形式でスライダーのオプション設定が利用できること',
    'UICP0803': 'UICP08 jQuery UI形式でスライダーイベントを利用した他部品との連動が利用できること',
    'UICP0804': 'UICP08 jQuery UI形式で目盛り付きスライダーが利用できること',
    'UICP0805': 'UICP08 jQuery UI形式でstart、stop、slider イベントを設定したスライダーが利用できること',
    'UICP0806': 'UICP08 jQuery UI形式で目盛り付きスライダー(目盛り間隔の変更)が利用できること',
    'UICP1001': 'UICP10 jQuery UI形式の基本的なカレンダーが利用できること',
    'UICP1002': 'UICP10 jQuery UIを用いて休日設定（背景色・休日選択不可・休日定義）ができること',
    'UICP1003': 'UICP10 jQuery UI形式でカレンダーに選択不可の休日を設定ができること',
    'UICP1004-001': 'UICP10 jQuery UI形式でローカライズファイルを複数読み込みができること(英語→日本語)',
    'UICP1004-002': 'UICP10 jQuery UI形式でローカライズファイルを複数読み込みができること(日本語→英語)',
    'UICP1005': 'UICP10 jQuery UIを用いて選択可能な日付の範囲制御ができること',
    'UICP1006': 'UICP10 jQuery UIを用いてカレンダーのロケール設定ができること',
    'UICP1007': 'UICP10 bootstrap-datepickerを用いたマークアップ形式のカレンダー表示ができる',
    'UICP1008': 'UICP10 bootstrap-datepickerを用いたJavaScript形式のカレンダー表示ができる',
    'UICP1101': 'UICP11 jQuery UI形式のオートコンプリートを利用できる',
    'UICP1201': 'UICP12 jQuery UI形式のプログレスバーが利用できること',
    'UICP1202': 'UICP12 jQuery UI形式でプログレスバーを％表示できること',
    'UICP1203': 'UICP12 Bootstrap形式のプログレスバーを利用できる',
    'UICP1301': 'UICP13 jQuery UI形式のドラッグ＆ドロップができる',
    'UICP1302': 'UICP13 jQuery UI形式でリストでのドラッグ＆ドロップができる',
    'UICP1401': 'UICP14 Bootstrap形式のレスポンシブルウェブデザインが利用できる',
    'GRID0101': 'GRID01 SlickGrid形式のテーブルに対して、行追加・削除・編集ができる',
    'GRID0102': 'GRID01 tablesorter形式のテーブルに対して、行追加・削除・編集ができる',
    'GRID0201': 'GRID02 SlickGrid形式のテーブルに対して、行の並び替えができる',
    'GRID0301': 'GRID03 SlickGrid形式のテーブルに対して、ヘッダを固定したデータのスクロールができる',
    'GRID0302': 'GRID03 tablesorter形式のテーブルに対して、ヘッダを固定したデータのスクロールができる',
    'GRID0401': 'GRID04 SlickGrid形式のテーブルに対して、ページネーションの利用ができる',
    'GRID0402': 'GRID04 tablesorter形式のテーブルに対して、ページネーションの利用ができる',
    'GRID0501': 'GRID05 SlickGrid形式のテーブルに対して、ソートが利用できる',
    'GRID0502': 'GRID05 tablesorter形式のテーブルに対して、ソートが利用できる',
    'GRID0503': 'GRID05 tablesorter形式のテーブルに対して、複合キーによるデータのソートができる',
    'GRID0504': 'GRID05 tablesorter形式のテーブルに対して、ソートを無効にしたカラムを設定できる',
    'GRID0601': 'GRID06 SlickGrid形式のテーブルに対して、カラムの並び替えができる',
    'GRID0602': 'GRID06 SlickGrid形式のテーブルに対して、指定のカラムの入れ替えを無効にできる',
    'GRID0701': 'GRID07 SlickGrid形式のテーブルに対して、コピーアンドペースト編集ができる',
    'GRID0801': 'GRID08 SlickGrid形式で非同期通信が利用できること',
    'CTRL0301': 'CTRL03 jQuery形式のボタンの活性状態を変更できる',
    'CTRL0401': 'CTRL04 jQuery形式のボタン2度押し無効化ができること',
    'CTRL0402': 'CTRL04 jQuery形式のリンク2度押し無効化ができること',
    'CTRL0403': 'CTRL04 jQuery形式の非同期通信が利用できること',
    'CTRL0601': 'CTRL06 jQuery形式で ドロップダウンリストの連動が利用できること',
    'CTRL0602': 'CTRL06 jQuery形式で 非同期通信を使用したドロップダウンリストの連動が利用できること',
    'CTRL0701': 'CTRL07 moment形式で日付フォーマット変換が利用できること',
    'CTRL0702': 'CTRL07 moment形式で日付妥当性チェックが利用できること',
    'CTRL0703': 'CTRL07 moment形式で時刻フォーマット変換が利用できること',
    'CTRL0707': 'CTRL07 特定文字の全角半角変換(英数字＋記号)ができること',
    'CTRL0708': 'CTRL07 特定文字の全角半角変換(カタカナ)ができること',
    'CTRL0801': 'CTRL08 Parsleyを用いた入力値チェックができる',
    'CTRL0802': 'CTRL08 Parsleyを用いて独自の入力チェックが利用できる',
    'ASNC0101': 'ASNC01 jQuery形式で1秒毎にメッセージを出力できる',
    'ASNC0102': 'ASNC01 jQuery形式で1秒毎にメッセージを出力（Deferred化）できる',
    'ASNC0103': 'ASNC01 非同期処理のエラーハンドリングが利用できる',
    'ASNC0104': 'ASNC01 jQuery形式で非同期処理の待ち合わせが利用できる',
    'ASNC0105': 'ASNC01 非同期通信にDeferredを適用できる',
    'APND0101': 'APND01 BootstrapとSlickGridを同時に使用する際テーブルの表示が崩れる',
    'APND0102': 'APND01 BootstrapとSlickGridを同時使用時にテーブルを正しく表示する',
    'APND0103': 'APND01 SlickGridのテーブルをタブ内に表示する際テーブルの表示が崩れる',
    'APND0104': 'APND01 SlickGridのテーブルをタブ内に正しく表示できる',
    'APND0105': 'APND01 BootstrapとjQuery UIを同時に使用する際モーダレスダイアログの×ボタンが表示されない',
    'APND0106': 'APND01 BootstrapとjQuery UIを同時に使用する際の名前空間の競合を回避できる',
    'APND0201': 'APND02 Lodashによるコーディング支援'
  };
}());
