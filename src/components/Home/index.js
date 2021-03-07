import React from 'react';
import store from 'store';
import {
    allPages,
    requestLinkedinTokenUrl
} from '../../api';

import './custom.scss';

export default class Home extends React.Component {
    state = {
        pages: null,
        linkedin_redirect_url: null
    };

    componentDidMount() {
        allPages()
        .then(
            data => {
                this.setState({
                    pages: data.pages
                }, () => log("Loaded page list"))
            }
        )

        requestLinkedinTokenUrl()
        .then(
            data => {
                this.setState({
                    linkedin_redirect_url: data.redirect_url
                });
            }
        )
    }

    displayPageLink = (data, idx) => {
        return (
            <div key={idx}>
                <a href={`/page/${data.url}`}>{data.title}</a>
            </div>
        );
    }

    render = () => {
        let {
            pages,
            linkedin_redirect_url
        } = this.state;

        let token = store.get('token');

        if(!pages) {
            return null;
        }
        
        return (
            <div className="home">
                
                {
                    ( (token === undefined) && linkedin_redirect_url) ? 
                        <a href={linkedin_redirect_url}>Login with linkedin</a>
                        : <a href="/logout">logout</a>
                }

                {this.state.pages.map(
                    (data, idx) => this.displayPageLink(data, idx)
                )}
                {token && (
                    <div className="create__entry"><a href="/create">Create new entry</a></div>
                )}
            </div>
        );
    }
}

const log = (...msg) => {
    console.log("[Home]", ...msg);
}