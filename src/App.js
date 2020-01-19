import React from "react";
import { Route, Switch, Link, Redirect, withRouter } from "react-router-dom";

import uuid from "uuid/v4";

import "./App.css";
import Home from "./components/Home";
import ShowSinglePost from "./components/ShowSinglePost";
import ShowAllPosts from "./components/ShowAllPosts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.storageKey = "blogpost-list";
    const posted = this.getPost(this.storageKey);
    posted
      ? (this.state = JSON.parse(posted))
      : (this.state = {
          postList: {}
        });
  }

  addPost = (user, title, comment) => {
    const post = {
      uuid: uuid(),
      user: user,
      title: title,
      comment: comment,
      date: new Date().toLocaleString('en-GB'),
      showing:false
    };
    this.setState(state => {
      state.postList[post.uuid] = post;
    });
  };
  
// local storage only handles string key/value pairs
  componentDidUpdate() {
    //savePost (key,value)
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
  }

  getPost = (key, defaultValue = null) => {
    const value = localStorage.getItem(key);
    return value != null ? value : defaultValue;
  };

  removePost = uuid => {
    this.setState(state => {
      delete state.postList[uuid];
      return state;
    });
  };

  openPost = uuid => {
    this.setState(state => {
      state.postList[uuid].showing = !state.postList[uuid].showing;
      return state;
      });
    };

  emptyPostList = () =>{
    return Object.keys(this.state.postList).length === 0 ? (
      <h2 className="nopost">No posts yet!</h2>
      ) : (
        <ShowAllPosts
        items={this.state.postList}
        openPost={this.openPost}
        removePost={this.removePost}
        isAuthed={true}
        />
        )};
               
  addWelcome = () =>
    this.props.history.location.pathname === "/showallposts" ? (
    <h2 className="hello">Good morning Developers!</h2>
    ) : null;

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create A Post</Link>
            <Link to="/showallposts">Show Current Post</Link>
            {this.addWelcome()}
          </nav>
        </header>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route
              path="/create"
              render={props => (
                <ShowSinglePost addPost={this.addPost} isAuthed={true} />
                )}
            ></Route>
            <Route
              path="/showallposts"
              // function will be called when the location matches
              render={props => this.emptyPostList()}
            ></Route>
                <Redirect to='/'/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
