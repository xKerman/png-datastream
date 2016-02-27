# png-datastream

A library that provides parser / serializer for [PNG datastream](https://www.w3.org/TR/PNG/#4Concepts.Format) that can be able to use in browser environment.


## Installation

`npm install png-datastream`


## Example

```js
// say you got `buf`, PNG ArrayBuffer from somewhere...
// parse ArrayBuffer as PNG datastream
const datastream = Datastream.fromBuffer(buf);

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
# generage document
npm run esdoc
```


## License

[MIT License](http://xkerman.mit-license.org/2016)
