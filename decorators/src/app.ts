function Logger(logString: string) {
    return function(constructor: Function){
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId : string){
    return function(constructor:any){
        console.log("WithTemplate");
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if(hookEl){
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}


@Logger('LOGGING - PERSON')
@WithTemplate('<h1> my person object<h1>','app')
//execution order of decorators is  bottom to top
class Person{
    name = 'Max';
    constructor(){
        console.log('Person constructor');
    }
}
const pers3 = new Person();
//console.log("pers.name: ", pers3);

class Product{
    title: string;
    price: number;
    constructor(t: string, p:number){
        this.title = t;
        this.price = p;
    }
    getPriceWithTax(tax : number){
        return this.price * ( 1 + tax);
    }
}