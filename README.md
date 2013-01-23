# grunt-ghost

Grunt task to run [CasperJS](http://casperjs.org/) tests

## Getting Started
Install this grunt plugin with: `npm install grunt-ghost`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-ghost');
```

## Documentation
####Basic use without options
Add the filepaths of the tests you want to run in the "src" array. Files will be run in alphabetic and numerical order, below I have used a file naming convention that makes running files in correct order easier.
```javascript
ghost: {
  dist: {
    src: ['tests/1_userLogin.js','tests/2_userLogout']
  }
}
####Dependencies

The only dependencies are [CasperJS](http://casperjs.org/) and
[Grunt](http://gruntjs.com/)
```
#### Using options
I have included all the test command options listed in the [CasperJS documentation]( http://casperjs.org/testing.html#casper-test-command) and some options of my own.
```javascript
ghost: {
  dist: {
    src: ['tests/userSuite/*'],

    // CasperJS test command options
    options: {
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
        // Prints command sent to CasperJS
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
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## License
Copyright (c) 2013 Colin Wren
Licensed under the MIT license.
