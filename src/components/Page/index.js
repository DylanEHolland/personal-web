import React from 'react';
import {editPage, loadPage} from "../../api";
import './custom.scss';
import ReactMarkdown from 'react-markdown'
import store from 'store';

import ImageUploader from "../ImageUploader";

export default class Page extends React.Component {
    state = {
        data: null,
        editMode: false,
        editText: "",
        pageUrl: null,
        uploadedImages: null
    }

    componentDidMount() {
        let pageUrl = this.props.match.params.pageUrl;

        loadPage(pageUrl).then(
            data => {
                this.setState({
                    data: data.results,
                    uploadedImages: data.images,
                    pageUrl: pageUrl
                }, () => log("Page loaded successfully"));
            }
        )
    }

    render = () => {
        let token = store.get('token');

        if(!this.state.data) {
            return null;
        }

        return (
            <div className="page">
                <h1>{this.state.data.title}</h1>
                {
                    (this.state.editMode)
                    ? (
                        <>
                            <div>
                                <textarea
                                    onChange={
                                        e => {
                                            this.setState({
                                                editText: e.target.value
                                            });
                                        }
                                    }
                                    value={this.state.editText}
                                    className="edit__box"
                                />
                            </div>
                            <div className="submit__button" onClick={this.submitEdit}>SUBMIT</div>
                        </>
                    ) : (
                        <>
                            <div>
                                <ReactMarkdown>
                                    {this.state.data.content}
                                </ReactMarkdown>
                            </div>
                            {token && (<div className="submit__button" onClick={this.toggleEditMode}>EDIT</div>)}
                        </>
                    )
                }
                {
                    (this.state.editMode) && 
                        <ImageUploader 
                            page={this.state.pageUrl}
                            images={this.state.uploadedImages}
                        />
                }
            </div>
        )
    }

    submitEdit = () => {
        editPage(this.state.editText, this.state.data.url)
        .then(
            data => {
                this.setState({
                    data: data.results
                }, () => {
                    this.setState({
                        editMode: false
                    })
                });
            }
        )
    }

    toggleEditMode = () => {
        this.setState({
            editText: this.state.data.content,
            editMode: true
        });
    }
}

const log = (...msg) => {
    console.log("[Page]", ...msg);
}