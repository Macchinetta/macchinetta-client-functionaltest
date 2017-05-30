/*
 * Copyright(c) 2017 NTT Corporation.
 */
/*
 * 試験対象(サンプル)ファイルのパスを定義するjs。
 */
'use strict';

/**
 * サンプルファイルのパス定義
 */
window.PATH = {

  // サンプルファイルのパス
  SAMPLE_FILE_PATH : '../src/',

  // 3.2. ボタン
  JQUERY_UI_BUTTONBASIC : 'jquery-ui/button-basic.html',
  JQUERY_UI_BUTTON_TAG_CHANGE : 'jquery-ui/button-tag-change.html',
  JQUERY_UI_BUTTON_BUTTONSET : 'jquery-ui/button-buttonset.html',
  BOOTSTRAP_BUTTONBASIC : 'bootstrap/button-basic.html',
  BOOTSTRAP_BUTTON_TAG_CHANGE : 'bootstrap/button-tag-change.html',
  BOOTSTRAP_BUTTON_BUTTONSET : 'bootstrap/button-buttonset.html',

  // 3.3. モーダルダイアログ
  JQUERY_UI_MODAL : 'jquery-ui/modal.html',
  BOOTSTRAP_MODAL_MARKUP : 'bootstrap/modal-markup.html',
  BOOTSTRAP_MODAL_JAVASCRIPT : 'bootstrap/modal-javascript.html',

  // 3.4. モードレスダイアログ
  JQUERY_UIMODELESS : 'jquery-ui/modeless.html',

  // 3.5. パンくずリスト表示
  BOOTSTRAP_BREADCRUMB : 'bootstrap/breadcrumb.html',

  // 3.6. ドロップダウンリスト
  JQUERY_UI_SELECTMENU : 'jquery-ui/selectmenu.html',
  BOOTSTRAP_DROPDOWNMENU : 'bootstrap/dropdownmenu.html',

  // 3.7. アコーディオン
  JQUERY_UI_ACCORDION_BASIC : 'jquery-ui/accordion-basic.html',
  JQUERY_UI_ACCORDION_COLLAPSIBLE : 'jquery-ui/accordion-collapsible.html',
  JQUERY_UI_ACCORDION_MULTIPLE : 'jquery-ui/accordion-multiple.html',
  BOOTSTRAP_ACCORDION : 'bootstrap/accordion.html',

  // 3.8. タブ
  JQUERY_UI_TABS : 'jquery-ui/tabs.html',
  JQUERY_UI_TABS_BOTTOM : 'jquery-ui/tabs-bottom.html',
  JQUERY_UI_TABS_LEFT : 'jquery-ui/tabs-left.html',
  JQUERY_UI_TABS_RIGHT : 'jquery-ui/tabs-right.html',
  BOOTSTRAP_TAB : 'bootstrap/tab.html',

  // 3.9 スライダー
  JQUERY_UI_SLIDER : 'jquery-ui/slider.html',
  JQUERY_UI_SLIDER_NUMBERIC : 'jquery-ui/slider-numeric.html',
  JQUERY_UI_SLIDER_CHANGE_FONTSIZE : 'jquery-ui/slider-change-fontsize.html',
  JQUERY_UI_SLIDER_LABELS : 'jquery-ui/slider-labels.html',
  JQUERY_UI_SLIDER_EVENT_CHECK : 'jquery-ui/slider-event-check.html',
  JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL : 'jquery-ui/slider-labels-change-interval.html',

  // 3.10. カルーセル
  SLICK_CAROUSEL_BASIC : 'slick/carousel-basic.html',
  SLICK_CAROUSEL_CENTER : 'slick/carousel-center.html',
  SLICK_CAROUSEL_NAVIGATION : 'slick/carousel-navigation.html',
  BOOTSTRAP_CAROUSEL_MARKUP : 'bootstrap/carousel-markup.html',
  BOOTSTRAP_CAROUSEL_JAVASCRIPT : 'bootstrap/carousel-javascript.html',

  // 3.11. 日付入力時のカレンダー表示
  JQUERY_UI_DATEPICKER_BASIC : 'jquery-ui/datepicker-basic.html',
  JQUERY_UI_DATEPICKER_HOLIDAY : 'jquery-ui/datepicker-holiday.html',
  JQUERY_UI_DATEPICKER_HOLIDAY_ADD : 'jquery-ui/datepicker-holiday.html',
  JQUERY_UI_DATEPICKER_LOCAL_MULTIPLE : 'jquery-ui/datepicker-locale-multiple.html',
  JQUERY_UI_DATEPICKER_LOCAL_MULTIPLE_JA_EN_GB : 'jquery-ui/datepicker-locale-multiple-ja-en-GB.html',
  JQUERY_UI_DATEPICKER_RANGE : 'jquery-ui/datepicker-range.html',
  JQUERY_UI_DATEPICKER_LOCALE : 'jquery-ui/datepicker-locale.html',
  BOOTSTRAP_DATEPICKER_MARKUP : 'bootstrap-datepicker/bootstrap-datepicker-markup.html',
  BOOTSTRAP_DATEPICKER_JAVASCRIPT : 'bootstrap-datepicker/bootstrap-datepicker-javascript.html',

  // 3.12. オートコンプリート
  JQUERY_UI_AUTOCOMPLETE : 'jquery-ui/autocomplete.html',

  // 3.13. プログレスバーによる進捗度表示
  JQUERY_UI_PROGRESSBAR : 'jquery-ui/progressbar.html',
  JQUERY_UI_PROGRESSBAR_PERCENT_DISPLAY : 'jquery-ui/progressbar-percent-display.html',
  BOOTSTRAP_PROGRESSBAR : 'bootstrap/progressbar.html',

  // 3.14. ドラッグアンドドロップ
  JQUERY_UI_DRAG_AND_DROP : 'jquery-ui/drag-and-drop.html',
  JQUERY_UI_DRAG_AND_DROP_SORTABLE : 'jquery-ui/drag-and-drop-sortable.html',

  // 3.15. レスポンシブウェブデザイン
  BOOTSTRAP_RESPONSIVE_WEB_DESIGN : 'bootstrap/responsive-web-design.html',

  // 4.2. 行追加・削除・編集
  INSERT_AND_DELETE_ROWS : 'slickgrid/insert-and-delete-row.html',
  INSERT_AND_DELETE_ROWS_TS : 'tablesorter/insert-and-delete-row.html',

  // 4.3. 行の並び替え(slickgrid)
  MOVE_ROWS : 'slickgrid/move-row.html',

  // 4.4. ヘッダを固定したデータ行のスクロール
  FIXED_HEADER : 'slickgrid/default.html',
  FIXED_HEADER_TS : 'tablesorter/fixed-header.html',

  // 4.5. ページネーション
  PAGENATION : 'slickgrid/pagination.html',
  PAGENATION_TS : 'tablesorter/pagination.html',

  // 4.6. ソート
  SORT : 'slickgrid/sort.html',
  SORT_TS : 'tablesorter/default.html',
  MULTIPLE_SORT_TS : 'tablesorter/composite-key.html',
  NO_SORT_TS : 'tablesorter/not-sortable.html',

  // 4.7. カラムの並び替え
  COL_SORT : 'slickgrid/default.html',
  COL_NO_SORT : 'slickgrid/not-reorder.html',

  // 4.8. コピーアンドペースト編集
  COPY_AND_PASTE : 'slickgrid/copy-and-paste.html',

  // 4.9. テーブルのスクロールによる非同期データ取得
  SLICKGRID_WITH_AJAX : 'slickgrid/slickgrid-with-ajax.html',

  // 5.1 ショートカットキー制御
  DISABLING_COPY_AND_PASTE : 'mousetrap/disable-copy-paste.html',
  DIASBLE_INPUT_SELECT_ELEMENT : 'mousetrap/disable-input-select-element.html',

  // 5.2 範囲選択防止
  JQUERY_PREVENT_RANGE_SELECTION_ALL_ELEMENTS : 'jquery/prevent-range-selection-all-elements.html',
  JQUERY_PREVENT_RANGE_SELECTION_TARGET_ELEMENTS : 'jquery/prevent-range-selection-target-elements.html',

  // 5.3. ボタンの活性状態の変更
  ENABLE_AND_DISABLE_BUTTON : 'jquery/enable-and-disable-button.html',

  // 5.4. 二度押し無効化(二重送信防止)
  PREVENT_CONTINUOUS_CLICK : 'jquery/prevent-continuous-click.html',
  PREVENT_CONTINUOUS_CLICK_FOR_A : 'jquery/prevent-continuous-click_for_a.html',
  DEMONSTRATE_THROUGH_ASYNCHRONOUS_COMMUNICATION : 'jquery/demonstrate-through-asynchronous-communication.html',

  // 5.5. 右クリック無効
  DISABLING_RIGHT_CLICK : 'jquery/disable-right-click.html',

  // 5.6. 画面要素間の連動
  JQUERY_WORK_WITH_ELEMENT : 'jquery/work-with-element.html',
  JQUERY_WORK_WITH_ELEMENT_AJAX : 'jquery/work-with-element-ajax.html',

  // 5.7. フォーマット変換・文字種変換
  MOMENT_CONVERT_DATE : 'moment/convert-date.html',
  MOMENT_CHECK_DATE : 'moment/check-date.html',
  MOMENT_CONVERT_TIME : 'moment/convert-time.html',
  UNDERSCORE_STRING_CONVERT_NUMBER : 'underscore-string/convert-number.html',
  UNDERSCORE_STRING_PADDING : 'underscore-string/padding.html',
  UNDERSCORE_STRING_TRIMMING : 'underscore-string/trimming.html',
  MOMENT_CONVERT_ZENKAKU_HANKAKU : 'moment/convert-zenkaku-hankaku.html',
  MOMENT_CONVERT_ZENKAKU_HANKAKU_FOR_KATAKANA : 'moment/convert-zenkaku-hankaku-for-katakana.html',

  // 5.8. 入力値チェック
  VALIDATION : 'parsleyjs/validation.html',
  VALIDATION_LOCALE : 'parsleyjs/validation-locale.html',

  // 6.1. Deferredによる非同期処理制御
  DEFERRED_PROMISE_ASYNC : 'jquery/deferred-promise-async.html',
  DEFERRED_PROMISE : 'jquery/deferred-promise.html',
  DEFERRED_PROMISE_BRANCH_THEN : 'jquery/deferred-promise-branch-then.html',
  DEFERRED_PROMISE_BRANCH_DONE : 'jquery/deferred-promise-branch-done.html',
  DEFERRED_PROMISE_PARALLEL : 'jquery/deferred-promise-parallel.html',
  DEFERRED_PROMISE_AJAX : 'jquery/deferred-promise-ajax.html',

  // 8.1. 構成ライブラリを使用する際のTips
  HEADER_BEFORE : 'bootstrap-and-slickgrid-header/header-before.html',
  HEADER_AFTER : 'bootstrap-and-slickgrid-header/header-after.html',
  TAB_BEFORE : 'bootstrap-and-slickgrid-tab/tab-before.html',
  TAB_AFTER : 'bootstrap-and-slickgrid-tab/tab-after.html',
  MODELESS_BEFORE : 'bootstrap-and-jquery-ui/modeless-before.html',
  MODELESS_AFTER : 'bootstrap-and-jquery-ui/modeless-after.html',

  // 8.2. 構成ライブラリ以外の便利なライブラリ
  LODASH : 'lodash/lodash.html'


};
