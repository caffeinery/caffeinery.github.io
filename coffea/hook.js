var fs = require('fs');
var githubhook = require('githubhook');
var github = githubhook({port: 8989, secret: fs.readFile(process.env['HOME'] + '/.hook')});
var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
    if (error !== null) {
        console.log(stderr);
        console.log(error);
    } else {
        console.log(stdout);
    }
};

github.listen();

github.on('*', function (event, repo, ref, data) {
    if (repo === 'caffeinery.github.io') {
        console.log(data);
        exec('git pull origin master', puts);
        exec('make html', puts);
        exec('git add -A', puts);
        exec('git commit -m \'Rebuild documentation.\'', puts);
        exec('git push origin master', puts);
    };
});

