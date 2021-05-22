const YAML = require('yaml');
const fs = require('fs');

module.exports.getRssUrls = function(filename) {
    const file = fs.readFileSync(`${filename}`, 'utf8');
    return YAML.parse(file)['feeds'];
};

module.exports.saveFeeds = function(feeds, filename, sortBy, sortOrder) {
    const existing = fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : '[]';
    const merged = JSON.parse(existing).concat(feeds);

    if (sortBy) {
        merged.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            }

            return a[sortBy] < b[sortBy] ? 1 : -1;
        });
    }

    fs.writeFileSync(filename, JSON.stringify(merged));
};

