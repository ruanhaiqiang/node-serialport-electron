'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      test: {
        options: { reporter: 'spec' },
        src: ['test/*.js']
      }
    },
    eslint: {
      src: [
        '*.js',
        'lib/**/*.js',
        'test/**/*.js',
        'bin/**/*.js',
        'examples/**/*.js'
      ]
    },
    exec:{
      command:'<%= config.command%>'
    },
    copy:{
      copy : {
                options:{
                    mode : true
                },
                files: [
                    {
                        expand: true,
                        cwd : 'build/Release', 
                        src: ['*.node'], 
                        dest: '<%= config.target%>'
                    }
                ],
            }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['lint', 'test']);

  grunt.registerTask('buildia32',"build serialport ia32", function(){
    var config = {};
    config.command = "npm run buildia32";
    config.target= "Release/ia32";
    grunt.config("config", config);
    grunt.task.run(["exec", "copy"]);
  })
  grunt.registerTask('buildx64',"build serialport x64", function(){
    var config = {};
    config.command = "npm run buildx64";
    config.target = "Release/x64"
    grunt.config("config", config);
    grunt.task.run(["exec", "copy"]);
  })
};
