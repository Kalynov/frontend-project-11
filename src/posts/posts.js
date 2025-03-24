import { Post } from './post.js';

export class Posts {
    constructor(state) {
        this.state = state;
        this.render(state);
    }

    addPost(post) {
        this.state.posts.push(post);
    }

    render(state) {
        if (state.posts.length === 0) {
            document.getElementById('posts').classList.add('d-none');
            return
        }
        document.getElementById('posts').classList.remove('d-none');
        const postContainer = document.getElementById('posts-list');
        console.log(state, "RENDER POSTS");
        this.state.posts.forEach(item => {
            const post = new Post(item);
            post.render(postContainer);
        });
    }
}