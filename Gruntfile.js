module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'app.js', 'routes/**/*.js', 'public/**/*.js']
    },

    watch: {
      scripts: {
        files: [],
        tasks: []
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

    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  //Need to add testing framework
  grunt.registerTask('test', ['jshint'] );

  //add more build tasks (concat, uglify, cssmin)
  grunt.registerTask('build', []);

  grunt.registerTask('server-dev', function (target) {
     // Running nodejs in a different process and displaying output on the main console
     var nodemon = grunt.util.spawn({
          cmd: 'grunt',
          grunt: true,
          args: 'nodemon'
     });
     nodemon.stdout.pipe(process.stdout);
     nodemon.stderr.pipe(process.stderr);
 
     grunt.task.run([ 'watch' ]);
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


