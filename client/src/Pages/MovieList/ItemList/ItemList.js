import React, {Component,useState,useEffect} from 'react';
import {ErrorPage, Pagination} from "../../index";
import MovieCardSmall from "../MovieCards/MovieCardSmall";

class ErrorBoundary extends Component {
    state = {ErrorExist: false}
    componentDidCatch(error, errorInfo) {
        this.setState({ErrorExist: !this.state.ErrorExist})
    }
    render() {if (this.state.ErrorExist) {return <ErrorPage/>}
        return this.props.children;
    }
}

const ItemList = (props) => {
    const [toRender,setToRender]=useState();
    useEffect(()=>{render(props.data)},[props.data]);
    /*
    received list from component display item list transferred to each component MovieCardSmall
    all interaction occur in "displayitemlist", here only rendering
     */
    const render=(data)=>{
        const transformData = data ? data.map((item, index) => {
            return (<MovieCardSmall data={item} key={index} />)}) : null;
        if (!props.data) return (<div>Sorry nothing to display</div>);
        setToRender(transformData);
    };

    return (
        <ErrorBoundary>
            <div className="container">
                <ErrorBoundary>
                    <Pagination current_page={props.current_page} total_page={props.total_page} itteractingWithPage={props.itteractingWithPage}/>
                    <div className="row row-col-4">
                        {toRender}
                    </div>
                    <Pagination current_page={props.current_page} total_page={props.total_page} itteractingWithPage={props.itteractingWithPage}/>
                </ErrorBoundary>
            </div>
        </ErrorBoundary>
    )
}
export default ItemList;
