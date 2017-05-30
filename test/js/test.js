/*
 * Copyright(c) 2017 NTT Corporation.
 */
/*
 * テスト結果表示用のjs。
 * mocha.js、chai.js、es6-promise.js、utils.js、consts.js、file-path.jsも同時に読み込むこと。
 */

/**
 * 表示時に実行するjs。
 */
'use strict';
(function () {
  mocha.setup('bdd');
}());
