function Logger(logString: string) {
    return function(constructor: Function){
        console.log(logString);
        console.log(constructor);
    }
}


@Logger('LOGGING - PERSON')
class Person{
    name = 'Max';
    constructor(){
        console.log('Person constructor');
    }
}
const pers1 = new Person();
console.log("pers.name: ", pers1);