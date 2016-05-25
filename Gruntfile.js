module.exports = (function () {
  'use strict';
  return function (grunt) {
    require('load-grunt-tasks')(grunt);

    var config = {
      src: 'app'
    };

    grunt.initConfig({
      config: config,
      jshint: {
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
        },
        gruntfile: 'Gruntfile.js',
        src: ['<%= config.src %>/js/**/*.js', '!<%= config.src %>/js/templates.js']
      },
      copy: {
        libs: {
          files:[
          {
            cwd: 'bower_components/',
            nonull: true,
            flatten: true,
            expand: true,
            filter: 'isFile',
            src: ['/requirejs/require.js',
                  '/underscore/underscore-min.js',
                  '/zepto/zepto.min.js'],
            dest: 'www/js/lib/'
          }
          ]
        },
        pure: {
          files:[
          {
            cwd: 'bower_components/pure',
            expand: true,
            nonull: true,
            flatten: true,
            src: '**/*.css',
            dest: 'www/css/pure/'
          }
          ]
        }
      }
    });
  };
})();