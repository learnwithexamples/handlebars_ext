const path = require('path');
const { handlebars, compile, compileFile, parse, parseFile, readFormatJson, walkDir, procDir } = require('./index');

handlebars.registerPartial('double', s => s + s); // register more partials/helpers as needed

const tpl0 = compile('compile template from string. double({{str}}) is {{> double str}}'); // compile template from string
const tpl1 = compileFile('./test/test1.hbs'); // compile template from file

console.log(parse({ str: "hello Handlebars!" }, tpl0)); // parse string to string
console.log(parse({ str: "hello Handlebars!" }, tpl0, null, s => s + s + s)); // parse string to string, use a postProc function to duplicate the result 3 times

parseFile('./test/test1.json', tpl1, './test/test1.txt'); // parse file to file and string

console.log(readFormatJson('./test/test1.json')); // load and format json file

const myfunc = (f, copyright = 'learn with examples @ 2021') => { // each json file, parse and add copyright
  if (f.endsWith('.json')) {
    const pt = path.parse(f);
    parseFile(f, tpl1, path.join(pt.dir, pt.name + '.txt'), res => copyright + '\n\n' + res);  
  }
};

walkDir('./test', myfunc); // proc all files under test folder using myfunc

procDir('./test', myfunc); // proc all files directly under test folder using myfunc
