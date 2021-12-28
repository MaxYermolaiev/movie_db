import React from "react";
import {Consumer, Engine} from "./index";
//to apply store, engine, auth methods in required component
//feed it to higher order components
const engine = new Engine()

let Wrapper = (MethodsServise) => (Wraped)=> {
    return (props) => {
        return (
            <Consumer>
                {(authMethods) => {
                const methods = (MethodsServise) ? {...MethodsServise(engine),engine,...authMethods}:{...authMethods,engine};
                return (<Wraped {...props} { ...methods}/>);
                 }}
            </Consumer>
        )
    }
}

export default Wrapper;




