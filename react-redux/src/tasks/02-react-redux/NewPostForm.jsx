import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewPost } from "./actions";

// Define a function to map state to props
const mapStateToProps = (state) => ({
    authors: state.authors,
});

// Define a function to map dispatch to props
const mapDispatchToProps = {
    addNewPost,
};

class NewPostForm extends Component {
  state = {
      title: "",
      selectedAuthor: null,
  };

  onSelectedAuthorChanged = (e) => {
      const { value } = e.target;
      this.setState({ selectedAuthor: value || null });
  };

  onPostTitleChanged = (e) => {
      const { value } = e.target;
      this.setState({ title: value });
  };

  onAddNewPostClicked = () => {
      const { title, selectedAuthor } = this.state;
      const { addNewPost } = this.props;

      if (selectedAuthor && title.trim() !== "") {
          addNewPost(selectedAuthor, title);
          this.setState({ title: "" });
      }
  };

  render() {
      const { title, selectedAuthor } = this.state;
      const { authors = [] } = this.props; // Default to empty array

      const authorsOptions = authors.map((author) => (
          <option key={author.authorId} value={author.authorId}>
              {author.name}
          </option>
      ));
      authorsOptions.unshift(<option key="empty" value="" />);

      return (
          <div>
              <h4>New Post</h4>
              <input type="text" onChange={this.onPostTitleChanged} value={title} />
              <div>
                  Author:{" "}
                  <select
                      value={selectedAuthor || ""}
                      onChange={this.onSelectedAuthorChanged}
                  >
                      {authorsOptions}
                  </select>
              </div>
              <div>
                  <button onClick={this.onAddNewPostClicked}>Add New Post</button>
              </div>
          </div>
      );
  }
}


// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);
