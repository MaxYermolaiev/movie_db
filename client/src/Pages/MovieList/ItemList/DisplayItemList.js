import React,{Component} from "react";
import {Loading,ErrorPage} from "../../index";


let DisplayItems = (View) => {
    //receive item to view component from a fork and render with data in class-DisplayItems
    return class DisplayItems extends Component {
        //state proclaim
        state = {
            data: null,
            error:false,
            loading:false,
            current_page:1,
            total_page:null,
            search:null
        };
        getParamsPage=()=>{
        //retrieve parameters from url and return them to make correct request
            let page=this.props.match.params.page;
            let search=this.props.match.params.id;
            return {page,search}
        }
        componentDidMount() {
            //depend on from params fetch with required params
            let {page,search} = this.getParamsPage();
            this.setState({loading: true, search: search,current_page:page});
            if(search!=="undefined"){
                this.fetchData(page, search)
            }else{
                this.fetchData(page);
            }
        }
        componentDidUpdate(prevProps, prevState) {
           //Componnent depend 0n get data from props and state current page so put it in dependecies for update
             if(this.state.current_page!==prevState.current_page||this.props.getData!==prevProps.getData||this.props.match.params.id!==prevProps.match.params.id){
                 this.setState((state)=>({loading:true,search:this.props.match.params.id}));
                 if(this.state.search!=="undefined"){
                     this.fetchData(this.state.current_page,this.state.search);
                 }else{
                     this.fetchData(this.state.current_page);
                 }
             }
        }
        //function for data fetch and state tune
        fetchData(page,search){
                this.props.getData(page,search)
                    .then((data)=>{
                        this.setState(()=>({
                        data: data.results,
                        error:false,
                        loading:false,
                        current_page:data.page,
                        total_page:data.total_pages
                    }))
                }).catch(error=> this.setState({
                    data: null,
                    error:true,
                    loading:false,
                    current_page:null,
                    total_page:null
                }));
        }
        //function transmitted to pagination for switching lists
        itteractingWithPage = (item) =>{
            this.setState((state)=>({current_page:item}));
        }
        render() {
            //destruct required data to render and transmit to component
            let {error,data,current_page,total_page} = this.state;
            if (error) return <ErrorPage/>
            if (!data) return <Loading/>
            return (<View
                data={data}
                current_page={current_page}
                total_page={total_page}
                itteractingWithPage={this.itteractingWithPage}
                   />)
        }
    }
}

export default DisplayItems;