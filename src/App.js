import React from 'react';
import {testCall} from "./api";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import store from 'store';

import Home from "./components/Home";
import Page from "./components/Page";
import Create from "./components/Create";
import LinkedInVerifier from "./components/LinkedInVerifier";
import Logout from "./components/Logout";

import './custom.scss';

export default class App extends React.Component {
	state = {
		connection: null
	}

	componentDidMount() {
		log(store.get("token"));
		testCall()
		.then(
			data => {
				let output = false;
				if(data === "1") {
					output = true;
				}

				this.setState({
					connection: output
				});
			}
		)
	}

	render = () => {
		if(this.state.connection === null) {
			return <>Error connecting to backend</>;
		}

		return (
			<div className="main__frame">
				{this.state.connection ? (
					<Router>
					<Route path="/" component={Home} exact />
					<Route path="/page/:pageUrl" component={Page} />
					<Route path="/create" component={Create} />
					<Route path="/auth/linkedin-callback" component={LinkedInVerifier} />
					<Route path="/logout" component={Logout} />
				</Router>
				) : <>Error connecting to backend</>}
			</div>
		);
	}
}

const log = (...msg) => {
	console.log("[App]", ...msg);
}