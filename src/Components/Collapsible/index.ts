import './Styles/collapsible.scss';
import {Collapsible} from "./TypeScript/Collapsible";

window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.collapsible');
    for (let i = 0; i < elements.length; i++) {
        new Collapsible(<HTMLElement>elements[i]);
    }
});
