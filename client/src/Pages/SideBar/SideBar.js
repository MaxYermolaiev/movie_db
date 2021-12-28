import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Wrapper from "../../Engine/Wrapper";
import {useHistory} from "react-router-dom"
import "./SideBar.css"
import {connect} from "react-redux";
import {FETCH_MOVIE} from "../../redux-store/action";

const SideBar = (props) => {//if token exist fetch favorite from request
    useEffect(function(){if(props.token)props.getFavoriteMovie()},[props.token]);

    const history = useHistory();
    const generateId=()=>{
        props.engine.getPopularMovies(random(1,500))
            .then(data=> {
                let temp = `/random_movie/${data.results[random(0, 19)].id}`
                history.push(temp);
            })
            .catch(err=>console.log(err));
    }
    const random=(min,max)=> { return Math.trunc(Math.random() * (max - min) + min)}
    return (
        <ul className="list-group">
            <li className="SideBar_item" onClick={generateId}><span className="sideBarText">Random movie</span></li>
            <li className="SideBar_item"><Link to={"/popular/1"}><span className="sideBarText">Popular</span></Link></li>
            <li className="SideBar_item"><Link to={"/genres"}><span className="sideBarText">Genres</span></Link></li>
            {
                (props.credentials) ?
                    <>
                        <li className="SideBar_item"><Link to={"/favorite"}><span className="sideBarText">Favorite</span></Link></li>
                        <li className="SideBar_item"><Link to={"/settings"}><span className="sideBarText">Account settings</span></Link></li>
                    </> : <>

                        <li className="SideBar_item_disabled"><span className="sideBarText_disabled">Favorite</span></li>
                        <li className="SideBar_item_disabled"><span className="sideBarText_disabled">Account settings</span></li>
                    </>
            }
        </ul>
    )
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const {token,engineGetFavorite} = ownProps;
    return {getFavoriteMovie:()=>FETCH_MOVIE(token,engineGetFavorite,dispatch)}}
export default Wrapper()(connect(null,mapDispatchToProps)(SideBar));
