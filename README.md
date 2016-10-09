# babel-plugin-async-function-time
[![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

A babel plugin of statistical Asynchronous Function Time, containing promise function and higher order function.

## Usage

### Install

Using [npm](https://www.npmjs.com/):

	$ npm install babel-plugin-async-function-time -D

configure in .babelrc(should transfer to json format) or any babel queries:


### Usage Example

configure
```
"plugins": [
    [
        "function-time", {
            "report": "(durning, props) => console.log('count:%sms', durning)",
            "promise": ["fnNameA"],
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

// or

function fnNameA (str) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(str);
        }, 200);
    })
};

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

// count:204ms

```

code for higher order function
```
var fnNameB = function (fb) {
    setTimeout(function() {
        fb();
    }, 200);
};


function fnNameB (fb) {
    setTimeout(function() {
        fb();
    }, 200);
};

var obj = {
    fnNameA(fb) {
        setTimeout(function() {
            fb();
        }, 200);
    }
};

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
