'use strict'

module.exports = function (grunt) {

  grunt.initConfig({
    eslint: {
      all: {
        src: ['src/**/*.js', 'Gruntfile.js']
      }
    }
  })

  grunt.loadNpmTasks('grunt-eslint')

  grunt.registerTask('default', ['eslint'])
}
