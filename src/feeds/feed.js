import { getUUID } from '../utils.js';
export class Feed {
  constructor({ title, description, url }) {
    this.url = url;
    this.title = title;
    this.description = description;
    this.uuid = getUUID();
  }


  render(container) {
    const feedEl = document.createElement('li');
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