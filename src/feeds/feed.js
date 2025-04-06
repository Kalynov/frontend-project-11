import { getUUID, parseXml } from '../utils.js';
import { fetchRSS } from '../api.js';
export class Feed {
  constructor({ url, title, description }) {
    this.url = url;
    this.title = title;
    this.description = description;
    this.uuid = getUUID();
    this.timer = null;
  }

  getPosts () {
    return fetchRSS(this.url)
      .then((data) => {
        const content = JSON.parse(data).contents;
        const {posts} = parseXml(content);
        return posts
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render(container) {
    if (container.querySelector(`#uid-${this.uuid}`)) {
      return;
    }
    const feedEl = document.createElement('li');
    feedEl.id = `uid-${this.uuid}`;
    feedEl.classList.add('card', 'border-0');
    feedEl.innerHTML = `
        <div class="card-body">
            <h3 class="card-title h6 m-0
            ">${this.title}</h2>
            <p class="card-text m-0 small text-black-50">${this.description}</p>
        </div>
    `;
    container.appendChild(feedEl);  
  }

}