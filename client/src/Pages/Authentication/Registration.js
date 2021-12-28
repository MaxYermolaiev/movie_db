import React, {useEffect, useState,Component} from "react";
import Wrapper from "../../Engine/Wrapper";
import {Validator} from "../../Engine/index";
import {ErrorPage} from "../index";
import {useHistory} from "react-router";
import "./AuthStyles.css";

class ErrorBoundary extends Component {
    state = {ErrorExist: false};
    componentDidCatch(error, errorInfo) {this.setState({ErrorExist: !this.state.ErrorExist})};
    render() {
        if (this.state.ErrorExist) {return <ErrorPage/>};
        return this.props.children;
    };
}

function Registration(props){
    const [showAid,setShowAid] = useState(false);
    const [form,setForm] = useState({email:"",password:"",city:"",phone:"",nick:""});
    const [validationErrors,setValidationError] = useState({});
    const [status,setStatus] = useState({loading:false,success:false});
    const [counter,setCounter] = useState(6);
    const validator = new Validator();
    const history=useHistory();

    useEffect(()=>{validator.validate(form,setValidationError);},[form]);

    const handleSubmit=(e)=> {
        e.preventDefault();
        setStatus({...status, loading: true});
        setShowAid(true);
        validator.validate(form,setValidationError);
        if(Object.keys(validationErrors).length)return;

        props.engine.request("https://yermolaiev-movie-db.herokuapp.com/api/registration", "POST", form)
            .then(() => {
                setStatus({ success: true, loading: false});
            })
            .catch(err => {
                setValidationError(err);
                setStatus({...status,  loading: false});
            })
    }

    if(status.success){
            let interval = setInterval(()=> {
                setCounter(()=>counter- 1);
                if(counter===0){history.push("/authentication")};
            },1000);
            setTimeout(()=>clearInterval(interval),6000);
        return(
        <>
            <h1>New user successfully created</h1>
            <h3>{`You will be redirected to login page via ${counter} seconds...`}</h3>
        </>)
    }
    return(
        <div id="auth-box">
            <div className={`shadow-loading ${status.loading}`}>
                <div className="lds-default">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div></div>
        <ErrorBoundary>
        <form>
            <fieldset>
                <legend><h4 className={"text-secondary fw-bold"}>Registration new user</h4></legend>
                <div className="form-group">
                    <label htmlFor="Email" className="form-label mt-4 fst-italic fs-7">Email address</label>
                    <input type="email" className="form-control auth-input" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Enter email"  onChange={(e)=>setForm({...form,email:e.target.value})}/>
                    <small className="auth-error text-danger fst-italic">{validationErrors?.email&&showAid?validationErrors.email:null}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="Password" className="form-label mt-2 fst-italic fs-7">Password</label>
                    <input type="password" className="form-control auth-input" id="exampleInputPassword1" placeholder="Password"
                           onChange={(e)=>setForm({...form,password:e.target.value})}/>
                    <small className="auth-error text-danger fst-italic">{validationErrors?.password&&showAid?validationErrors.password:null}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="Default" className="col-form-label mt-2 fst-italic fs-7">Type your native city</label>
                    <input type="text" className="form-control auth-input" placeholder="Where are you from" name="city_input"
                           onChange={(e)=>setForm({...form,city:e.target.value})}
                    />
                    <small className="auth-error text-danger fst-italic">{validationErrors?.city&&showAid?validationErrors.city:null}</small>
                </div>
                <div className="form-group">
                    <label className="col-form-label mt-2 fst-italic" htmlFor="inputDefault">Type your number</label>
                    <input type="text" className="form-control auth-input" placeholder="Phone number" name="phone_input"
                           onChange={(e)=>setForm({...form,phone:e.target.value})}
                    />
                    <small className="auth-error text-danger fst-italic">{validationErrors?.phone&&showAid?validationErrors.phone:null}</small>
                </div>
                <div className="form-group">
                    <label className="col-form-label mt-2 fst-italic" htmlFor="inputDefault">Type your nickname</label>
                    <input type="text" className="form-control auth-input" placeholder="Nickname" name="nickname_input"
                           onChange={(e)=>setForm({...form,nick:e.target.value})}/>
                    <small className="auth-error text-danger fst-italic">{validationErrors?.nick&&showAid?validationErrors.nick:null}</small>
                </div>
                <button type="submit" className="btn btn-primary btn-registration mt-3" onClick={handleSubmit}>Create account</button>
            </fieldset>
        </form>
     </ErrorBoundary>
    </div>
       )
}

export default Wrapper()(Registration);


