var gith = require('gith').create(8989);

gith({repo: 'caffeinery/caffeinery.github.io'}).on('all', function (payload) {
    console.log(payload);
})
