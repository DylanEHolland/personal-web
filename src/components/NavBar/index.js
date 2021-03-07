import React from 'react';
import './custom.scss';

import store from 'store';

import {
    requestLinkedinTokenUrl
} from "../../api";

export default class NavBar extends React.Component {
    state = {
        width: window.innerWidth,
        linkedin_redirect_url: null
    }


    UNSAFE_componentWillMount() {
        window.addEventListener("resize", this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    componentDidMount() {
        requestLinkedinTokenUrl()
        .then(
            data => {
                this.setState({
                    linkedin_redirect_url: data.redirect_url
                });
            }
        )
    }

    render = () => {
        let token = store.get('token');
        let {linkedin_redirect_url} = this.state;

        return (
            <div className="nav__bar">
                <div 
                    className="title"
                    onClick={
                        () => {
                            window.location.href = "/";
                        }
                    }
                >PoetheProgrammer</div>
                <div className="login__action">
                    {
                        token 
                        ? <a href="/logout">Logout</a>
                        : linkedin_redirect_url && (
                            <a href={linkedin_redirect_url}>
                                {
                                    (this.state.width > 768) 
                                        ? "Login with LinkedIn" 
                                        : "Login" 
                                }
                            </a>

                        )
                    }
                </div>
            </div>
        );
    }
}