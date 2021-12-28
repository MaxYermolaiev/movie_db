let FETCH_MOVIE_REQUEST = ()=>{return{type:'FETCH_MOVIE_REQUEST'}};
let FETCH_MOVIE_LOAD = (movies)=>{return{type:'FETCH_MOVIE_LOADED', payload:movies}};
let FETCH_MOVIE_ERROR = (error)=>{return{type:'FETCH_MOVIE_ERROR', payload:error}};
let ADD_MOVIE = (data)=>{return{type:'ADD_MOVIE', payload:data}};
let REMOVE_MOVIE = (data)=>{return{type:'REMOVE_MOVIE', payload:data}};
let FETCH_MOVIE=(token,getFavorite,dispatch)=> {
    dispatch(FETCH_MOVIE_REQUEST());
    getFavorite(token)
        .then((data) => {
            dispatch(FETCH_MOVIE_LOAD(data.UserStorage));
        })
        .catch((err) => {
            dispatch(FETCH_MOVIE_ERROR(err));
        });
}
let DELETE_MOVIE_FROM_FAVORITE=(token,engineRemoveFavorite,dispatch,data)=> {
    dispatch(FETCH_MOVIE_REQUEST());
    dispatch(REMOVE_MOVIE(data));
    engineRemoveFavorite(token,data)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            dispatch(FETCH_MOVIE_ERROR(err))
        })
}
let ADD_MOVIE_TO_FAVORITE=(token,engineAddFavorite,dispatch,movie_data)=> {
    dispatch(FETCH_MOVIE_REQUEST());
    dispatch(ADD_MOVIE(movie_data));
    engineAddFavorite(token,movie_data)
        .then((data) => {console.log(data)})
        .catch((err) => {
            dispatch(FETCH_MOVIE_ERROR(err));
        })
}
const REMOVE_USER_DATA =()=>{
    return {type:'REMOVE_USER_DATA'};
}
const FETCH_USER_DATA =(user_data)=>{
    return {type:'FETCH_USER_DATA', payload:user_data}
}
    export {REMOVE_USER_DATA,FETCH_USER_DATA,FETCH_MOVIE,ADD_MOVIE_TO_FAVORITE,DELETE_MOVIE_FROM_FAVORITE}
