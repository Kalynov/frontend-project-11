import { getUUID } from '../utils.js';
export class Post {
    constructor({ link, title, description }) {
        this.url = link;
        this.title = title;
        this.description = description;
        this.uuid = getUUID();
    }

    render(container) {
        if (container.querySelector(`#uid-${this.uuid}`)) {
            return;
          }
        const post = document.createElement('li');
        post.id = `uid-${this.uuid}`;
        post.classList.add('post');
        const href = document.createElement('a');
        href.classList.add('post-title');
        href.href = this.url;
        href.innerText = this.title;
        post.appendChild(href);
        container.appendChild(post);
    }
}
