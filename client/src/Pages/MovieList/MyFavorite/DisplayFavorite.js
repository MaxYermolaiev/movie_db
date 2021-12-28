import React, {useState, useEffect, Component} from "react";
import {useHistory} from "react-router";
import {ErrorPage} from "../../index";
import Buttons from "../../Auxilary/Buttons/Buttons";


class ErrorBoundary extends Component {
    state = {ErrorExist: false}
    componentDidCatch(error, errorInfo) {
        this.setState({ErrorExist: !this.state.ErrorExist});
    }
    render() {
        if (this.state.ErrorExist) {return <ErrorPage/>}
        return this.props.children;
    }
}

const DisplayFavorite = (props) => {
    const [toRender, setToRender] = useState([]);
    const history = useHistory();

    useEffect(() => renderItem(props.data), [props.data]);
    const getImg=(id)=>{return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${id}`};
    const handleToDetail = (item) => {history.push(`/movie_detail/${item.id}`)}//to detail page of favorite component

    const renderItem = (data) => {
        let temp = null;
        if(!data){
            temp =[<div key={1}>No favorite in you list</div>];
        }else{
            temp = data.map((item, index) => {
                    return (
                        <div className="col d-flex mt-3" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{item.original_title}</h5>
                                    <img width={150} height={230} alt={"some picture"} src={getImg(item.poster_path)}/>
                                    <div className={"card-text"}>
                                        <button type="button" className="btn btn-light btn-component" onClick={()=>handleToDetail(item)}>More details</button>
                                        <Buttons movie_id={item.id} movie_data={item}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            )
        }
        setToRender(temp);
    }
    return (<div className={"row row-cols-3"}>
            <ErrorBoundary>
                  {toRender}
            </ErrorBoundary>
    </div>)
}
export default DisplayFavorite;
