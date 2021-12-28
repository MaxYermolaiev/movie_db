import React from 'react'
import "./App.css"
import store from "./redux-store/store";
import {ApiRouter, AuthentificationEngine, Provider} from "./Engine";
import {Provider as ReduxProvider} from "react-redux"

const App = () => {
    /*The first step check presenting data in local storage and state,
    -if data exist  and store loaded -ok
    -if data exist but store missed -load
    -store exist if but data nope -delete credentials
    -if store not exist-delete credentials load store
    */
    //check on credetials presents
    //and call router function with rendered route in advance depend on credetials

    const methods = {...AuthentificationEngine()}
    const apiRouter = ApiRouter(methods.token !== null && methods.id !== null)
    return (
        <div className={"container-fluid"}>
            <ReduxProvider store={store}>
                <Provider value={methods}>
                    {apiRouter}
                </Provider>
            </ReduxProvider>
        </div>
    )
}

export default App

