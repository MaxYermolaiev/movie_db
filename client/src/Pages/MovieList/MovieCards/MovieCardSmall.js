import React from "react";
import {useHistory} from "react-router";
import {Buttons} from "./../../index";
import "./MovieCardSmall.css";


const MovieCardSmall=(props)=>{
    const {data} = props;
    const history = useHistory();
    const handleToDetail=(data)=>{history.push(`/movie_detail/${data.id}`)};

    return(
        <div className="col d-flex mt-1">
        <div className="card m-0">
            <div className="card-body">
                <h5 className="card-title fw-bold">{data.original_title}</h5>
                <img width={200} height={300} src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`} alt={"Poster of movie"}/>
                <p className="card-text fs-6 fst-italic" >{`${data.overview.substring(0,50)} ...`}</p>
                <p className="card-text fs-5">Movie Rate: {data.vote_average}</p>
                <button type="button" className="btn btn-secondary more-detail" onClick={()=>handleToDetail(data)}>More detail</button>
                <Buttons movie_data={data}/>
            </div>
        </div>
       </div>
    )
}

export default MovieCardSmall;



