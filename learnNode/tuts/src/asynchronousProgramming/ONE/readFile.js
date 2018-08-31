var fs = require('fs');

fs.readFile(__filename, {encoding: 'utf8'}, gotCalledBack);

function gotCalledBack(err, content) {
    if (err) {
        console.log(err);
    } else {
        console.log('this file content:\n\n%s', content);
    }
}