import onChange from "on-change";
import { Form } from "./form.js";
import { defaultState } from "./state/state.js";
import { string, object } from 'yup';


export class App {
    constructor(){
        this.state = defaultState;
        this.schema = object({
            url: string().required().url(),
        });
    }


    init() {
        const render = this.renderer(this.state)
        this.wathedState = onChange(this.state, render);
        
        this.form = new Form(this.schema, this.wathedState);
        this.form.formEl.addEventListener('submit', (e) => {
            const value = this.form.inputEl.value;
            e.preventDefault();
            this.schema.validate({url: value})
                .then(() => {
                    
                })
                .catch(() => {

                })
        })
    }


    renderer(state) {
        return (path, value) => {
            this.form.render(state);
        }
        
    }


}