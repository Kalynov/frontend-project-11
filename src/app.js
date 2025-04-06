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
import { fetchRSS } from "./api.js";


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

    pollingPosts() {
        this.feeds.getAllPosts()
            .then((posts) => {
                this.posts.addPosts(posts);
            })
            .catch((err) => {
                console.log(err);
            });
        setTimeout(() => {
            this.pollingPosts();
        }
        , 5000);
     }


    onSubmit(e) {
        e.preventDefault();
        const value = this.form.inputEl.value;
        this.schema.validate({url: value})
            .then(({url}) => {
                this.clearErrors();
                if (this.wathedState.urls.includes(url)) {
                    throw new Error(getError(TYPES.dublicate)) 
                }
                this.addUrl(url)
                this.form.clearInput();
                return fetchRSS(url);
            })
            .then((data) => {
                const {contents, status} = JSON.parse(data);
                const {feed, posts} = parseXml(contents);
                this.wathedState.posts.push(...posts);
                this.feeds.addFeed({...feed, url: status.url});
                if (this.wathedState.feeds.length === 1) {
                    this.pollingPosts();
                }
            })
            .catch(err =>{
                this.wathedState.errors.input = err.message;
                console.log(err)
            })
        
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