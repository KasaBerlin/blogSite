import React from "react";
import { withRouter } from "react-router-dom";

const ShowSinglePost = props => {
  // create a ref Object, access with current
  const userInput = React.createRef();
  const titleInput = React.createRef();
  const commentInput = React.createRef();
  // console.log(userInput);
  const handleSubmit = e => {
    e.preventDefault();
    const user = userInput.current.value.trim();
    const title = titleInput.current.value.trim();
    const comment = commentInput.current.value.trim();
    props.addPost(user, title, comment);
    e.currentTarget.reset();

    props.history.push("/showallposts");
  };

  // When a ref is passed to an element in render,
  // a reference to the node becomes accessible at the current attribute of the ref.

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          ref={userInput}
          /* call the ref with the 'ref' attribute */ required
        ></input>
        <br />
        <label>Title:</label>{" "}
        <input type="text" ref={titleInput} required></input>
        <br />
        <label>Content:</label>
        <textarea rows="5" cols="90" ref={commentInput} required></textarea>
        <br />
        <button type="submit">
          <i className="fas fa-envelope-open-text"></i>
        </button>
        <br />
      </form>
    </div>
  );
};

export default withRouter(ShowSinglePost);
