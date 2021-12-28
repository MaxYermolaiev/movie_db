import Wrapper from "./../../Engine/Wrapper";
import GenresCategorie  from "./ItemList/Genres/DisplayGenres";
import DisplayItems from "./ItemList/DisplayItemList";
import ItemList from "./ItemList/ItemList";
import MovieDetails from "./MovieItem/MovieDetails";
import FetchFavorite from "./MyFavorite/FetchFavorite";

const getByGenre=(engine)=>{return {getData:engine.getByGenre,getImage:engine.getImg}}
const getBySearch=(engine)=>{return {getData:engine.getBySearch,getImage:engine.getImg}}
const getByPopular=(engine)=>{return {getData:engine.getPopularMovies,getImage:engine.getImg}}
const getDetails=(engine)=>{return {getRecommendations:engine.getRecommendations,getData:engine.getMovieDetails,getImage:engine.getImg}}
const getFavorite=(engine)=>{return {getData:engine.getMovieDetails,getImage:engine.getImg}}
//endow all component with function from provider and put it in router
const ShowFavorite = Wrapper(getFavorite)(FetchFavorite)
const SearchMovies = Wrapper(getBySearch)(DisplayItems(ItemList))
const PopularMovies = Wrapper(getByPopular)(DisplayItems(ItemList))
const GenresMovies = Wrapper(getByGenre)(DisplayItems(ItemList))
const GenresCategories = Wrapper(getByGenre)(GenresCategorie)
const MovieDetail = Wrapper(getDetails)(MovieDetails)
export  {GenresMovies,GenresCategories,SearchMovies,PopularMovies,MovieDetail,ShowFavorite};
