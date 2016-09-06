# Kidoju-Help

> "A help system based on Mozilla pdf.js for Kidoju

## Background

This project is based on [Mozilla PDF.js](https://mozilla.github.io/pdf.js/)

## Upgrade

This project is based on:

1. [dowmloading PDF.js](from https://mozilla.github.io/pdf.js/getting_started/#download)
2. Copying the content to ```build/``` and ```web/``` directories
3. Generating the ```dist``` and ```src``` directories by running ```grunt``` 

The only files that is not generated is ```src/main.js```:

```js
require('../web/viewer.css');
require('../web/compatibility.js'); // require('pdfjs-dist/web/compatibility.js');
require('../web/l10n.js');
window.pdfjsDistBuildPdf = require('../build/pdf.js'); // require('pdfjs-dist/web/pdf.js');
// require('../web/debugger.js');
require('./viewer.js');
```

## Improvements

[pdfjs-dist](https://github.com/mozilla/pdfjs-dist) is generally more up-to-date than [PDF.js](https://github.com/mozilla/pdf.js).

Therefore, it would be nice to use in ```src/main.js```

```js
...
require('pdfjs-dist/web/compatibility.js');
...
window.pdfjsDistBuildPdf = require('pdfjs-dist/web/pdf.js');
...
```

Unfortunately all required files are not maintained within ```src/main.js```.

