import React, { Component } from 'react';
import axios from 'axios';
import Table from '../../Components/Table/Table';
import Header from '../../Components/TableHeader/TableHeader';
import classes from "./CRUDApp.css";
import AddColumn from '../../Components/AddColumn/AddColumn';
import ReactPaginate from 'react-paginate';
import Pagination from '../../Pagination/Pagination'
import { CSVLink } from "react-csv";
import { getUser, removeUserSession } from '../../Utils/Common';
import Modal from '../../Components/Modal/Modal'
import AddModal from '../../Components/AddModal/AddModal';

class CRUDApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            addColumn: false,
            addText: '',
            offset: 0,
            perPage: 8,
            currentPage: 0,
            user: getUser(),
            add: false,
            userId: '',
            title: '',
            content: '',
            edit: false,
            body: '',
            User: '',
            Title: '',
            Body: '',
            hiddenUserId: false,
            hiddenTitle: false,
            hiddenBody: false,
            AllData: [],
            filter: JSON.parse(localStorage.getItem('key')) || [],
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
        this.onInputchange = this.onInputchange.bind(this);

    }


    receivedData = () => {
        axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {

                //const data = res.data;
                const data = this.state.filter.length == 0 || this.state.filter.length == undefined ? res.data : this.state.filter;
                const slice = data.slice(this.state.offset, this.state.offset + (Number(this.state.perPage)))
                this.setState({
                    pageCount: Math.ceil(data.length / (Number(this.state.perPage))),
                    posts: slice,
                    AllData: data
                })
            });
    }

    componentDidMount = () => {
        this.receivedData();
    }

    onSort = (sortType, sortKey) => {
        const data = this.state.filter.length == 0 || this.state.filter.length == undefined ? this.state.AllData : this.state.filter;
        data.sort((a, b) => sortType == 'ASC' ? a[sortKey].localeCompare(b[sortKey]) : b[sortKey].localeCompare(a[sortKey]));

        const slice = data.slice(this.state.offset, this.state.offset + (Number(this.state.perPage)))
        this.setState({
            pageCount: Math.ceil(data.length / (Number(this.state.perPage))),
            posts: slice,
        })


    }

    onSortID = (sortType, sortKey) => {
        const data = this.state.filter.length == 0 || this.state.filter.length == undefined ? this.state.AllData : this.state.filter;
        data.sort((a, b) => sortType == 'ASC' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);
        const slice = data.slice(this.state.offset, this.state.offset + (Number(this.state.perPage)))
        this.setState({
            pageCount: Math.ceil(data.length / (Number(this.state.perPage))),
            posts: slice,
        })

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * (Number(this.state.perPage));
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    updateInputValue = (evt) => {
        this.setState({
            perPage: evt.target.value,
        });
    };

    updateState = (text) => {
        console.log(text);
        this.setState({ perPage: text }, () => {
            this.receivedData()
        });
    }

    handleLogout = () => {
        removeUserSession();
        localStorage.clear();
        this.props.history.push('/');
    }

    addHandler = () => {
        this.setState({ add: true, edit: false })
    }

    cancelAddHandler = () => {
        this.setState({ add: false, edit: false });
    }

    EditHandler = (userId, title, content) => {
        this.setState({ add: true, userId: userId, title: title, content: content, edit: true });
    }

    deleteHandler = () => {
        alert("Are you sure you want to delete this record?");
    }

    setFilter = () => {
        if (this.state.Body == '' && this.state.Title == '') {
            this.setState({ filter: [] });
            localStorage.removeItem('key');
            this.receivedData();
            return;
        }
        const body = this.state.Body.toUpperCase();
        const title = this.state.Title.toUpperCase();
        const user = Number(this.state.User);
        const filteredPost = this.state.AllData.filter(e =>
            e.body.toUpperCase().indexOf(body) >= 0 && e.title.toUpperCase().indexOf(title) >= 0
        );

        this.setState({ filter: filteredPost });
        localStorage.setItem('key', JSON.stringify(filteredPost));
        this.receivedData();
    }

    onInputchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    hideHandler = (arg) => {
        //  console.log("hello");
        // this.setState({
        //     hiddenUserId: true
        //   });
        if (arg == 'UserId')
            this.setState({
                hiddenUserId: true
            });
        if (arg == 'Title')
            this.setState({
                hiddenTitle: true
            });
        if (arg == 'Body')
            this.setState({
                hiddenBody: true
            });
    }

    showHandler = (arg) => {

        if (arg == 'UserId')
            this.setState({
                hiddenUserId: false
            });
        if (arg == 'Title')
            this.setState({
                hiddenTitle: false
            });
        if (arg == 'Body')
            this.setState({
                hiddenBody: false
            });
    }

    render() {
        const posts = this.state.posts.map(post => {
            return <Table hiddenBody={this.state.hiddenBody} hiddenTitle={this.state.hiddenTitle} hiddenUserId={this.state.hiddenUserId} key={post.title} usersUserId={post.userId} usersTitle={post.title} usersContent={post.body} delete={this.deleteHandler} EditHandler={this.EditHandler} />
        });

        const user = getUser();
        return (
            <div>
                <Modal show={this.state.add} modalClosed={this.cancelAddHandler}>
                    <AddModal modalClosed={this.cancelAddHandler} title={this.state.title} content={this.state.content} userId={this.state.userId} edit={this.state.edit} />
                </Modal>
                <div>
                    <strong style={{ color: 'green' }}>Welcome {user.value}!</strong>
                    <input type="button" onClick={this.handleLogout} value="Logout" style={{ float: "right" }} />
                </div>
                {/* <label>UserId</label><br/>
                <input 
                name="User"
                type="text"
                value={this.state.User}
                onChange={this.onInputchange} /><br/> */}
                <label>Title</label><br />
                <input
                    name="Title"
                    type="text"
                    value={this.state.Title}
                    onChange={this.onInputchange} /><br />
                <label>Body</label><br />
                <input
                    name="Body"
                    type="text"
                    value={this.state.Body}
                    onChange={this.onInputchange} /> <br />
                <input type="button" onClick={this.setFilter} value="FILTER" />
                <input type="button" onClick={this.addHandler} value="ADD" style={{ float: "right" }} />
                <CSVLink className={classes.btn} data={this.state.filter.length == 0 || this.state.filter.length == undefined ? this.state.AllData : this.state.filter} style={{ float: "right" }}>
                    Download
                </CSVLink>
                <Pagination update={this.updateState} />

                <AddColumn hiddenBody={this.state.hiddenBody} hiddenTitle={this.state.hiddenTitle} hiddenUserId={this.state.hiddenUserId} showHandler={this.showHandler} />
                <div className={classes.ContainerDiv}>
                    <table >
                        <tbody>
                            <Header onSort={this.onSort} onSortID={this.onSortID} hiddenBody={this.state.hiddenBody} hiddenTitle={this.state.hiddenTitle} hiddenUserId={this.state.hiddenUserId} hideHandler={this.hideHandler} />
                            {posts}
                        </tbody>
                    </table>
                </div>


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