import React from 'react';
import {testCall} from "./api";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from "./components/Home";
import Page from "./components/Page";
import Create from "./components/Create";

import './custom.scss';

export default class App extends React.Component {
	state = {
		connection: null
	}

	componentDidMount() {
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
			return null;
		}

		return (
			<div className="main__frame">
				{this.state.connection ? (
					<Router>
					<Route path="/" component={Home} exact />
					<Route path="/page/:pageUrl" component={Page} />
					<Route path="/create" component={Create} />
				</Router>
				) : <>Error connecting to backend</>}
			</div>
		);
	}
}

const log = (...msg) => {
	console.log("[App]", ...msg);
}