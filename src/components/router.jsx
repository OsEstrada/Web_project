import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {history} from '../utils/userStorage/history';
import alertActions from '../actions/alert.actions';
import { PrivateRoute } from './login/privateroute';
import { signin } from './login/SignIn';
import { signup } from './login/SignUp';
import {Home} from './Layouts/Home';

class App extends React.Component {
	constructor(props) {
		super(props);

		history.listen((location, action) => {
			// clear alert on location change
			this.props.clearAlerts();
		});
	}

	render() {
		const { alert } = this.props;
		return (
			<div className="col-sm-8 col-sm-offset-2">
				{alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
				<Router history={history}>
					<Switch>
						<PrivateRoute exact path="/Home" component={Home} />
						<Route path="/SignIn" exact component={signin} />
						<Route path="/SignUp" exact component={signup} />
					</Switch>
				</Router>
			</div>
		);
	}
}

function mapState(state) {
	const { alert } = state;
	return { alert };
}

const actionCreators = {
	clearAlerts: alertActions.clear
};

const ConnectedApp = connect(mapState, actionCreators)(App);
export default ConnectedApp;
