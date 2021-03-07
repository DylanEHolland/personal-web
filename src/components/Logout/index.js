import React from 'react';
import store from 'store';

export default class Logout extends React.Component {
    componentDidMount() {
        store.remove("token");
        window.location.href = '/';
    }

    render = () => {
        return null;
    }
}