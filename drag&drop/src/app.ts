// Code goes here!
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = document.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = document.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = document.querySelector('#people') as HTMLInputElement;
        this.configure();
        this.attach();
    }
    private submiteHandler(event: Event) {
        event.preventDefault()
        console.log("title --", this.titleInputElement.value);
    }
    private configure() {
        this.element.addEventListener('submit', this.submiteHandler.bind(this));
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const projectInput = new ProjectInput();