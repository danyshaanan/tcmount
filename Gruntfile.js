'use strict'

module.exports = function(grunt) {

  grunt.initConfig({
    eslint: {
      target: ['**/*.js', '!node_modules/**/*']
    }
  })

  grunt.loadNpmTasks('grunt-eslint')

  grunt.registerTask('default', ['eslint'])
}
