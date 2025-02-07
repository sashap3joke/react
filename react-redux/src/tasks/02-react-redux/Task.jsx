import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import PostsList from "./PostsList";
import NewPostForm from "./NewPostForm";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

// Sample markdown content for rendering
const markdown = `
# Blog App

This is a blog app to manage posts and authors.

## Features
- View posts
- Add new posts
`;

export default class ReactReduxTask extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <h3>React-Redux</h3>
                    <PostsList />
                    <NewPostForm />
                    <ReactMarkdown remarkPlugins={[gfm]} children={markdown} />
                </div>
            </Provider>
        );
    }
}
