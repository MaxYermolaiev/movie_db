export default class Engine {
    //Memorize constants
    api_key="39a8f3cf691a2a2d1a329867c1095d19";
    path = "https://api.themoviedb.org/3/";

    request = async (url, method = "GET", body = null, headers = {}) => {
        headers['Content-type'] = 'application/json';
        try {
            //if body exist and server true send request to DB(login, registration, tune the favorite movie which save in mongo db
            if (body !== null){
                    method="POST";
                    body = this.transformToJSON(body);
                let response = await fetch(url, {method, body, headers});
                //tune and dispatch request with data
                if (!response.ok) {
                    console.log("Trouble in server side")
                    let err = await response.json();
                    throw err.errors;
                }else{
                    return await response.json();
                }
            }else if (headers.credentials){
                method="GET";
                let response = await fetch(url, {method, body, headers});
                //tune and dispatch request with data
                if (!response.ok) {
                    console.log("Trouble in server side")
                    let err = await response.json();
                    throw err.errors;
                }else{
                    return await response.json();
                }
            }else{
                //else request must redirect to movie db
                let response = await fetch(`${this.path}${url}`);
                //tune and dispatch request with data
                if (!response.ok) {
                    console.log("can't fetch response");
                    let err = await response.json();
                    throw new Error(err.errors);
                }
                return await response.json();
            }
        } catch (e) {throw e}
    }
    transformToJSON(value) {return JSON.stringify(value)};
    getImg=(id)=>{return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${id}`};
    getPopularMovies = async (page) => {
        //search data by required url and transform data - get only required info
        return await this.request(`movie/popular?api_key=${this.api_key}&language=en-US&page=${page}`);
    };
    getBySearch = async (page,search) => {
        //search data by required url and query params and transform data - get only required info
        if(search&&page){return await this.request(`search/movie?api_key=${this.api_key}&language=en-US&query=${search}&page=${page}`);}
        return await this.request(`search/movie?api_key=${this.api_key}&language=en-US&query=${search}`);
    }
    getByGenre = async (page,search) => {
        //search data by required url and transform data - get only required info
        if(search&&page){
            return await this.request(`discover/movie?api_key=${this.api_key}&language=en-US&&include_adult=false&&page=${page}&with_genres=${search}`);
        }
       return await this.request(`genre/movie/list?api_key=${this.api_key}&language=en-US`);
    }
    getMovieDetails = async (id) => {
        //search data by required url and transform data - get only required info
        return await this.request(`movie/${id}?api_key=${this.api_key}&language=en-US`);
    }
    getRecommendations = async (id) => {//search data by required url and transform data - get only required info
        return await this.request(`movie/${id}/recommendations?api_key=${this.api_key}&language=en-US&language=en-US&page=1`);
    }
}
