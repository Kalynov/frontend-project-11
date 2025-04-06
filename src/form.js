import { i18n } from './i18n.js';

export class Form {
    constructor(schema, state) {
        this.formEl = document.getElementById('rss-form');
        this.inputEl = document.getElementById('url-input');
        this.submitButton = document.getElementById('submit-button');
        this.errorEl = document.getElementById('error-wrapper');
        this.inputPlaceholderEl = document.getElementById('input-placeholder');

        this.render(state);
    }

    render(state) {
        this.errorEl.innerText = state.errors?.input || ''
        this.submitButton.innerText = i18n.t('form.submit');
        this.inputEl.placeholder = i18n.t('form.placeholder');
        this.inputPlaceholderEl.innerText = i18n.t('form.placeholder');
        //this.errorEl.innerHTML = 
    }

    validate(scheme) {
        scheme.validate()
    }

    clearInput() {
        this.inputEl.value = '';
        this.inputEl.focus();
    }

}