let initialState = {movies: [], loading: true, errors: null, user:{}}
const find=(id,movieStore)=>{
    let index=-1;
    for(let i=0;i<movieStore.length;i++){
        if(movieStore[i].id === id){
            index=i;
        }
    }
    return index;
}
const reduser = ( state=initialState,action)=>{
          switch (action.type) {
              case('FETCH_MOVIE_REQUEST'):return {...state, loading:true, errors:null};
              case('FETCH_MOVIE_LOADED'):return {...state,movies: action.payload, loading:false, errors:null};
              case('FETCH_MOVIE_ERROR'):return {...state,movies: state.movies, loading:false, errors:action.payload};
              case ('ADD_MOVIE'): {
                  let movies = state.movies;
                  movies.push(action.payload);
                  const temp ={ ...state, errors:null, movies:movies,loading: false};
                  return temp;}
              case ('REMOVE_MOVIE'): {
                  let index = find(action.payload.id,state.movies);
                  let temp = {...state,errors:null,loading: false, movies:[...state.movies.slice(0, index), ...state.movies.slice(index + 1)]};
                  return temp;
              }
              case ('FETCH_USER_DATA'): {
                  let temp = {...state,user:action.payload};
                  return temp;
              }
              case ('REMOVE_USER_DATA'): {
                  let temp = { ...state, user:{}};
                  return temp;
              }
              default:return state;
          }
}
export default reduser
