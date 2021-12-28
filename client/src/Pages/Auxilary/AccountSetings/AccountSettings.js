import React,{useState} from "react";
import "./AccountSettings.css"
import Wrapper from "../../../Engine/Wrapper";
import {connect} from "react-redux";
import AccountImage from "./../AccountImage/AccountImage";

const RenderPersonalData=({data})=>{
    if(data){
        let results = Object.entries(data).map((itm,idx)=>{
            return (<div key={idx}>{itm[0]}:{itm[1]}</div>);
        });
        return (<>{results}</>);
    }
    return(<>Personal data is missing</>)
}
const ChangePersonalData=({data})=>{
    return (<>
        <div className={'row'}><div className={'col'}>Language:</div><div className={'col'}></div></div>
        <div className={'row'}><div className={'col'}>Change phone number:</div><div className={'col'}></div></div>
        <div className={'row'}><div className={'col'}>Set nick:</div><div className={'col'}></div></div>
        <div className={'row'}><div className={'col'}>Set city:</div><div className={'col'}></div></div>
        <div className={'row'}><div className={'col'}>Change password:</div><div className={'col'}></div></div>
        <div className={'row'}><div className={'col'}>User themes:</div><div className={'col'}></div></div>
    </>);
}
const AccountSettings = (props) => {
    const [displayed,setDisplayed] = useState({personal:false,notification:false,remove:false,information:false});
    const [selectedElement,setSelectedElement] = useState(null);

    const setSelected=(e)=>{
        if(selectedElement){
            selectedElement.classList.remove('active');
        };
        let temp = {...displayed};
        temp[selectedElement?.dataset?.selected]=false;
        temp[e.target.dataset.selected]=true;
        setDisplayed({...temp});
        e.target.classList.add('active');
        setSelectedElement(e.target);
        }

    return (
            <div>
            <div className="settings_header">
                <ul className='d-flex justify-content-between'>
                    <li><div data-selected="information" className='settings_title' onClick={(e)=>{setSelected(e)}}>Personal_information</div></li>
                    <li><div data-selected="personal" className='settings_title' onClick={(e)=>{setSelected(e)}}>Personal_settings</div></li>
                    <li><div data-selected="notification" className='settings_title' onClick={(e)=>{setSelected(e)}}>Account_notification</div></li>
                    <li><div data-selected="remove" className='settings_title' onClick={(e)=>{setSelected(e)}}>Account_remove</div></li>
                </ul>
                <hr/>
                </div>
                {!selectedElement?<div className={'d-flex justify-content-center'}>Please select setting category</div>:null }
                    <div className={`settings_extended_${displayed.remove}`}>
                        <div className={'d-flex'}><input type="password" className={'settings_extended_input'}/><button className='btn btn-danger settings_extended_button'>Remove account</button></div><br/>
                        <span>For removing account enter password for confirmation</span>
                    </div>
                    <div className={`settings_extended_${displayed.notification}`}>
                        <div className={'row settings_extended-row'}>
                            <div className={'col-4'}><button className={'btn btn-primary'} >Subscribe on our mailing</button></div>
                            <div className={'col'}>Disabled</div>
                        </div>
                        <div className={'row settings_extended-row'}>
                            <div className={'col-4'}><button className={'btn btn-primary'} >Advertising mailing</button></div>
                            <div className={'col'}>Disabled</div>
                        </div>
                        <div className={'row settings_extended-row'}>
                            <div className={'col-4'}><button className={'btn btn-primary'} >Personal suggests</button></div>
                            <div className={'col'}>Disabled</div>
                        </div>
                    </div>
                    <div className={`settings_extended_${displayed.personal}`}>
                        <ChangePersonalData data={props.user}/>
                    </div>
                <div className={`row settings_extended_${displayed.information}`}>
                    <div className='col-4'>
                        <div className={'settings_extended-huge_image'}><AccountImage/></div>
                    </div>
                    <div className='col-8'>
                        {<RenderPersonalData data={props.user}/>}
                    </div>
                </div>
                      {selectedElement&&selectedElement?.dataset?.selected!=='remove'?<button className={'btn btn-success settings_extended-save_button'}>Save changes</button>:null }
                    </div>

        )
};

const mapStateToProps=({user})=>{return{user};};
export default Wrapper()(connect(mapStateToProps,null)(AccountSettings))

