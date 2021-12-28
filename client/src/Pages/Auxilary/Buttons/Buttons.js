import React,{useState,useEffect} from "react";
import "./Button.css";
import {ADD_MOVIE_TO_FAVORITE, DELETE_MOVIE_FROM_FAVORITE} from "../../../redux-store/action";
import Wrapper from "../../../Engine/Wrapper";
import {connect} from "react-redux";

const Buttons = (props) => {
    const {movie_data, removeFromFavorite, addToFavorite,token} = props;
    const [buttonState,setButtonState] = useState({add:"disabled",remove:"disabled"});
    //render element depend on condition from store
    const find=(id)=>{
        let index=-1;
         for(let i=0;i<props.movies.length;i++){
             if(props.movies[i]?.id === id){
                 index=i;
             }
         }
        return index;
    }

    const changeButton = () =>{
        if(props.movies===undefined||props.movies===null)return;
        if(!token) {setButtonState({add:"disabled",remove:"disabled"})};
        const idx=find(movie_data.id);
        if(idx>=0){setButtonState({add:"disabled",remove:""})
        }else{
            setButtonState({add:"",remove:"disabled"})}
    };
    useEffect(()=>changeButton(),[props.movies])

    //add favorite and switch button status
    const actionsAdd=()=>{
          addToFavorite()
          setButtonState({add:"disabled",remove:""})
    }
    //remove favorite and switch button status
    const actionsRemove=()=>{
           removeFromFavorite()
           setButtonState({add:"",remove:"disabled"})
    }

    if(props.token) {
        return (
            <>
                <button type="button" className="btn btn-primary btn-component" disabled={buttonState.add} onClick={() => actionsAdd()}>Add to favorite</button>
                <button type="button" className="btn btn-primary btn-component" disabled={buttonState.remove} onClick={() => actionsRemove()}>Remove from favorite</button>
            </>
        )
    }else{ return (
        <>
            <button type="button" className="btn btn-primary btn-component" disabled={"disabled"}>Add to favorite</button>
            <button type="button" className="btn btn-primary btn-component" disabled={"disabled"}>Remove from favorite</button>
            <div className="alert alert-warning" role="alert">Please login or register account for save in favorite current movie</div>
        </>
    )}
   ;

};
const mapStateToProps=({movies,loading,errors})=>{return {movies,loading,errors}};
const mapDispatchToProps=(dispatch, ownProps)=>{
    const {token,engineRemoveFavorite,engineAddFavorite,movie_data} = ownProps;
    return{
        removeFromFavorite:()=>DELETE_MOVIE_FROM_FAVORITE(token,engineRemoveFavorite,dispatch,movie_data),
        addToFavorite:()=>ADD_MOVIE_TO_FAVORITE(token,engineAddFavorite,dispatch,movie_data)
    };
};
export default Wrapper()(connect(mapStateToProps,mapDispatchToProps)(Buttons));
