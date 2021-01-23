import React from 'react';
import {createPage} from "../../api";

export default class Create extends React.Component {
    state = {
        title: "",
        url: "",
        body: ""
    }

    action = () => {
        createPage(this.state.title, this.state.url, this.state.body)
        .then(
            data => {
                log(data);
            }
        )
    }

    render = () => {
        return (
            <div className="create__form">
                <div>
                    Title: 
                    <input 
                        type="text"
                        value={this.state.title}
                        onChange={
                            e => {
                                this.setState({
                                    title: e.target.value
                                });
                            }
                        }
                    />
                </div>
                <div>
                    Url: 
                    <input type="text" 
                        value={this.state.url}
                        onChange={
                            e => {
                                this.setState({
                                    url: e.target.value
                                });
                            }
                        }
                    />
                </div>
                <textarea 
                    value={this.state.body}
                    onChange={
                        e => {
                            this.setState({
                                body: e.target.value
                            });
                        }
                    }
                />
                <div onClick={this.action}>Submit</div>
            </div>
        )
    }
}

const log = (...msg) => {
    console.log("[Create}", ...msg);
}