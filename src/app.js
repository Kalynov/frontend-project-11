import onChange from "on-change";
import { Form } from "./form.js";
import { defaultState } from "./state/state.js";
import { string, object } from 'yup';
import { TYPES } from "./constants.js";
import { getError } from "./error.js";
import { i18n } from "./i18n.js";
import { Posts } from "./posts/posts.js";
import { Feeds } from "./feeds/feeds.js";
import { parseXml } from "./utils.js";

async function fetchRSS(url) {
    const response = await fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`);
    if (!response.ok) {
        throw new Error(getError(TYPES.responceError));
    }
    const text = await response.text();
    
    return text
}


export class App {
    constructor(){
        this.state = defaultState;
        this.schema = object({
            url: string().required().url(),
        });
        this.render();
    }
    


    async init() {
        const render = this.renderer(this.state)
        this.wathedState = onChange(this.state, render);
        const handler = this.onSubmit.bind(this);
        this.form = new Form(this.schema, this.wathedState);
        this.posts = new Posts(this.wathedState);
        this.feeds = new Feeds(this.wathedState);
        this.form.formEl.addEventListener('submit', handler)
    }


    async onSubmit(e) {
        e.preventDefault();
        try {
            const value = this.form.inputEl.value;
            const {url} = await this.schema.validate({url: value})
            this.clearErrors();
            if (this.state.urls.includes(url)) {
                throw new Error(getError(TYPES.dublicate))  
            }
            this.addUrl(url)
            this.form.clearInput();
            const data = await fetchRSS(url);
            const content = JSON.parse(data).contents;
            const {feed, posts} = parseXml(content);
            this.wathedState.posts.push(...posts);
            this.wathedState.feeds.push(feed);
        } catch(err)  {
            this.wathedState.errors.input = err.message;
            console.log(err)
        }
        
    }


    addUrl(url) {
        this.wathedState.urls.push(url);
    }

    clearErrors() {
        this.wathedState.errors = {};
    }

    render(state) {
        document.getElementById('title').innerText = i18n.t('title');
        document.getElementById('subtitle').innerText = i18n.t('description');
    }


    renderer(state) {
        return (path, value) => {

            this.render(state);
            this.form.render(state);
            this.feeds.render(state);
            this.posts.render(state);
        }
        
    }


}