import React from "react";
import "./App.css";
import uuid from "uuid/v4";

import Home from "./components/Home";
import ShowSinglePost from "./components/ShowSinglePost";
import ShowAllPosts from "./components/ShowAllPosts";

import { Route, Switch, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
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
  componentDidUpdate() {
    this.savePost(this.storageKey, JSON.stringify(this.state));
  }

  savePost(key, value) {
    localStorage.setItem(key, value);
  }

  getPost = (key, defaultValue = null) => {
    const value = localStorage.getItem(key);
    return value != null ? value : defaultValue;
  };

  addPost = (user, title, comment) => {
    const post = {
      uuid: uuid(),
      user: user,
      title: title,
      comment: comment,
      date: new Date().toLocaleString(),
      showing: false
    };
    this.setState(state => {
      state.postList[post.uuid] = post;
      return state;
    });
  };

  removePost = uuid => {
    this.setState(state => {
      delete state.postList[uuid];
      return state;
    });
  };

  addH2AndSort = () =>
    this.props.history.location.pathname === "/showallposts" ? (
      <h2 className="hello">Good morning Developers!</h2>
    ) : null;

  emptyPostList = () =>
    Object.keys(this.state.postList).length === 0 ? (
      <h2 className="nopost">No posts yet!</h2>
    ) : (
      <ShowAllPosts
        items={this.state.postList}
        handleClick={this.handleClick}
        removePost={this.removePost}
        isAuthed={true}
      />
    );

  handleClick = uuid => {
    this.setState(state => {
      state.postList[uuid].showing = !state.postList[uuid].showing;
      return state;
    });
  };

  render() {
    console.log(this.props.history.location.pathname);
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create A Post</Link>
            <Link to="/showallposts">Show Current Post</Link>
            {this.addH2AndSort()}
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
              render={props => this.emptyPostList()}
            ></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
