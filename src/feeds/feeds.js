import  { Feed } from './feed.js';

export class Feeds {
    constructor(state) {
        this.state = state;
        this.render(state);
        this.feeds = [];
    }

    addFeed(prps) {
        if (this.feeds.some(feed => feed.url === prps.url)) {
            return;
        }
        const feed = new Feed(prps);
        this.feeds.push(feed);
        this.state.feeds.push(feed);
    }

    addUrl(url) {
        this.state.urls.push(url);
    }

    getAllPosts() {
        return Promise.all(this.feeds.map(feed => feed.getPosts())).then((posts) => posts.flat());
    }


    render(state) {
        if (state.feeds.length === 0) {
            document.getElementById('feeds').classList.add('d-none');
            return
        }
        document.getElementById('feeds').classList.remove('d-none');
        const feedContainer = document.getElementById('feeds-list');
        this.feeds.forEach(item => {
            item.render(feedContainer);
        });
    }
}