'use strict';
require.config({
  paths: {
    jquery: '../js/vendor/jquery.min',
    'jquery.dynatable': '../js/vendor/jquery.dynatable',
    foundation: '../js/vendor/foundation.min',
    'foundation.abide': '../js/vendor/foundation.abide',
    underscore: '../js/vendor/underscore-min',
    sourceMap: '../js/vendor/source-map.min'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    'jquery.dynatable': ['jquery'],
    foundation: ['jquery'],
    'foundation.abide': ['foundation'],
    underscore: {
      deps: ['jquery'],
      exports: '_'
    }
  },
  deps: [
    'boot'
  ]
});
