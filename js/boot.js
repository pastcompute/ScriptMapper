define(['app'], function (app) {
  'use strict';
  var onDeviceReady = function () {
    console.log("onDeviceReady");
    app.exec();
  };
  document.addEventListener("deviceready", onDeviceReady, false);
  if (typeof cordova === 'undefined') {
    $( document ).ready(function() {
      console.log("document ready");
      app.exec();
    });
  }
});
