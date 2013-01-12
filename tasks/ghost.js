/*
 * grunt-ghost
 * https://github.com/colinwren/grunt-ghost
 *
 * Copyright (c) 2013 Colin Wren
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  'use strict';
  // Create MultiTask 'ghost'
  grunt.registerMultiTask('ghost', 'Runs CasperJS Tests.', function () {
    // Get options object
    var options = require('grunt-contrib-lib').init(grunt).options(this),
        // Tells Grunt that this asynchronous and that it is finshed when
        // "done()" is called
        done = this.async(),
        // Get spawn function for the CasperJS process creation
        spawn = require('child_process').spawn,
        // Create array that will contain all the parameters for CasperJS
        command = ['test'];

    // Get CasperJS test options and add them to command array
    if (options.xunit) {
      command.push('--xunit=' + options.xunit);
    }
    if (options.direct) {
      command.push('--direct');
    }
    if (options.includes) {
      command.push('--includes=' + options.includes.join());
    }
    if (options.logLevel) {
      command.push('--log-level=' + options.logLevel);
    }
    if (options.pre) {
      command.push('--pre=' + options.pre.join());
    }
    if (options.post) {
      command.push('--post=' + options.post.join());
    }
    if (options.failFast) {
      command.push('--fail-fast');
    }

    // Get filepaths from 'src' and sorts alphabetically
    var filepaths = grunt.file.expandFiles(this.file.src).sort();

    // Get filepaths from 'src' array and add them to CasperJS parameter array
    command = command.concat(grunt.file.expandFiles(this.file.src).sort());
 
    // Funciton to wrap grunt log output at 80 characters
    var lastSpace;
    function wrap(str) {
      // Will run until there are no spaces in the string (All arguments have
      // spaces after them)
      if (str.indexOf(' ') === -1) {
        return;
      }
      // Finds last space in string before 80 characters
      lastSpace = str.substr(0, 80).lastIndexOf(' ');
      // Writes string until the last space into grunt log
      grunt.log.write(str.substr(0, lastSpace) + '\n');
      // Calls itself with the rest of the string that was no logged
      wrap(str.substr(lastSpace + 1));
    }

    // Aditional Options
    // Prints command sent to CasperJS
    if (options.printCommand) {
      wrap('\u001b[1m\u001b[4mCommand:\u001b[0m casperjs ' +
          command.join(' ') + ' \n');
    }
    // Prints filepaths sent to CasperJS in alternating colors
    if (!options.hideFilePaths) {
      var files = '',
          colors = [
            '\u001b[34m', // Blue
            '\u001b[33m', // Yellow
            '\u001b[36m', // Cyan
            '\u001b[35m', // Magenta
            '\u001b[32m'  // Green
          ];

      // Give file paths alternatiing colors and add them to 'files' string
      for (var i = 0; i < filepaths.length; i++) {
        files += colors[i % colors.length] + filepaths[i] + ' ';
      }
      // Send to wrap function to be printed
      wrap('\u001b[1m\u001b[4mTesting:\u001b[0m\u001b[1m ' + files + '\n');
    }

    // Create CasperJS process
    var cspr = spawn('casperjs', command);
    cspr.stdout.setEncoding('utf8');
    // On receiveing output from CasperJS, print it line by line
    cspr.stdout.on('data', function (data) {
      var lines = data.toString().split(/(\e?\n)/g);
      for (var j = 0; j < lines.length; j++) {
        grunt.log.write(lines[j]);
      }
    });

    // Captures errors from casper and prints them
    cspr.stderr.on('data', function (data) {
      grunt.log.error(data);
      done();
    });

    // On completion print message
    cspr.on('exit', function () {
      done();
    });
  });
};
