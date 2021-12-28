import React, { Component } from 'react';
import {withRouter} from "react-router";
import {Buttons, ErrorPage, Loading} from "../../index";
import ItemCardDetails from "../MovieCards/ItemCardDetails";
import RecomendationCard from "../MovieCards/RecomendationCard";

class ErrorBoundary extends Component {
    state = {ErrorExist: false}
    componentDidCatch(error, errorInfo) {this.setState({ErrorExist: !this.state.ErrorExist})}
    render() {
        if (this.state.ErrorExist) {return <ErrorPage/>}
        return this.props.children;
    }
}

 class MovieDetails extends Component {
     state={id:null, recommendations:null,data:null, loading:false, error:false};
     componentDidMount(){
         let id = this.getId();
         this.setState({id:id,data:null,loading:true,error:false});
         this.fetchData(id);
     }
     //mounting and fetch data depend on request type
     componentDidUpdate(prevProps, prevState, snapshot) {
         if(this.props.match.params.id!==prevProps.match.params.id){
             this.fetchData(this.props.match.params.id);
         }}

     componentDidCatch(error, errorInfo) {this.setState({error:!this.state.error})}

     onError=(err)=>{this.setState({...this.state, error:err})}
     getId=()=>{return this.props.match.params.id}
     fetchData=(id)=>{
         let urls = [this.props.getData(id),this.props.getRecommendations(id)];
         Promise.all(urls)
             .then(results=>{
                 results.forEach((item,index)=>{
                     if(index===0) {
                         item.backdrop_path=this.props.getImage(item.poster_path);
                         this.setState({data:item});
                     }
                     if(index===1) {
                         item.results.forEach((el=>{
                             this.setState({recommendations:item,loading:false});
                         }))
                     }
                 })
             })
             .catch((err)=> this.onError(err))
     }
      render(){
        if (!this.state.data){return <Loading/>}
        if (this.state.error){return <ErrorPage/>}
        if (this.state.loading||!this.state.data){return <Loading/>}
        const {data,recommendations} = this.state;
        return (
            <div className="container-fluid">
                <ErrorBoundary>
                <ItemCardDetails data={data}/>
                <Buttons movie_id={data.id} movie_data={data}/>
                    <div className="container-fluid">
                        <h3 className={"fw-bold"}>The Same movie</h3>
                        <RecomendationCard recommendations={recommendations} getImage={this.props.getImage}/>
                    </div>
                </ErrorBoundary>
            </div>
        )
    }
}
export default withRouter(MovieDetails);
