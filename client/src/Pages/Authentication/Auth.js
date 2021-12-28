import React, {useState, useEffect, Component, useRef} from 'react';
import Wrapper from "../../Engine/Wrapper";
import {Validator} from "../../Engine/index";
import {useHistory} from "react-router";
import {ErrorPage} from "../index";
import "./AuthStyles.css";
import {connect} from "react-redux";
import {FETCH_USER_DATA} from "./../../redux-store/action";
class ErrorBoundary extends Component {
    state = {ErrorExist: false}
    componentDidCatch(error, errorInfo) {this.setState({ErrorExist: !this.state.ErrorExist})}
    render() {
        if (this.state.ErrorExist) {return <ErrorPage/>}
        return this.props.children;
    }
}

const Auth=(props)=>{
    const [showAid,setShowAid] = useState(false);
    const [form,setForm] = useState({email:"",password:""});
    const [validationErrors,setValidationError] = useState({});
    const passwordRef = useRef();
    const history=useHistory();
    const validator= new Validator();

    useEffect(()=>{validator.validate(form,setValidationError);},[form]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        setShowAid(true);
        validator.validate(form,setValidationError);
        if(Object.keys(validationErrors).length)return;

        props.engine.request("https://yermolaiev-movie-db.herokuapp.com/api/login","POST",form,{})
        .then(data=>{
            console.log(data)
            props.setUserData(data.user_data);
            props.login(data.jwt,data.id);
            history.push("/popular/1");
            }
        ).catch((err)=>{
            if(err.email)setValidationError({...validationErrors,email:err.email});
            if(err.password)setValidationError({...validationErrors,password:err.password});
            })
    }

    return(
      <ErrorBoundary>
       <div className="auth-box">
        <form>
            <fieldset>
                <legend ><h4 className={"text-secondary fw-bold"}>User authentication</h4></legend>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="form-label mt-3 fst-italic">Email address</label>
                    <input type="email" className="form-control auth-input" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Enter email" onBlur={(e)=>setForm({...form,email:e.target.value})}/>
                    <small className="auth-error text-danger fst-italic">{validationErrors?.email&&showAid?validationErrors.email:null}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="form-label mt-4 fst-italic">Password</label>
                    <input type="password" ref ={passwordRef} className="form-control auth-input" id="exampleInputPassword1" placeholder="Password" onBlur={(e)=> setForm({...form, password: e.target.value}) }/>
                    <p><input type={"checkbox"} onChange={(e)=> e.target.checked ? passwordRef.current.type='text' : passwordRef.current.type='password'}/> Show password</p>
                    <small className="auth-error text-danger fst-italic">{validationErrors?.password&&showAid?validationErrors.password:null}</small>
                </div>
                <button type="submit" className="btn btn-primary btn-registration mt-3" onClick={handleSubmit}>Submit</button>
            </fieldset>
        </form>
       </div>
     </ErrorBoundary>
    )
}

const mapDispatchToProps=(dispatch)=> {
   return {
        setUserData:(data)=> {
            dispatch(FETCH_USER_DATA(data))
        }
    }
};

export default Wrapper()(connect(null,mapDispatchToProps)(Auth));



