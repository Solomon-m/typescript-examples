// Code goes here!
class ProjectState {
    private listeners: any[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;
  
    private constructor() {}
  
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }
  
    addListener(listenerFn: Function) {
      this.listeners.push(listenerFn);
    }
  
    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = {
        id: Math.random().toString(),
        title: title,
        description: description,
        people: numOfPeople
      };
      this.projects.push(newProject);
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }
  
  const projectState = ProjectState.getInstance();
// Validation 
interface Validatable {
    value: string | number;
    required ? : boolean;
    minLength ? : number;
    maxLength ? : number;
    min ? : number;
    max ? : number;
}

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjustedDescriptor;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && (validatableInput.value.toString().trim().length !== 0);
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && (validatableInput.value.length >= validatableInput.minLength);
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && (validatableInput.value.length < validatableInput.maxLength);
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && (validatableInput.value <= validatableInput.min);
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && (validatableInput.value > validatableInput.max);
    }
    return isValid;
}

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects:any[] = [];
    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list') !as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') !as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul') !.id = listId;
        this.element.querySelector('h2') !.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`) !as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }
}
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
        this.templateElement = document.getElementById('project-input') !as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') !as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = document.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = document.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = document.querySelector('#people') as HTMLInputElement;
        this.configure();
        this.attach();
    }
    @autobind
    private submiteHandler(event: Event) {
        event.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            //document.getElementById("")
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }

    }
    private configure() {
        this.element.addEventListener('submit', this.submiteHandler);
    }
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
        }
        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert("Invalid input, please try again");
        }
        this.clearInputs();

        return [enteredTitle, enteredDescription, +enteredPeople];
    }
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

}

const projectInput = new ProjectInput();
const activeprojectList = new ProjectList('active');
const finishedprojectList = new ProjectList('finished');