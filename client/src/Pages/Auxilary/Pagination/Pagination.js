import React,{useState,useEffect} from "react";
import "./Pagination.css";

export default function Pagination({current_page,total_page,itteractingWithPage}){
    const [paginations,setPaginations] = useState([])

    const createPagination=()=>{
        let arr=[];
        //2 type of offset
        //1- from beginning next from end
        if (total_page===1) {
            return [current_page];
        }
        for(let i=current_page;i>=current_page-2;i--){
            arr.push(i);
            if(i===1)break;
        }
        let shift = 3-arr.length;
        if(shift===0){
            for(let i=current_page+1;i<=current_page+2;i++){
                arr.push(i);
            if(i===total_page)break;
        }}else{
            for(let i=current_page+1;i<=current_page+2+shift;i++) {
                arr.push(i);
                if (i === total_page) break;
            }
        }
     return arr.sort((a,b)=>a-b)}

    useEffect(()=>{
        if(current_page&&total_page){
            const arr = createPagination();
            const newArr = arr.map((item,index)=>{
                if(item===current_page){
                    return(
                        <li className="page-item active m-2" key={index} onClick={()=>itteractingWithPage(item)}>
                            <span className="page-link">{item}</span>
                        </li>
                    )
                }
                return(
                    <li className="page-item m-2" key={index} onClick={()=>itteractingWithPage(item)}>
                        <span className="page-link">{item}</span>
                    </li>
                )
            })
            setPaginations([...newArr]);
                }
    },[current_page,total_page]);

    return(
        <div>
        <ul className="pagination">
            {paginations}
        </ul>
    </div>
    )
}


