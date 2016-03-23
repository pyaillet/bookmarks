/*eslint-env node */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-typings');
  // Add the grunt-mocha-test tasks. 
  grunt.loadNpmTasks('grunt-mocha-test');
  
  grunt.initConfig({
    typings: {
      install: {}
    },
	ts: {
	  default : {
        src: [
        	"src/main/ts/**/*.ts", 
        	"src/test/ts/**/*.ts", 
        	"!node_modules/**/*.ts", 
        	"!typings/**/*.d.ts"],
        outDir: "src/main/js/",
        options: {
        	moduleResolution: "node"
    	}
      }
	},
    // Configure a mochaTest task 
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file 
          quiet: false, // Optionally suppress output to standard out (defaults to false) 
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
        },
        src: ['src/test/**/*.js']
      }
	} 
  });
 
  grunt.registerTask('server', ['typings', 'ts', 'mochaTest']);
 
};