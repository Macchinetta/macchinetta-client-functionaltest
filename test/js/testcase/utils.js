/*
 * Copyright(c) 2017 NTT Corporation.
 */
/*
 * テストのutil。
 */
'use strict';
window.m = {

  /**
   * functions で指定したリスト内の各関数を、delay (ms) で指定した時間間隔ごとに順に呼び出す。
   * @param {array.<function>} functions 関数(テスト内容)
   * @param {number} delay 待ち時間
   */
  executeSequentialWithDelay: function (functions, delay) {
    functions = Array.isArray(functions) ? functions: [functions];
    functions.reduce(function (acc, fn) {
      return acc.then(function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            fn();
            resolve();
          }, delay);
        });
      });
    }, Promise.resolve());
  },

 
  /**
   * fnObjects[].fn で指定したリスト内の各関数を、fnObject[].delay (ms) で指定した時間間隔ごとに順に呼び出す。
   * fnObjects[].deley で指定がない場合は、defaultDelay (ms) で指定した時間毎に呼び出す。
   * @param {Object[]} fnObjects 関数(テスト内容)と待ち時間
   * @param {function} fnObjects[].fn 関数(テスト内容)
   * @param {number} fnObjects[].delay　待ち時間
   * @param {number} defaultDelay　デフォルトの待ち時間
   */
  executeSequentialWithSpecificDelay : function (fnObjects, defaultDelay) {
    fnObjects = Array.isArray(fnObjects) ? fnObjects: [fnObjects];
    fnObjects.reduce(function (acc, fnObject) {
      return acc.then(function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            fnObject.fn();
            resolve();
          }, fnObject.delay || defaultDelay);
        });
      });
    }, Promise.resolve());
  },
  
  /**
   * 発火イベントの作成。
   * @param {string} type イベントのタイプ
   * @param {object} opts オプション [例:keyCode: KEY.DOWN(複数の場合はカンマ区切り)]
   */
  simulateEvent: function (type, opts) {
    var e;
    switch (type) {
      // ダブルクリックはMouseEventsではなくEventで動作することを確認。
      // そのため、クリック時のみMouseEventにする
      case 'click':
        // キー押下(CtrlとShift) + クリックのイベントはMouseEventsでのイベント発火ができない
        if (null !== opts && undefined !== opts && (opts.ctrlKey || opts.shiftKey)) {
          e = document.createEvent('Event');
          e.initEvent(type, true, true);
          e = m.extend(type, e, opts);

        } else {
          e = document.createEvent('MouseEvents');
          e.initEvent('click', true, true);
        }
        break;
      case 'change':
        e = document.createEvent('HTMLEvents');
        e.initEvent(type, true, true);
        break;
      default:
        e = document.createEvent('Event');
        e.initEvent(type, true, true);
        e = m.extend(type, e, opts);
    }
    return e;
  },

  /**
   * イベントパラメータの設定。
   * @param {string} type イベントのタイプ
   * @param {object} event イベント
   * @param {object} opts オプション [例:keyCode: KEY.DOWN(複数の場合はカンマ区切り)]
   */
  extend: function (type, event, opts) {
    var defalutopts = {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: 0,
      charCode: undefined,
      detail: 0,
      screenX: 0,
      screenY: 0,
      clientX: 1,
      clientY: 1,
      button: 0,
      relatedTarget: undefined
    };
    for (var defalutoptsKey in defalutopts) {
      event[defalutoptsKey] = defalutopts[defalutoptsKey];
    }
    for (var optsKey in opts) {
      event[optsKey] = opts[optsKey];
    }
    return event;
  },

  /**
   * テストファイルの事前処理。
   * @param {object} done mochaのbeforeのdone
   * @param {object} testObj テスト用オブジェクト
   */
  testCommonBefore: function (done, testObj) {
    m.testFinished = false;
    testObj.sandboxEl = document.createElement('iframe');
    // デバッグ時の動作が確認できるよう、画面サイズを大きくする。
    testObj.sandboxEl.width = 1000;
    testObj.sandboxEl.height = 500;
    document.body.appendChild(testObj.sandboxEl);
    done();
  },

  /**
   * テストファイルの事後処理。
   * @param {object} done mochaのafterのdone
   * @param {object} testObj テスト用オブジェクト
   */
  testCommonAfter: function (done, testObj) {
    document.body.removeChild(testObj.sandboxEl);
    m.testFinished = true;
    done();

  },

  /**
   * テスト毎の事前処理。
   * @param {string} sampleFileName サンプルファイルパス
   * @param {object} done mochaのbeforeEachのdone
   * @param {object} testObj テスト用オブジェクト
   */
  testCommonBeforeEach: function (sampleFileName, done, testObj) {
    testObj.sandboxEl.addEventListener('load', function onload() {
      testObj.sandboxEl.removeEventListener('load', onload);
      // tick
      setTimeout(function () {
        testObj.win = testObj.sandboxEl.contentWindow;
        testObj.doc = testObj.sandboxEl.contentWindow.document;
        done();
      }, 0);
    });
    testObj.sandboxEl.src = PATH.SAMPLE_FILE_PATH + sampleFileName;
  }

};