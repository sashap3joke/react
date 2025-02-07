import React, {Component} from "react";
import store from "./store";
import {addNewPost} from "./actions";

export default class NewPostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            selectedAuthor: null,
            authors: [],
        };

        // Initialize state with store values
        this.state.authors = store.getState().authors;
    }

    onSelectedAuthorChanged = (e) => {
        const {value} = e.target;
        this.setState({selectedAuthor: value || null});
    }

    onPostTitleChanged = (e) => {
        const {value} = e.target;
        this.setState({title: value});
    }

    onAddNewPostClicked = () => {
        const {title, selectedAuthor} = this.state;

        if (selectedAuthor && title.trim() !== "") {
            // Dispatch action to add a new post
            store.dispatch(addNewPost(selectedAuthor, title));
            // Clear the title field
            this.setState({title: ""});
        }
    }

    render() {
        const {title, selectedAuthor, authors} = this.state;

        const authorsOptions = authors.map(author => (
            <option key={author.authorId} value={author.authorId}>{author.name}</option>
        ));
        // Add an empty selection option
        authorsOptions.unshift(<option key="empty" value="" />);

        return (
            <div>
                <h4>New Post</h4>
                <input type="text" onChange={this.onPostTitleChanged} value={title} />
                <div>Author: <select data-testid="author-select" value={selectedAuthor || ''} onChange={this.onSelectedAuthorChanged}>{authorsOptions}</select></div>
                <div><button data-testid="post-submit" onClick={this.onAddNewPostClicked}>Add New Post</button></div>
            </div>
        )
    }
}
