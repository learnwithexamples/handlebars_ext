# Handlebars extension
partials, helpers, and other utility functions to make it easy to use handlebars.

# Reference
  https://github.com/learnwithexamples/handlebars_ext

# Usage
```javascript
const { handlebars, compile, compileFile, parse, parseFile, readFormatJson, walkDir } = require('./index');

handlebars.registerPartial('double', s => s + s); // register more partials/helpers as needed

const tpl1 = compile('compile template from string. double({{str}}) is {{> double str}}'); // compile template from string
const tpl2 = compileFile('test1.hbs'); // compile template from file

console.log(parse({ str: "abCdEf" }, tpl1)); // parse string to string
parseFile('test1.json', tpl2, 'output.txt'); // parse file to file and string
console.log(readFormatJson('test1.json')); // load and format json file

const sayHi = (f, str1 = "a", str2 = "b", str3 = "c") => { if (f.endsWith('json')) { console.log(f, str1, str2, str3); } } // your self-defined function
walkDir('.', sayHi, "xx", "yy"); // apply function to any file in a directory
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

# read and format json
const readFormatJson = (filename, numspace = 2);
