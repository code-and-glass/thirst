module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //TODO: Add javascript files for linting (don't add react files)
    jshint: {
      files: ['Gruntfile.js', 'app.js', 'routes/**/*.js']
    },

    watch: {
      react: {
        files: ['client/main.js',
                'client/components.js',
                'client/dist/index.html',
                'client/dist/style.css'],
        tasks: ['build']
      },
      server: {
        files: ['Gruntfile.js', 'app.js', 'routes/**/*.js'],
        tasks: ['jshint']
      }
    },
    shell: {
      prodServer: {
        command: 'git push heroku staging:master',
            options: {
            stdout: true,
            stderr: true,
            failOnError: true
          }
        }
      },
    nodemon: {
      dev: {
        // script: 'server.js'
      }
    },
    cssmin: {

    },
    babel: {
      options: {
        sourceMap: true,
        stage: 0
      },
      dist: {
        files: {
          "client/babelified/components.js" : ["client/components.js"],
          "client/babelified/action-creators.js" : ["client/action-creators.js"],
          "client/babelified/create-store.js" : ["client/create-store.js"],
          "client/babelified/reducers.js" : ["client/reducers.js"],
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'client/dist/bundle.js' : ['client/babelified/*.js']
        }
      }
    }
  });

  //Tasks

  //Need to add testing framework
  grunt.registerTask('test', ['jshint'] );

  //add more build tasks (concat, uglify, cssmin)
  grunt.registerTask('build', ["babel", "browserify"]);

  grunt.registerTask('server-dev', function (target) {
     // Running nodejs in a different process and displaying output on the main console
     var nodemon = grunt.util.spawn({
          cmd: 'grunt',
          grunt: true,
          args: 'nodemon'
     });
     nodemon.stdout.pipe(process.stdout);
     nodemon.stderr.pipe(process.stderr);

     grunt.task.run([ 'watch:server' ]);
   });

  grunt.registerTask('upload', function(n) {
      if(grunt.option('prod')) {

        grunt.task.run([ 'shell:prodServer' ]);
            } else {
        grunt.task.run([ 'server-dev' ]);
      }
    });

  grunt.registerTask('default', ['test', 'build', 'upload']);

};


