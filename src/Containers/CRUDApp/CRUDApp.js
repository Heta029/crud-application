import React,{Component} from 'react';
import axios from 'axios';
import Table from '../../Components/Table/Table';
import Header from '../../Components/TableHeader/TableHeader';
import classes from "./CRUDApp.css";
import AddColumn from '../../Components/AddColumn/AddColumn';
import ReactPaginate from 'react-paginate';
import Pagination from '../../Pagination/Pagination'
import json2csv from "json2csv";
import { CSVLink, CSVDownload } from "react-csv";
import { getUser, removeUserSession } from '../../Utils/Common';

class CRUDApp extends Component{
    constructor(props) {
        super(props);
        this.state = {            
                posts:[],        
                addColumn:false,
                addText:'',
                offset: 0,        
                perPage: 8,
                currentPage: 0 ,
                user:getUser()
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);       
    }
    

    receivedData =()=> {
        axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)               
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),                   
                    posts:slice
                })
            });
    }


    componentDidMount=()=>{
        this.receivedData();      
    }

    onSort=(sortType,sortKey)=>{
    
        const data = this.state.posts;
        data.sort((a,b) =>sortType=='ASC'?a[sortKey].localeCompare(b[sortKey]):b[sortKey].localeCompare(a[sortKey]));      
        this.setState({data});
    }

    onSortID=(sortType,sortKey)=>{
        const data = this.state.posts;
        data.sort((a,b)=> sortType == 'ASC'?a[sortKey] - b[sortKey]:b[sortKey] - a[sortKey]);
        this.setState({data});
    }

    hideHandler=()=>{
        let postsCopy = JSON.parse(JSON.stringify(this.state.posts));
        postsCopy.hidden = true;              
        this.setState({
           posts:postsCopy,
           addColumn:true
         }) 
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    updateInputValue=(evt)=> {
        this.setState({
         perPage: evt.target.value,         
         });         
         
    };

    updateState=(text)=>{
        console.log(text);
        this.setState({perPage:text},() => {
            this.receivedData()
        });
    }
 
    handleLogout = () => {       
        removeUserSession();
        this.props.history.push('/');
    }

    render(){

        const posts = this.state.posts.map(post => {
            return <Table key={post.title} usersUserId={post.userId} usersTitle={post.title} usersContent={post.body}/>
        });
        
        const user = getUser();
        return(
            <div> 
                <div>
                  <strong style={{ color: 'green' }}>Welcome {user.value}!</strong>
                   <input type="button" onClick={this.handleLogout} value="Logout" style={{float:"right"}} />
                </div>
                <Pagination update={this.updateState} />                                                    
               {this.state.addColumn?<AddColumn/>:null}
               <table>                  
                    <tbody>  
                        <Header onSort={this.onSort} onSortID={this.onSortID} hide={this.hideHandler}/>          
                    {posts}
                    </tbody>                   
                </table>                  
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={classes.pagination}
                    subContainerClassName={"pages pagination"}
                    activeClassName={classes.active} 
                    />
            </div>                                          
        );
    }
}

export default CRUDApp;