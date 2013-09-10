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
    var options = this.options(),
        // Tells Grunt that this asynchronous and that it is finished when
        // "done()" is called
        done = this.async(),
        // Get filepaths from 'src' and sorts alphabetically
        filepaths = [].concat(
          grunt.file.expand(this.data.filesSrc)
        ).sort(),
        // Use the default test runner unless the user specified a custom one
        runner = options.runner || 'test',
        // Create array that will contain all the parameters for CasperJS
        command = [runner].concat(filepaths);

    // Get CasperJS test options and add them to command array
    if (options.xunit) command.push('--xunit=' + options.xunit);

    if (options.direct) command.push('--direct');

    if (options.includes) command.push('--includes=' + grunt.file.expand(options.includes).join());

    if (options.logLevel) command.push('--log-level=' + options.logLevel);

    if (options.pre) command.push('--pre=' + options.pre.join());

    if (options.post) command.push('--post=' + options.post.join());

    if (options.failFast) command.push('--fail-fast');

    if (options.args) {
      var args = options.args;
      for (var a in args) {
        command.push('--' + a + '=' + args[a]);
      }
    }

    // Function to wrap grunt log output at 80 characters
    var lastSpace;
    function wrap(str) {
      // Will run until there are no spaces in the string (All arguments have
      // spaces after them)
      if (str.indexOf(' ') === -1) {
        return;
      }
      // Finds last space in the first 80 characters of the string
      lastSpace = str.substr(0, 80).lastIndexOf(' ');
      // Writes string until the last space into grunt log
      grunt.log.write(str.substr(0, lastSpace) + '\n');
      // Calls itself with the rest of the string that was no logged
      wrap(str.substr(lastSpace + 1));
    }

    // Additional Options
    // Prints command sent to CasperJS
    if (options.printCommand) {
      wrap('\u001b[1m\u001b[4mCommand:\u001b[0m casperjs ' +
           command.join(' '));
    }

    // Prints filepaths sent to CasperJS in alternating colors
    if (options.printFilePaths) {
      var files = '',
          colors = [
            '\u001b[34m', // Blue
            '\u001b[33m', // Yellow
            '\u001b[36m', // Cyan
            '\u001b[35m', // Magenta
            '\u001b[32m'  // Green
          ];
      // Give file paths alternating colors and add them to 'files' string
      for (var i = 0; i < filepaths.length; i++) {
        files += colors[i % colors.length] + filepaths[i] + ' ';
      }
      // Send to wrap function to be printed
      wrap('\u001b[1m\u001b[4mTesting:\u001b[0m\u001b[1m ' + files + '\n');
    }

    grunt.util.spawn({
      cmd: 'casperjs',
      args: command,
      opts: {
        stdio: 'inherit'
      }
    }, function (error, result) {
      if (error) {
        grunt.fail.fatal(result.stdout);
      }
      grunt.log.writeln(result.stdout);
      done();
    });
  });
};
