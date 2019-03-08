/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
/*
 * sample表示用のjs。
 * common.js、file-path.jsも同時に読み込むこと。
 */

/**
 * 表示時に実行するjs。。
 */
'use strict';
(function () {
  window.onload = function () {
    setFilePath();
  };

  /**
   * サンプルプログラムのファイルパスを設定。
   */
  function setFilePath() {

    document.getElementById('UICP0101').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_BUTTONBASIC);
    };
    document.getElementById('UICP0102').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_BUTTON_CONTROLGROUP);
    };
    document.getElementById('UICP0103').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_BUTTON_TAG_CHANGE);
    };
    document.getElementById('UICP0104').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_BUTTONBASIC);
    };
    document.getElementById('UICP0105').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_BUTTON_BUTTONGROUP);
    };
    document.getElementById('UICP0106').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_BUTTON_TAG_CHANGE);
    };
    document.getElementById('UICP0201').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_MODAL);
    };
    document.getElementById('UICP0202').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_MODAL_MARKUP);
    };
    document.getElementById('UICP0203').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_MODAL_JAVASCRIPT);
    };
    document.getElementById('UICP0301').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UIMODELESS);
    };
    document.getElementById('UICP0401').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_BREADCRUMB);
    };
    document.getElementById('UICP0501').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_SELECTMENU);
    };
    document.getElementById('UICP0502').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_DROPDOWNMENU);
    };
    document.getElementById('UICP0601').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_ACCORDION_BASIC);
    };
    document.getElementById('UICP0602').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_ACCORDION_COLLAPSIBLE);
    };
    document.getElementById('UICP0603').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_ACCORDION_MULTIPLE);
    };
    document.getElementById('UICP0604').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_ACCORDION);
    };
    document.getElementById('UICP0701').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_TABS);
    };
    document.getElementById('UICP0702').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_TABS_BOTTOM);
    };
    document.getElementById('UICP0703').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_TABS_LEFT);
    };
    document.getElementById('UICP0704').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_TABS_RIGHT);
    };
    document.getElementById('UICP0705').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_TAB);
    };
    document.getElementById('UICP0801').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_SLIDER);
    };
    document.getElementById('UICP0802').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_SLIDER_NUMBERIC);
    };
    document.getElementById('UICP0803').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_SLIDER_CHANGE_FONTSIZE);
    };
    document.getElementById('UICP0804').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_SLIDER_LABELS);
    };
    document.getElementById('UICP0805').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_SLIDER_EVENT_CHECK);
    };
    document.getElementById('UICP0806').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_SLIDER_LABELS_CHANGE_INTERVAL);
    };
    document.getElementById('UICP0901').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.SLICK_CAROUSEL_BASIC);
    };
    document.getElementById('UICP0902').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.SLICK_CAROUSEL_CENTER);
    };
    document.getElementById('UICP0903').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.SLICK_CAROUSEL_NAVIGATION);
    };
    document.getElementById('UICP0904').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_CAROUSEL_MARKUP);
    };
    document.getElementById('UICP0905').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_CAROUSEL_JAVASCRIPT);
    };
    document.getElementById('UICP1001').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_DATEPICKER_BASIC);
    };
    document.getElementById('UICP1002').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_DATEPICKER_HOLIDAY);
    };
    document.getElementById('UICP1003').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_DATEPICKER_HOLIDAY_ADD);
    };
    document.getElementById('UICP1004-001').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_DATEPICKER_LOCAL_MULTIPLE);
    };
    document.getElementById('UICP1004-002').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_DATEPICKER_LOCAL_MULTIPLE_JA_EN_GB);
    };
    document.getElementById('UICP1005').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_DATEPICKER_RANGE);
    };
    document.getElementById('UICP1006').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_DATEPICKER_LOCALE);
    };
    document.getElementById('UICP1007').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_DATEPICKER_MARKUP);
    };
    document.getElementById('UICP1008').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_DATEPICKER_JAVASCRIPT);
    };
    document.getElementById('UICP1101').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_AUTOCOMPLETE);
    };
    document.getElementById('UICP1201').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_PROGRESSBAR);
    };
    document.getElementById('UICP1202').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_PROGRESSBAR_PERCENT_DISPLAY);
    };
    document.getElementById('UICP1203').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_PROGRESSBAR);
    };
    document.getElementById('UICP1301').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_DRAG_AND_DROP);
    };
    document.getElementById('UICP1302').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_UI_DRAG_AND_DROP_SORTABLE);
    };
    document.getElementById('UICP1401').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.BOOTSTRAP_RESPONSIVE_WEB_DESIGN);
    };
    document.getElementById('GRID0101').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.INSERT_AND_DELETE_ROWS);
    };
    document.getElementById('GRID0102').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.INSERT_AND_DELETE_ROWS_TS);
    };
    document.getElementById('GRID0201').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.MOVE_ROWS);
    };
    document.getElementById('GRID0301').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.FIXED_HEADER);
    };
    document.getElementById('GRID0302').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.FIXED_HEADER_TS);
    };
    document.getElementById('GRID0401').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.PAGENATION);
    };
    document.getElementById('GRID0402').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.PAGENATION_TS);
    };
    document.getElementById('GRID0501').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.SORT);
    };
    document.getElementById('GRID0502').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.SORT_TS);
    };
    document.getElementById('GRID0503').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.MULTIPLE_SORT_TS);
    };
    document.getElementById('GRID0504').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.NO_SORT_TS);
    };
    document.getElementById('GRID0601').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.COL_SORT);
    };
    document.getElementById('GRID0602').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.COL_NO_SORT);
    };
    document.getElementById('GRID0701').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.COPY_AND_PASTE);
    };
    document.getElementById('GRID0801').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.SLICKGRID_WITH_AJAX);
    };
    document.getElementById('CTRL0101').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.DISABLING_COPY_AND_PASTE);
    };
    document.getElementById('CTRL0102').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.DIASBLE_INPUT_SELECT_ELEMENT);
    };
    document.getElementById('CTRL0201').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_PREVENT_RANGE_SELECTION_ALL_ELEMENTS);
    };
    document.getElementById('CTRL0202').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_PREVENT_RANGE_SELECTION_TARGET_ELEMENTS);
    };
    document.getElementById('CTRL0301').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.ENABLE_AND_DISABLE_BUTTON);
    };
    document.getElementById('CTRL0401').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.PREVENT_CONTINUOUS_CLICK);
    };
    document.getElementById('CTRL0402').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.PREVENT_CONTINUOUS_CLICK_FOR_A);
    };
    document.getElementById('CTRL0403').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.DEMONSTRATE_THROUGH_ASYNCHRONOUS_COMMUNICATION);
    };
    document.getElementById('CTRL0501').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.DISABLING_RIGHT_CLICK);
    };
    document.getElementById('CTRL0601').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_WORK_WITH_ELEMENT);
    };
    document.getElementById('CTRL0602').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_WORK_WITH_ELEMENT_AJAX);
    };
    document.getElementById('CTRL0701').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.MOMENT_CONVERT_DATE);
    };
    document.getElementById('CTRL0702').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.MOMENT_CHECK_DATE);
    };
    document.getElementById('CTRL0703').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.MOMENT_CONVERT_TIME);
    };
    document.getElementById('CTRL0707').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_CONVERT_ZENKAKU_HANKAKU);
    };
    document.getElementById('CTRL0708').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.JQUERY_CONVERT_ZENKAKU_HANKAKU_FOR_KATAKANA);
    };
    document.getElementById('CTRL0801').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.VALIDATION);
    };
    document.getElementById('CTRL0802').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.CUSTOM_VALIDATION);
    };
    document.getElementById('ASNC0101').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.DEFERRED_PROMISE_ASYNC);
    };
    document.getElementById('ASNC0102').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.DEFERRED_PROMISE);
    };
    document.getElementById('ASNC0103').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.DEFERRED_PROMISE_BRANCH_THEN);
    };
    document.getElementById('ASNC0104').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.DEFERRED_PROMISE_PARALLEL);
    };
    document.getElementById('ASNC0105').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.DEFERRED_PROMISE_AJAX);
    };
    document.getElementById('APND0101').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.HEADER_BEFORE);
    };
    document.getElementById('APND0102').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.HEADER_AFTER);
    };
    document.getElementById('APND0103').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.TAB_BEFORE);
    };
    document.getElementById('APND0104').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.TAB_AFTER);
    };
    document.getElementById('APND0105').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.MODELESS_BEFORE);
    };
    document.getElementById('APND0106').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.MODELESS_AFTER);
    };
    document.getElementById('APND0201').onclick = function (e) {
      e.preventDefault();
      handlers.openSampleHtml(PATH.LODASH);
    };

  }

  /**
   * サンプルプログラムのフルパスを取得。
   * @param {string} ファイル名
   * @return {string} フルパス
   */
  function getFullFilePath(path) {
    return PATH.SAMPLE_FILE_PATH + path;
  }

  /**
   * イベントハンドラ関数定義。
   */
  var handlers = {

    // 指定したパスを設定する。
    openSampleHtml: function (path) {
      m.openNewWindow(getFullFilePath(path));
    }
  };

}());
