const core = require('@actions/core');
const rssParser = require('rss-parser');
const provider = require('./provider');

(async () => {

    const source = core.getInput('source') ? core.getInput('source') : 'feeds.yaml';
    const target = core.getInput('target') ? core.getInput('target') : 'feeds.json';
    const sortBy = core.getInput('sortBy') ? core.getInput('sortBy') : 'isoDate';
    const sortOrder = core.getInput('sortOrder') ? core.getInput('sortOrder') : 'desc';

    try {
        const urls = provider.getRssUrls(source);

        let feeds = [];
        for(const url of urls) {
            const feed = await (new rssParser()).parseURL(url);

            // todo: Add the date added?
            feeds = feeds.concat(feed.items);
        }

        provider.saveFeeds(feeds, target, sortBy, sortOrder);

    } catch (error) {
        core.setFailed(error.message);
    }

})();
