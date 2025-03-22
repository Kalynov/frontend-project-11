import onChange from "on-change";
import { Form } from "./form.js";
import { defaultState } from "./state/state.js";
import { string, object } from 'yup';
import { TYPES } from "./constants.js";
import { getError } from "./error.js";
import { i18n } from "./i18n.js";


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
        
        this.form = new Form(this.schema, this.wathedState);
        this.form.formEl.addEventListener('submit', (e) => {
            const value = this.form.inputEl.value;
            e.preventDefault();
            this.schema.validate({url: value})
                .then(({url}) => {
                    this.clearErrors();
                    if (!this.state.feeds.includes(url)) {
                        this.addUrl(url)
                        this.form.clearInput();
                        return url
                    }
                    throw new Error(getError(TYPES.dublicate))
                })
                .then(url => fetch(url,{mode: 'no-cors'}))
                .then(response =>  response.json())
                .then(data => console.log(data))
                .catch((err) => {
                    this.wathedState.errors.input = err.message;
                    console.log(err)
                })
        })
    }

    addUrl(url) {
        this.wathedState.feeds.push(url);
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
        }
        
    }


}