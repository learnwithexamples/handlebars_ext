# Handlebars extension
partials, helpers, and other utility functions to make it easy to use handlebars.

# Reference
  https://github.com/learnwithexamples/handlebars_ext

# Usage
```javascript
const path = require('path');
const { handlebars, compile, compileFile, parse, parseFile, readFormatJson, walkDir, procDir } = require('handlebars-ext');

handlebars.registerPartial('double', s => s + s); // register more partials/helpers as needed

const tpl0 = compile('compile template from string. double({{str}}) is {{> double str}}'); // compile template from string
const tpl1 = compileFile('node_modules/handlebars-ext/test/test1.hbs'); // compile template from file

console.log(parse({ str: "hello Handlebars!" }, tpl0)); // parse string to string
console.log(parse({ str: "hello Handlebars!" }, tpl0, null, s => s + s + s)); // parse string to string, use a postProc function to duplicate the result 3 times

parseFile('node_modules/handlebars-ext/test/test1.json', tpl1, 'test1.txt'); // parse file to file and string

console.log(readFormatJson('node_modules/handlebars-ext/test1.json')); // load and format json file

const myfunc = (f, copyright = 'learn with examples @ 2021') => { // each json file, parse and add copyright
  if (f.endsWith('.json')) {
    const pt = path.parse(f);
    parseFile(f, tpl1, path.join(pt.name + '.txt'), res => copyright + '\n\n' + res);  
  }
};

walkDir('node_modules/handlebars-ext/test', myfunc); // proc all files under test folder using myfunc

procDir('node_modules/handlebars-ext/test', myfunc); // proc all files directly under test folder using myfunc
```
# Extra partials
- handlebars.registerPartial('upper', s => s.toUpperCase());
- handlebars.registerPartial('lower', s => s.toLowerCase());
- handlebars.registerPartial('neg', s => -1 * s);
- handlebars.registerPartial('inv', s => 1 / s);

# Extra helpers
- handlebars.registerHelper('eq', function (a, b, options) { if (a == b) { return options.fn(this); } return options.inverse(this); });
- handlebars.registerHelper('gt', function (a, b, options) { if (a > b) { return options.fn(this); } return options.inverse(this); });
- handlebars.registerHelper('ge', function (a, b, options) { if (a >= b) { return options.fn(this); } return options.inverse(this); });
- handlebars.registerHelper('lt', function (a, b, options) { if (a < b) { return options.fn(this); } return options.inverse(this); });
- handlebars.registerHelper('le', function (a, b, options) { if (a <= b) { return options.fn(this); } return options.inverse(this); });
- handlebars.registerHelper('times', function(n, block) { let accum = ''; for(let i = 0; i < parseInt(n); ++i) { accum += block.fn(i); } return accum; });
- handlebars.registerHelper('includes', function (a, b, options) { return a.includes(b) ? options.fn(this) : options.inverse(this);});
- handlebars.registerHelper('sum', function (a, b) { return parseFloat(a) + parseFloat(b); });
- handlebars.registerHelper('sub', function (a, b) { return parseFloat(a) - parseFloat(b); });
- handlebars.registerHelper('at', function (arr, idx) { return arr[idx]; });

# Build template
- const compile = str => handlebars.compile(str);
- const compileFile = filein => handlebars.compile(fs.readFileSync(filein, 'utf8'));

# parse json
## parse to str [and optionally file]
const parse = (json, template, fileout = null, func = null);

## parse json file to str [and optionally file]
const parseFile = (filein, template, fileout = null, func = null);

# walk directory
const walkDir = (dir, callback, ...args);

# proc files directly under directory (no walk inside)
const procDir = (dir, callback, ...args);

# read and format json
const readFormatJson = (filename, numspace = 2);
