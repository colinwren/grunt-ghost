module.exports = function(grunt) {

  grunt.initConfig({
    ghost: {
      dist: {
        filesSrc: ['test/googleTest.js']
      }
    },
    jshint: {
      all: ['tasks/ghost.js'],
      options: {
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        laxcomma: true,
        newcap: true,
        noarg: true,
        nonew: true,
        quotmark: 'single',
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        trailing: true,
        eqnull: true
       }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task
  grunt.registerTask('default', 'ghost');

};
