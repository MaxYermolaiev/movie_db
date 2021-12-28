import Auth from "./Authentication/Auth";
import Registration from "./Authentication/Registration";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar"
import Loading from "./Auxilary/Loading/Loading";
import ErrorPage from "./Auxilary/ErrorPage/ErrorPage"
import Pagination from "./Auxilary/Pagination/Pagination";
import {SearchMovies,PopularMovies,GenresCategories,GenresMovies,MovieDetail,ShowFavorite} from "./MovieList/Fork"
import Buttons from "./Auxilary/Buttons/Buttons";
import AccountSettings from "./Auxilary/AccountSetings/AccountSettings";
//to handle downland components collect it in one place
export {AccountSettings,Header,Registration,Auth,SideBar,Loading,ErrorPage,Pagination,GenresMovies,GenresCategories,SearchMovies,PopularMovies,Buttons,MovieDetail,ShowFavorite}
