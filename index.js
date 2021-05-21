const core = require('@actions/core');
const rssParser = require('rss-parser');
const provider = require('./provider');

(async () => {

    const source = core.getInput('source');
    const target = core.getInput('target');

    try {
        const urls = provider.getRssUrls(source);

        let feeds = [];
        for(const url of urls) {
            const feed = await (new rssParser()).parseURL(url);

            // todo: Add the date added?
            feeds.push(feed.items);
        }

        provider.saveFeeds(feeds, target);

    } catch (error) {
        core.setFailed(error.message);
    }

})();
