import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router";
import Wrapper from "../../Engine/Wrapper";
import AccountImage from "../Auxilary/AccountImage/AccountImage";
import "./Header.css";
import {connect} from "react-redux";

const Header=(props)=>{
    const [buttons,setButtons]=useState("disabled");
    const [searchResults,setSearchResults] = useState([]);
    const history = useHistory();
    const inputRef = useRef();
    const [eventEmitter,setEventEmitter] = useState({});

    class Controller{
        constructor(){
            this.isBlured =null;
        }
        init(){document.addEventListener('click',(e)=> {
            if(this.isBlured){
                model.clearResults();
                this.isBlured=false;
            }
        });
        }
        typeEvent(data){data.length>2? model.handleType(data): model.handleType();}
        buttonPress(){
            this.isBlured=false;
            history.push(`/search/1/${(inputRef.current).value}`);
            model.clearInput();
            model.clearResults();
        }
        blurEvent=()=>{
            this.isBlured=true;
        }
    }
    let controller=new Controller();
    controller.init();

    const model={
        handleType(data){
           this.isBlured=false;
           if(!data){
               this.clearResults();
               return;
           }
            props.engine.getBySearch(null,data)
                .then(data=>this.handleResults({status:'success',data:data}))
                .catch(error=>this.handleResults({status:'error',data:error}))
        },
        handleResults({status,data}){
            if (status==='error'){
                setButtons('disabled');
                setSearchResults(<div className="p-2 bd-highlight" key={1}>Sorry some error occurred</div>);
            }
            if (status==='success'&&data.results.length===0){
                setSearchResults(<div className="p-2 bd-highlight" key={1}>No result by your searching query, try another variant</div>);
                setButtons('disabled');
            }else{
                let temp = data.results.map((item,index)=>{
                    return(
                        <div className="p-2 bd-highlight" key={index} onClick={()=>{
                            history.push(`/movie_detail/${item.id}`);
                            this.clearResults();
                            this.clearInput();
                        }}>{item.original_title}</div>)
                });
                setSearchResults([...temp]);
                setButtons('');
            }
        },
        clearInput(){
            (inputRef.current).value='';
        },
        clearResults(){
            setButtons('disabled');
            setSearchResults([]);
        }
    }

    const View = (event) => {
        event.type === 'change' ? setEventEmitter({type:'typeEvent', value:event.target.value}) :
        event.type === 'blur'?setEventEmitter({type:'blurEvent'}):
                              setEventEmitter({type: 'buttonPress', value: (inputRef.current).value});
    };
    useEffect(()=> {if(eventEmitter.type){controller[eventEmitter.type](eventEmitter.value)};},[eventEmitter]);
    //View part end. Item will be displayed via model 'models'.


    //Authentication handlers
    const buttonAuthHandler = (e,event) => {
    if(event==="logout"){props.logout();history.push("/");}
    if(event==="login"){history.push("/authentication");}
    if(event==="register"){history.push("/registration");}
    }
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav me-auto">
                            {
                                (!props.id&&!props.token)?<div className={"header-button"}>
                                    Hello stranger! You can
                                    <span className={"header_registration_links"} onClick={(e)=>buttonAuthHandler(e,"login")}> Login</span> or
                                    <span className={"header_registration_links"} onClick={(e)=>buttonAuthHandler(e,"register")}> Create new one!</span>
                                </div> : <React.Fragment>
                                    <div className={'header_small_image'}>
                                    <AccountImage/>
                                    </div>
                                    <div className={'d-flex align-items-center header_settings greeting'}><i>{`Hi, ${props?.user?.nick}!`}</i></div>
                                    <div className={'d-flex align-items-center header_settings'}>Settings
                                    <div className={'header_settings-list'}>
                                        <div onClick={(e)=>history.push("/favorite")}>Favorite</div>
                                        <div onClick={(e)=>history.push("/settings")}>Personal settings</div>
                                        <div onClick={(e)=>buttonAuthHandler(e,"logout")}>Logout</div>
                                    </div>

                                    </div>
                                </React.Fragment>}
                        </ul>
                        <form className="d-flex" onBlur={View}>
                            <input className="search-input" data-toggle="dropdown" type="text" ref={inputRef} placeholder="Movie search"
                                   onChange={(e)=>View(e,e.target.value)}
                                   onFocus={(e)=>{e.target.style.width=300+'px'}}
                                   onBlur={(e)=>{e.target.style.width=150+'px'}}
                            />
                            <button className="btn btn-success my-2 my-sm-0 btn-search" type="button" disabled={buttons} onClick={(e)=>View(e)}>Search</button>
                            <div className="d-flex flex-column bd-highlight pos-absolute">
                                    {searchResults}
                                </div>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }

const mapStateToProps =({user})=> {return{user}};

export default Wrapper()(connect(mapStateToProps,null)(Header))