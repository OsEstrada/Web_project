import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../utils/userStorage/history';
import { PrivateRoute } from './login/privateroute';
import { signin } from './login/SignIn';
import { signup } from './login/SignUp';
import { Home } from './Layouts/Home';

class App extends React.Component {
	render() {
		return (
			<div>
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

export default App;
