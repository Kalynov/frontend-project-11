import { App } from "./app.js";
import i18next from "i18next";
import resources from './locales/index.js';



export function init () {
    
    const app = new App();
    app.init();

}