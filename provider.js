const YAML = require('yaml');
const fs = require('fs');
const github = require('@actions/github');

module.exports.getRssUrls = function(filename) {
    const file = fs.readFileSync(`./${filename}`, 'utf8');
    return YAML.parse(file)['feeds'];
};

module.exports.saveFeeds = function(feeds, filename) {
    const existing = fs.readFileSync(filename, 'utf8');
    const merged =JSON.parse(existing).concat(feeds);

    fs.writeFileSync(filename, JSON.stringify(merged));
};
