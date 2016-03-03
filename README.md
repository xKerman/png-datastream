# png-datastream

A library that provides parser / serializer for [PNG datastream](https://www.w3.org/TR/PNG/#4Concepts.Format) that can be able to use in browser environment.

[![Build Status](https://travis-ci.org/xKerman/png-datastream.svg?branch=master)](https://travis-ci.org/xKerman/png-datastream)
[![npm version](https://badge.fury.io/js/png-datastream.svg)](https://badge.fury.io/js/png-datastream)
[![Document Coverage](https://doc.esdoc.org/github.com/xKerman/png-datastream/badge.svg)](https://doc.esdoc.org/github.com/xKerman/png-datastream/)


## Installation

`npm install png-datastream`


## Example

```js
import Datastream from 'png-datastream';

// say you got `buf`, PNG ArrayBuffer from somewhere...
// parse ArrayBuffer as PNG datastream
const datastream = Datastream.fromArrayBuffer(buf);

datastream.signature; // PNG signature
datastream.chunks.forEach(chunk => { /* operation for each chunk */ });

const result = datastream.toArrayBuffer(); // serialize PNG datastream as ArrayBuffer
```


## API Document

https://doc.esdoc.org/github.com/xKerman/png-datastream/


## Development

```
# test
npm test
# check coding style
npm run eslint
# generate document
npm run esdoc
```


## License

[MIT License](http://xkerman.mit-license.org/2016)
