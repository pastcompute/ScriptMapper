module.exports = (function () {
  'use strict';
  return function (grunt) {
    require('load-grunt-tasks')(grunt);
    var config = {
      src: 'app'
    };
    grunt.loadNpmTasks('grunt-build-gh-pages');
    grunt.initConfig({
      config: config,
      buildGhPages: {
        options: {
        },
        gh_pages: {
          pull:false
        },
      },
      jshint: {
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
        },
        gruntfile: 'Gruntfile.js',
        src: ['<%= config.src %>/js/*.js', '!<%= config.src %>/js/templates.js']
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
                  '/source-map/dist/source-map.min.js',
                  '/dynatable/jquery.dynatable.js'
                  ],
            dest: 'www/js/vendor/'
          },
          {
            cwd: 'bower_components/',
            nonull: true,
            flatten: true,
            expand: true,
            filter: 'isFile',
            src: ['/dynatable/jquery.dynatable.css'
                  ],
            dest: 'www/css'
          }
          ]
        },
        foundation: {
          files:[
          {
            cwd: 'bower_components/',
            expand: true,
            nonull: true,
            flatten: true,
            filter: 'isFile',
            src: ['/foundation-sites/dist/foundation.min.js',
                  '/foundation-sites/dist/plugins/foundation.abide.js',
                  '/jquery/dist/jquery.min.js',
                  '/jquery-validation/dist/jquery.validate.min.js',
                  '/what-input/what-input.min.js'
                  ],
            dest: 'www/js/vendor/'
          },
          {
            cwd: 'bower_components/',
            expand: true,
            nonull: true,
            flatten: true,
            filter: 'isFile',
            src: '/foundation-sites/dist/foundation.min.css',
            dest: 'www/css/'
          }
          ]
        }
      }
    });
    grunt.registerTask("publish", [
          'copy',
          'buildGhPages:gh_pages'
      ]); 
  };
})();