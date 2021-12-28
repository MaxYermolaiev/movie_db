import React, {useState, useEffect, Component} from "react";
import {useHistory} from "react-router";
import {Loading, ErrorPage} from "../../../index";
import "./DisplayGenres.css"

//error boundary for prevend bug and display error page
class ErrorBoundary extends Component {
    state = {ErrorExist: false};
    componentDidCatch(error, errorInfo) {this.setState({ErrorExist: !this.state.ErrorExist})};
    render() {if (this.state.ErrorExist) {return <ErrorPage/>}return this.props.children;}};

let GenresCategorie = (props) => {
    const [data, setData] = useState({data: false, loading: false, error: false});
    const history = useHistory();
    //all time in render need only one time to update render page, so recieve list and render it
    useEffect(() => {
        setData({data: false, loading: true, error: false});
        props.getData()
            .then((data) => {
                let temp = data.genres.map((item, index) => {
                    return (
                        <div className={"col genres_item"} key={index}>
                              <h5 className="card-title genres-card fst-italic"
                                   onClick={() => history.push(`/genre/1/${item.id}`)}>{item.name}
                             </h5>
                        </div>
                    )
                })
                setData({data: temp, loading: false, error: false});
            })
            .catch((err) => {setData({data: false, loading: false, error: err.message})});
    }, [])
    //Defend self from mistake and render required component
    if (data.error||!data.data) {return <ErrorPage message={data.error}/>}
    if (data.loading) {return <Loading/>}
    return (
        <ErrorBoundary>
            <div className={"genre"}>
                <div className="card text-center m-1">
                    <h3 className={"genre-header fw-bold fst-italic"}>Select category:</h3>
                </div>
                <div className={"d-flex flex-wrap justify-content-start genres_item_list"}>
                    {data.data}
                </div>
            </div>
        </ErrorBoundary>
    )
}
export default GenresCategorie;