import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";

const RecomendationCard=({recommendations,getImage})=>{
    const [dataToRender,setDataToRender] = useState([]);
    const history = useHistory();
    const MoreDetailHandler=(e,id)=>{history.push(`/movie_detail/${id}`)};

    const toRender=(recommendations)=>{
        let result=[];
        if(!recommendations) {
            return;
        }else{
            result = recommendations.results.map((item,index)=>{
            let itemId = item.id;
            return(
                <div className="col" key={index}>
                    <div className="card" style={{width: "9rem"}}>
                        <img src={getImage(item.backdrop_path)} className="card-img-top" alt={item.original_title}/>
                        <div className="card-body">
                            <h6 className="card-title text-center">{item.original_title}</h6>
                            <button type="button" className="btn btn-primary btn-component" onClick={(e)=>MoreDetailHandler(e,itemId)}>More details</button>
                        </div>
                    </div>
                </div>
            )
        })
        }
        setDataToRender([...result]);
    }

    useEffect(()=>{toRender(recommendations)},[recommendations])
    return(
        <div className="row row-cols-5">
            {dataToRender}
        </div>
    )
}

export default RecomendationCard;
