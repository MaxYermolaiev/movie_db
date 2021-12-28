export default class Validator {
    results = {};
    schema = {
        email:/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/,
        password:/([a-zA-Z0-9]){6,}/g,
        phone:/^\+380[0-9]{9}$/,
        city:/[A-Za-z]{3,}/,
        nick:/[A-Za-z,0-9]{4,}/
    }
    test =(key,value)=> this.schema[key]?this.schema[key].test(value):this.schema.default.test(value);

    validate=(props,resultsSetter)=>{
        this.results = {};
        for(let [key,value] of Object.entries(props)){
                if(!this.test(key,value))this.results[key]=this.mistakesDescription[key];
        }
        resultsSetter(this.results);
    }
    mistakesDescription={
        email:"Incorrect email, please check it...Example 'youremail@provider.com'",
        password:"Password is not correct,use letters and digits. Minimum 6 symbols.",
        nick:"Nickname must be longer 4 symbols, can contain letters and digits",
        city:"City length must be more 2 letters",
        phone:"Phone not correct, it should be like example - +380442233444"
    }
}