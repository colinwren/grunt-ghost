# grunt-ghost

[Grunt](http://gruntjs.com/) task to run [CasperJS](http://casperjs.org/) tests.

## Getting Started
If you haven't used grunt before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a gruntfile as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:
```shell
npm install grunt-ghost --save-dev
```

Then add this line to your project's `Gruntfile.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-ghost');
```

## Documentation
####Basic use without options
Specify the files/directories of the tests you want to run in the `filesSrc` array. Files will be run in alphabetic and numerical order.
```javascript
ghost: {
  dist: {
    filesSrc: ['tests/1_userLogin.js','tests/2_userLogout']
  }
}
```
####Dependencies

The only dependencies are [CasperJS](http://casperjs.org/) and
[Grunt](http://gruntjs.com/)

#### Using options
I have included all the test command options listed in the [CasperJS documentation]( http://casperjs.org/testing.html#casper-test-command) and some options of my own.
```javascript
ghost: {
  dist: {
    filesSrc: ['tests/userSuite/*'],

    // CasperJS test command options
    options: {
      // Allows you to pass variables to casper that can be accesed in files,
      // for example, if you used the following args object then
      // casper.cli.get('username') would return 'colin'
      args: {
        username: 'colin'
      },
      // Exports results of test to a xUnit XML file
      xunit: 'xunit/userSuite.xml',
      // Outputs additional log messages
      direct: true,
      // Sets logging level, check out http://casperjs.org/logging.html
      logLevel: 'info',
      // Specifies files to be included for each test file
      includes: [
        'tests/config.js',
        'lib/jquery.min.js'
      ],
      // Adds tests from specified files before running the test suite
      pre: ['tests/pre-test.js'],
      // Adds tests from specified files after running the test suite
      post: ['tests/post-test.js'],
      // Terminates test suite upon failure of first test
      failFast: true,
      // grunt-ghost specific options
      // Prints the command given to CasperJS
      printCommand: true,
      // Prints list of filepaths
      printFilePaths: true
    }
  }
}
```
## Attribution

Thanks to the [CasperJS](http://casperjs.org) authors for making a great tool, the descriptions of the test command options are modifications from their [documentation]( http://casperjs.org/testing.html#casper-test-command). I also want to thank the authors of [grunt-casperjs](https://github.com/ronaldlokers/grunt-casperjs) and [grunt-recess](https://github.com/sindresorhus/grunt-recess) because I learned a lot from looking at their source.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using grunt.

## License
Copyright (c) 2013 Colin Wren
Licensed under the MIT license. 

## Release History

 * 2013-04-14   v1.0.11   Enabled streaming output
