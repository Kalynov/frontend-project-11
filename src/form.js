export class Form {
    constructor(scheme, state) {
        this.formEl = document.getElementById('rss-form');
        this.inputEl = document.getElementById('url-input');
        this.submitButton = document.getElementById('submit-button');
        this.errorEl = document.getElementById('error-wrapper');

        this.render(state);
    }

    render(state) {
        this.errorEl.innerText = state.error?.input || ''
    }

    validate(scheme) {
        scheme.validate()
    }

    clearInput() {
        this.inputEl.value = '';
        this.inputEl.focus();
    }

}