import React from 'react';
import queryString from 'query-string';
import store from 'store';

import {
    linkedInFinalize
} from '../../api';

export default class LinkedInVerifier extends React.Component {
    componentDidMount() {
        let parsed = queryString.parse(this.props.location.search);
        linkedInFinalize(parsed.code)
        .then(
            data => {
                store.set("token", data.access_token);
                store.set("refresh_token", data.refresh_token)
                window.location.href = '/';
            }
        )
    }

    render = () => {
        return null;
    }
}

const log = (...msg) => {
    console.log("[LinkedInVerifier]", ...msg);
}