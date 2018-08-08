var fs = require('fs');

fs.readFile('./dummy.txt', function(err, results) {
	if (err) return handleError(err);
	console.log('File contents:', results);
});
