# rollup-plugin-pathmodify

Same like rollup-plugin-alias, but with regex


## Installation

```bash
npm install --save-dev rollup-plugin-pathmodify
```


## Usage

```js
var rollup = require('rollup').rollup;
var pathmodify = require('rollup-plugin-pathmodify');

rollup({
  entry: 'main.js',
  plugins: [
    pathmodify({
      aliases: [
        {
          id: 'Foundation', // Same as /^Foundation/
          resolveTo: __dirname + '/../../../Foundation/FrontEnd/code/Patterns'
        },
        {
          id: /^Feature\/([A-Za-z]+)\/([A-Za-z]+)\/([A-Za-z]+)\/([A-Za-z]+)/,
          resolveTo: __dirname + '/../../../Feature/$1/code/Patterns/$2/$3/$4'
        },
        {
          id: /^Project\/([A-Za-z]+)/,
          resolveTo: __dirname + '/../../../Project/$1/code/Patterns'
        }
      ]
    })
  ]
}).then(...)
```

## License

MIT
