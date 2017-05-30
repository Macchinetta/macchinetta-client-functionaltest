/*
 * Copyright(c) 2017 NTT Corporation.
 */
// tabs-right.js

'use strict';

$(function () {

  $('#tabs').tabs({
  });

  $('.tabs-right .ui-tabs-nav > *')
  .removeClass('ui-corner-top')
  .addClass('ui-corner-right');
});
