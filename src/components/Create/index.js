import React from 'react';
import {createPage} from '../../api';

import './custom.scss';

export default class Create extends React.Component {
    state = {
        title: "",
        url: "",
        body: ""
    }

    action = () => {
        createPage(this.state.title, this.state.body)
        .then(
            data => {
                window.location.href = "/page/" + data.url;
            }
        )
    }

    render = () => {
        return (
            <>
                <div className="create__form">
                    <a href="/">back</a>
                    <div className="title__wrapper">
                        <input 
                            className="title"
                            type="text"
                            value={this.state.title}
                            placeholder="title"
                            onChange={
                                e => {
                                    this.setState({
                                        title: e.target.value
                                    });
                                }
                            }
                        />
                    </div>
                    <textarea 
                        className="content_editor"
                        placeholder="# Add content here..."
                        value={this.state.body}
                        onChange={
                            e => {
                                this.setState({
                                    body: e.target.value
                                });
                            }
                        }
                    />
                    <div className={`submit__btn ${
                        (this.state.body.length === 0) 
                            ? "submit__btn--inactive"
                            : ""
                    }`} onClick={
                        () => {
                            if(this.state.body.length > 0) {
                                this.action();
                            }
                        }
                    }>Submit</div>
                </div>
            </>
        )
    }
}

const log = (...msg) => {
    console.log("[Create]", ...msg);
}