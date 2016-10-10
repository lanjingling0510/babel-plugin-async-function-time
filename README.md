# babel-plugin-async-function-time
[![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

A babel plugin of statistical Asynchronous Function Time, containing promise function and asynchronous callback function.

- [中文](./README_CN.md)

## Usage

### Install

Using [npm](https://www.npmjs.com/):

	$ npm install babel-plugin-async-function-time -D

configure in .babelrc(should transfer to json format) or any babel queries:


### Usage Example

configure
```javascript
"plugins": [
    [
        "function-time", {
			// A function that defines the execution time of the logging function, the execution time of the asynchronous function, and the arguments of the original function as arguments to the function
            "report": "(durning, props) => console.log('count:%sms', durning)",
			// The array of promise function names to be logged
            "promise": ["fnNameA"],
			// An array of asynchronous callback function names to be logged
            "async": ["fnNameB"]
        }
    ]
]

```

code for promise function
```
var fnNameA = function (str) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(str);
        }, 200);
    })
};

fnNameA();

// or

function fnNameA (str) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(str);
        }, 200);
    })
};

fnNameA();

// or

var obj = {
    fnNameA(str) {
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(str);
            }, 200);
        })
    }
};

obj.fnNameA();

// count:204ms

```

code for asynchronous callback function
```
var fnNameB = function (fb) {
    setTimeout(function() {
        fb();
    }, 200);
};

fnNameB();

// or

function fnNameB (fb) {
    setTimeout(function() {
        fb();
    }, 200);
};

fnNameB();

// or

var obj = {
    fnNameB(fb) {
        setTimeout(function() {
            fb();
        }, 200);
    }
};

obj.fnNameB();

// count:204ms

```


## Changelog
* [Changelog](CHANGELOG.md)

## How to Contribute

Anyone and everyone is welcome to contribute to this project. The best way to
start is by checking our [open issues](https://github.com/lanjingling0510/babel-plugin-async-function-time/issues),
[submit a new issues](https://github.com/lanjingling0510/babel-plugin-async-function-time/issues/new?labels=bug) or
[feature request](https://github.com/lanjingling0510/babel-plugin-async-function-time/issues/new?labels=enhancement),
participate in discussions, upvote or downvote the issues you like or dislike.



[npm-badge]: https://img.shields.io/npm/v/babel-plugin-async-function-time.svg?style=flat-square
[npm]: https://www.npmjs.com/package/babel-plugin-async-function-time
[build-badge]: https://img.shields.io/travis/lanjingling0510/babel-plugin-async-function-time/master.svg?style=flat-square
[build]: https://travis-ci.org/lanjingling0510/babel-plugin-async-function-time
