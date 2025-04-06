import { Post } from './post.js';

export class Posts {
    constructor(state) {
        this.state = state;
        this.posts = [];
        this.render(state);

    }

    addPost(prps) {
        if (this.posts.some(post => post.url === prps.url)) {
            return;
        }
        const post = new Post(prps);
        this.posts.push(post);
        this.state.posts.push(post);
    }

    addPosts(posts) {
        const unicPosts = posts.filter(item => {
            return !this.posts.some(post => post.url === item.link);
        });
        unicPosts.forEach(post => {
            this.addPost(post);
        })
    }

    render(state) {
        if (state.posts.length === 0) {
            document.getElementById('posts').classList.add('d-none');
            return
        }
        document.getElementById('posts').classList.remove('d-none');
        const postContainer = document.getElementById('posts-list');
        this.posts.forEach(post => {
            post.render(postContainer);
        });
    }
}