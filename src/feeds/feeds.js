import  { Feed } from './feed.js';

export class Feeds {
    constructor(state) {
        this.state = state;
        this.render(state);
    }

    addFeed(feed) {
        this.state.feeds.push(feed);
    }

    addUrl(url) {
        this.state.urls.push(url);
    }

    render(state) {
        if (state.feeds.length === 0) {
            document.getElementById('feeds').classList.add('d-none');
            return
        }
        document.getElementById('feeds').classList.remove('d-none');
        const feedContainer = document.getElementById('feeds-list');
        console.log(state, "RENDER FEEDS");
        this.state.feeds.forEach(item => {
            const feed = new Feed(item);
            feed.render(feedContainer);
        });
    }
}