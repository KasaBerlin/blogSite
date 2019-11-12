import React from "react";
import PropTypes from "prop-types";
import Sorting from "./Sorting";

const ShowAllPosts = props => {
  // filterBlog = () => ();
  return (
    <div>
      <Sorting></Sorting>
      {Object.keys(props.items)
        .sort((a, b) => a.uuid > b.uuid)
        .map((uuid, i) => {
          uuid = props.items[uuid].uuid;
          return (
            <div className="post">
              <p className="title">
                {" "}
                <span style={titleStyle}>{props.items[uuid].title}</span>{" "}
              </p>
              <button
                className="read"
                onClick={props.handleClick.bind(this, uuid)}
              >
                open...
              </button>
              {props.items[uuid].showing ? (
                <p className="comment">{props.items[uuid].comment}</p>
              ) : null}
              <p className="userdate">
                <span style={usernameStyle}>{props.items[uuid].user}</span>{" "}
                <span style={dateStyle}>{props.items[uuid].date}</span>{" "}
                <button
                  className="remove"
                  onClick={props.removePost.bind(this, uuid)}
                >
                  remove
                </button>
              </p>
            </div>
          );
        })}
    </div>
  );
};

// PropTypes
ShowAllPosts.propTypes = {
  items: PropTypes.object.isRequired
};

//Styles
const titleStyle = {
  borderRight: "1px solid rgba(255, 0, 180, 0.5)",
  paddingRight: "3px"
};

const usernameStyle = {
  color: "salmon",
  textTransform: "uppercase",
  textDecorationLine: "overline"
};
const dateStyle = {
  color: "rgba(248, 148, 6, 1)",
  borderLeft: "1px solid tomato",
  paddingLeft: "3px"
};

export default ShowAllPosts;
