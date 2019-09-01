export class Collapsible {
    private readonly mainElement: HTMLElement;
    private readonly title: HTMLElement;
    private readonly contentWrapper: HTMLElement;
    private readonly content: HTMLElement;
    private isOpen: boolean = false;
    private readonly openClass = 'collapsible--open';
    private readonly closeClass = 'collapsible--close';

    constructor(collapsible: HTMLElement) {
        this.mainElement = collapsible;
        this.title = collapsible.querySelector('.collapsible__title');
        this.contentWrapper = collapsible.querySelector('.collapsible__content-wrapper');
        this.content = collapsible.querySelector('.collapsible__content');

        if(!this.title || !this.contentWrapper || !this.content) {
            throw new Error('Invalid collapsible! A collapsible needs a title-, contentWrapper- and content-element!');
        }

        if(collapsible.classList.contains(this.openClass)) {
            this.open();
        }

        this.title.addEventListener('click', () => this.toggle());
        this.contentWrapper.addEventListener('transitionend', () => this.ontransitionend());
    }

    open(): void {
        this.contentWrapper.style.height = this.content.offsetHeight + 'px';
        this.mainElement.classList.remove(this.closeClass);
        this.mainElement.classList.add(this.openClass);
        this.isOpen = true;
    }

    close(): void {
        // I had to set the height from auto to a px-value before we can start the animation
        this.open();
        setTimeout(() => {
            this.contentWrapper.style.height = null;
            this.mainElement.classList.remove(this.openClass);
            this.mainElement.classList.add(this.closeClass);
            this.isOpen = false;
        });
    }

    toggle(): void {
        return this.isOpen ? this.close() : this.open();
    }

    ontransitionend(): void {
        if (this.isOpen) {
            // I set the height to auto to keep the responsiveness
            this.contentWrapper.style.height = null;
        }
    }
}
