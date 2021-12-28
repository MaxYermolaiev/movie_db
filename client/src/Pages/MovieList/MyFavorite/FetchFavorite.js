import React, {Component} from "react";
import {Loading, ErrorPage} from "../../index";
import DisplayFavorite from "./DisplayFavorite";
import {connect} from "react-redux";

class ErrorBoundary extends Component {
    state = {ErrorExist: false}
    componentDidCatch(error, errorInfo) {this.setState({ErrorExist: !this.state.ErrorExist})}
    render() {
        if (this.state.ErrorExist) {return <ErrorPage/>}
        return this.props.children;
    }
}

const FetchFavorite = (props) => {
    //fetch favorite from redux, and if list empty render dialog box if no transfer data to next component
    //where data will be transformed
    if (props.movies.error) {return <ErrorPage/>}
    if (props.movies.loading) {return <Loading/>}
    if (props.movies.length === 0) {
        return (
            <div className={"container-fluid"}>
                <div className="alert alert-primary mt-3" role="alert">Favorite list is empty please add some movie</div>
            </div>)
    }
    return (
        <div className={"container-fluid"}>
            <ErrorBoundary>
                <DisplayFavorite data={props.movies}/>
            </ErrorBoundary>
        </div>
    )
}

const mapStateToProps=({movies, loading, errors})=>{return {movies, loading, errors}}
export default connect(mapStateToProps)(FetchFavorite);
