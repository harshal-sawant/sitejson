module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        jsonlint: {
            files: {
                src: [
                    'package.json',
                    'config/.jscsrc',
                    'config/.jshintrc'
                ]
            }
        },
        jshint: {
            all: ["lib/**/*.js", "bin/**/*.js"],
            options: {
                ignores: ["test/libs/**/*.js"],
                jshintrc: "config/.jshintrc"
            }
        },
        jscs: {
            src: ["lib/**/*.js", "bin/**/*.js"],
            options: {
                config: "config/.jscsrc"
            }
        }
    });

    /**
     * Load tasks
     */
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs-checker");
    grunt.loadNpmTasks('grunt-jsonlint');

    /**
     * Define tasks : Tasks for development eco - system.
     */
    grunt.registerTask("default", [
        "jsonlint",
        "jshint",
        "jscs"
    ]);

    grunt.registerTask("dev", ["default"]); // Alias for `default`.
};