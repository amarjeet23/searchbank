import React from 'react'
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Form from './components/Form';
import Tabledata from './components/Tabledata';

export default function App() {
    return (
        <div>
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Form}/>
                <Route path="/table" component={Tabledata}/>
            </Switch>
            </BrowserRouter>
        </div>
    )
}
