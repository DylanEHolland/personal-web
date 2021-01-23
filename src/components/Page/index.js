import React from 'react';
import {editPage, loadPage} from "../../api";
import './custom.scss';

export default class Page extends React.Component {
    state = {
        data: null,
        editMode: false,
        editText: "",
    }

    componentDidMount() {
        let pageUrl = this.props.match.params.pageUrl;

        loadPage(pageUrl).then(
            data => {
                log(data)
                this.setState({
                    data: data.results
                });
            }
        )
    }

    render = () => {
        if(!this.state.data) {
            return null;
        }

        return (
            <div>
                <b>{this.state.data.title}</b>
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
                                />
                            </div>
                            <div onClick={this.submitEdit}>SUBMIT</div>
                        </>
                    ) : (
                        <>
                            <div>
                                {this.state.data.content}
                            </div>
                            <div onClick={this.toggleEditMode}>EDIT</div>
                        </>
                    )
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