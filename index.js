const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
handlebars.registerPartial('upper', s => s.toUpperCase());
handlebars.registerPartial('lower', s => s.toLowerCase());
handlebars.registerPartial('neg', s => -1 * s);
handlebars.registerPartial('inv', s => 1 / s);
handlebars.registerHelper('eq', function (a, b, options) { if (a == b) { return options.fn(this); } return options.inverse(this); });
handlebars.registerHelper('gt', function (a, b, options) { if (a > b) { return options.fn(this); } return options.inverse(this); });
handlebars.registerHelper('ge', function (a, b, options) { if (a >= b) { return options.fn(this); } return options.inverse(this); });
handlebars.registerHelper('lt', function (a, b, options) { if (a < b) { return options.fn(this); } return options.inverse(this); });
handlebars.registerHelper('le', function (a, b, options) { if (a <= b) { return options.fn(this); } return options.inverse(this); });
handlebars.registerHelper('times', function(n, block) { let accum = ''; for(let i = 0; i < parseInt(n); ++i) { accum += block.fn(i); } return accum; });
handlebars.registerHelper('includes', function (a, b, options) { return a.includes(b) ? options.fn(this) : options.inverse(this);});
handlebars.registerHelper('sum', function (a, b) { return parseFloat(a) + parseFloat(b); });
handlebars.registerHelper('sub', function (a, b) { return parseFloat(a) - parseFloat(b); });
handlebars.registerHelper('at', function (arr, idx) { return arr[idx]; });

// build template
const compile = str => handlebars.compile(str);
const compileFile = filein => handlebars.compile(fs.readFileSync(filein, 'utf8'));

// parse json to str [and optionally file]
const parse = (json, template, fileout = null, func = null) => {
  try {
    if (fileout) { console.log('parse to', fileout); }
    let res = template(json);
    if (func) { res = func(res); }
    if (fileout) { fs.writeFileSync(fileout, res); } else { return res; }
  } catch (e) { console.log(e); return null; }
};
// parse json file to str [and optionally file]
const parseFile = (filein, template, fileout = null, func = null) => {
  try {
    return parse(JSON.parse(fs.readFileSync(filein, 'utf8')), template, fileout, func);
  } catch (e) { console.log(e); return null; }
};

const walkDir = (dir, callback, ...args) => fs.readdirSync(dir).forEach(f => fs.statSync(path.join(dir, f)).isDirectory() ? walkDir(path.join(dir, f), callback) : callback(path.join(dir, f), ...args));
const procDir = (dir, callback, ...args) => fs.readdirSync(dir).forEach(f => fs.statSync(path.join(dir, f)).isFile() && callback(path.join(dir, f), ...args));

const readFormatJson = (filename, numspace = 2) => {
  try {
    fs.writeFileSync(filename, JSON.stringify(JSON.parse(fs.readFileSync(filename, 'utf8')), null, numspace), 'utf8');
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch (e) { console.log(e); return null; }
}
module.exports = { handlebars, compile, compileFile, parse, parseFile, readFormatJson, walkDir, procDir };
