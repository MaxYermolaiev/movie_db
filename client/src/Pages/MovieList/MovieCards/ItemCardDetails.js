import React from 'react';
import "./ItemCardDetails.css";

const ItemCardDetails=({data})=>{
    return(
        <div>
            <div className="card card-head row mb-3 mt-3">
                    <h3 className="card-header fw-bold">{data.original_title}</h3>
                    <div className="card-body">
                        <h5 className="card-title fst-italic">{`Motto: ${data.title}`}</h5>
                        <h6 className="card-subtitle text-muted fst-italic">{`Released: ${data.release_date}`}</h6>
                    </div>
                </div>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={data.backdrop_path} className="img-fluid rounded-start" alt={data.original_title}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title fw-bold">Main information:</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{`Genres: ${data.genres.map(item=>item.name)}`}</li>

                            <li className="list-group-item">{`Budget: ${data.budget}`}</li>
                            <li className="list-group-item">{`Revenue: ${data.revenue}`}</li>
                            <li className="list-group-item">{`Average vote : ${data.vote_average}`}</li>
                            <li className="list-group-item">{`Popularity : ${data.popularity}`}</li>
                            <li className="list-group-item">{`Duration : ${data.runtime}`}</li>
                            <li className="list-group-item">{`Production companies : ${data.production_companies.map(item=>item.name)}`}</li>
                            <li className="list-group-item">{`Movie id : ${data.id}`}</li>
                            <li className="list-group-item">{`Age limit to view : ${data.adult?"Yes":"Nope"}`}</li>
                            <li className="list-group-item">{`Original leandue: ${data.original_language}`}</li>
                        </ul>
                </div>
            </div>
                <div className="card row mt-2 mb-3">
                    <div className="card-body">
                        <p className="card-text fst-italic fs-6">{data.overview}</p>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default ItemCardDetails;
