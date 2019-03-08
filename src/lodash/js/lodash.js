/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// lodash.js

'use strict';

$(function () {

  $('#case1').val(

    // 要素を出力する。
    _([1, 2, 3]).forEach(function (num) {
      return num;
    })

    // -> [1, 2, 3]
  );

  $('#case2').val(

    // 2の倍数の要素からなるリストを返す。
    _.filter([1, 2, 3, 4, 5, 6], function (num) {

      // Macchinetta クライアント基本版 開発ガイドライン のサンプル
      // return num % 2 == 0;
      // gulpjshint 対策 -> Expected '===' and instead saw '=='.
      return num % 2 === 0;
    })

    // -> [2, 4, 6]
  );

  $('#case3').val(

    // 各要素の値を3倍したリストを作る。
    _.map([1, 2, 3], function (num) {
      return num * 3;
    })

    // -> [3, 6, 9]
  );

  // 指定したプロパティに一致する要素からなるリストを返す。
  var characters = [
    {
      'name': 'barney',
      'age': 36,
      'pets': ['hoppy']
    },
    {
      'name': 'fred',
      'age': 40,
      'pets': ['baby puss', 'dino']
    }
  ];

  $('#case4').val(

    // age プロパティが 36 である要素のリストを返す。
    JSON.stringify(_.filter(characters, {
      'age': 36
    }))
  );

  // -> [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]

  var templateStr5 = _.template('hello <%= name %>');
  $('#case5').val(
    templateStr5({
      'name': 'fred'
    })

    // -> 'hello fred'
  );

  var templateStr6 = _.template('<b><%- value %></b>');
  $('#case6').val(
    templateStr6({
      'value': '<script>'
    })

    // -> '<b>&lt;script&gt;</b>'
  );

  var templateStr7 = _.template('<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>');
  $('#case7').val(
    templateStr7({
      'people': ['fred', 'barney']
    })

    // -> '<li>fred</li><li>barney</li>'
  );

});
