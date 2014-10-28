var compilePaths = {
  app: '../app',
  controllers: '../app/controllers',
  plupload: 'plupload/plupload.full.min',
  helpers: '../app/helpers',
  jquery: 'empty:',
  controllers: '../app/controllers',
  app: '../app'
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Sass
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
          //      banner: '<%= tag.banner %>',
          sourcemap: false,
          compass: true
        },
        files: [{
          expand: true,
          cwd: 'frontend/web/css',
          src: ['*.scss'],
          dest: 'frontend/web/css',
          ext: '.css'
        }]
      },
      prod: {
        options: {
          style: 'compressed',
          compass: true,
          sourcemap: false
        },
        files: [{
          expand: true,
          cwd: 'frontend/web/css',
          src: ['*.scss'],
          dest: 'frontend/web/css',
          ext: '.css'
        }]
      }
    },

    clean: {
      jsbuild: ['frontend/web/compiled/dist/all*.js'],
    },

    requirejs: {
      index: {
        options: {
          // almond: true,
          baseUrl: "frontend/web/js/lib",
          include: ['../app/build'],
          out: 'frontend/web/compiled/all.js',
          optimize: 'uglify2',
          wrap: {
            start: '/*! <%= pkg.name %> */\n'
          },
          paths: compilePaths,
          findNestedDependencies: true,
          insertRequire: ['app/main'],
          mainConfigFile: 'frontend/web/js/app.js',
          uglify2: {
            mangle: true,
          }
        },  
      }
    },

    hash: {
      options: {
        hashLength: 8,
        hashFunction: function(source, encoding) {
          return require('crypto').createHash('sha1').update(source, encoding).digest('hex');
        }
      },
      js: {
        src: 'frontend/web/compiled/all.js', //all your js that needs a hash appended to it
        dest: 'frontend/web/compiled/dist/' //where the new files will be created
      },
    },
    
    watch: {
      sdk: {
        files: ['frontend/web/js/lib/js-sdk/scss/**/*.scss'],
        tasks: ['sass:sdk'],
      },
      sass: {
        files: ['frontend/web/css/**/*.{scss,sass}'],
        tasks: ['sass:dev'],
      },
      livereload: {
        files: ['frontend/web/css/frontend.css'],
        options: {
          livereload: true,
        }
      }
    },

    uglify: {
      sdk: {
        files: [{
          expand: true,
          cwd: 'frontend/web/js/dist',
          src: ['*.js'],
          dest: 'frontend/web/js/dist',
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');


  grunt.loadNpmTasks('grunt-hash');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['sass']);
  grunt.registerTask('buildjs', ['clean:jsbuild', 'requirejs:index', 'hash']);



};