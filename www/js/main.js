'use strict';
require.config({
  paths: {
    zepto: '../js/lib/zepto.min',
    underscore: '../js/lib/underscore-min'
  },
  shim: {
    zepto: {
      exports: '$'
    },
    underscore: {
      deps: ['zepto'],
      exports: '_'
    }
  },
  deps: [
    'boot'
  ]
});
