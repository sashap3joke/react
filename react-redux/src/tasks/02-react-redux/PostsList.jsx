import React, { Component } from "react";
import { connect } from "react-redux";

// Define a function to map state to props
const mapStateToProps = (state) => ({
    posts: state.posts,
    authors: state.authors,
});

class PostsList extends Component {
    render() {
        const { posts, authors } = this.props;

        const renderedPosts = posts.map((post) => {
            const author = authors.find(
                (author) => author.authorId === post.authorId
            ) || { name: "Unknown" };
            const { name } = author;

            return (
                <li key={post.id}>
                    {post.title}, by {name}
                </li>
            );
        });

        return (
            <div>
                <h4>Posts</h4>
                <ul>{renderedPosts}</ul>
            </div>
        );
    }
}

// Connect the component to Redux
export default connect(mapStateToProps)(PostsList);
