'use strict';
define([
  'jquery',
  'underscore',
  'jquery.dynatable',
  'foundation',
  'foundation.abide',
  'sourceMap'
], function($,_) {

  var sourceMap = require('sourceMap');

  function showAbout() {
    $("#about").show();
  }

  function doDump(map, script) {
    $("#main-searchError").hide();
    var consumer;
    try {
      consumer = new sourceMap.SourceMapConsumer(map);
    } catch (e) {
      $("#main-searchError").text(e.message);
      $("#main-searchError").show();
      return;
    }
    var w=window.open("", consumer.file + "_mapping");
    w.focus();
    w.document.write("<title>Mapping dump for " + consumer.file + "</title>");
    w.document.write("<pre>");
    consumer.eachMapping(function (m) {
      var line = m.source + "," + m.generatedLine + "," + m.generatedColumn + "," + m.originalLine + "," + m.originalColumn + "," + m.name;
      w.document.write(line + "\n");
    });
    w.document.write("</pre>");
    w.document.close();

    // Future enhancement: build a nice table
    //console.log(JSON.stringify(sourcesRecords));
    // $("#main-resultSourcesTable").dynatable({
        // dataset:{records:sourcesRecords},
        // features: {
          // paginate: false,
          // search: false,
          // recordCount: false,
          // perPageSelect: false
        // }
    // });
    // $("#main-resultSources").show();
  }

  function doSearch(line, column, map, script) {
    $("#main-searchError").hide();
    $("#main-resultSources").hide();
    $("#result-sourceMin").val("");
    $("#result-sourceColumn").val("");
    $("#result-sourceLine").val("");
    $("#result-sourceFile").val("");
    try {
      var consumer = new sourceMap.SourceMapConsumer(map);
      $("#result-sourceMin").val(consumer.file);
      var sourcesRecords = _.map(consumer.sources, function(x) {return {"source":x}});
      var found = consumer.originalPositionFor({line: parseInt(line), column: parseInt(column)});

      // TODO: build page with anchor to link and syntax highlighting
      //var node = sourceMap.SourceNode.fromStringWithSourceMap(script, consumer);

      if (_.isNull(found.source)) {
        $("#main-searchError").text("Position Not Found");
        $("#main-searchError").show();
      } else {
        $("#result-sourceColumn").val(found.column);
        $("#result-sourceLine").val(found.line);
        $("#result-sourceFile").val(found.source);
      }
    } catch (e) {
      console.log(e.message);
      $("#main-searchError").text(e.message);
      $("#main-searchError").show();
    }
  }

  return {
    exec : function() {
      console.log("app.exec");
      $(document).foundation();
      $(".button").on("click", function(e) { e.preventDefault(); });
      $("#menu-about").on("click", showAbout);
      // This is a little more unwieldy than I'd like
      $("#mainBtn-search")
        .on("click", function(e) {
          $("#mainInput-line").attr("required", true);
          $("#mainInput-column").attr("required", true);
          $("#mainInput-line").attr("pattern", "number");
          $("#mainInput-column").attr("required", "number");
          $('#mainForm').off('formvalid.zf.abide');
          $('#mainForm')
            .one('formvalid.zf.abide', function () {
              var line = $("#mainInput-line").val();
              var column  = $("#mainInput-column").val();
              var map = $("#mainInput-map").val();
              var script = $("#mainInput-script").val();
              doSearch(line, column, map, script);
            });
          $("#mainForm").foundation("validateForm");
        });
      $("#mainBtn-dump")
        .on("click", function(e) {
          $("#mainInput-line").removeAttr("required");
          $("#mainInput-column").removeAttr("required");
          $("#mainInput-line").removeAttr("pattern");
          $("#mainInput-column").removeAttr("pattern");
          $('#mainForm').off('formvalid.zf.abide');
          $('#mainForm')
            .one('formvalid.zf.abide', function () {
              var map = $("#mainInput-map").val();
              var script = $("#mainInput-script").val();
              doDump(map, script);
            });
          $("#mainForm").foundation("validateForm");
        });
    }
  };
});
