import React from "react";
import ico from'./Loading.SVG';

export default function Loading() {
return(
    <div className={'d-flex justify-content-center'}>
        <img src={ico} alt="error icon"/>
    </div>
)
}