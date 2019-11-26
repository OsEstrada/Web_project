import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../utils/userStorage/history';
import { PrivateRoute } from './login/privateroute';
import { signin } from './login/SignIn';
import { signup } from './login/SignUp';
import { Home } from './Layouts/Home';
import Agent from './LayoutsSupport/Agent';
import Admin from './LayoutsAdmin/index';

class App extends React.Component {
	render() {
		return (
			<div>
				<Router history={history}>
					<Switch>
						<PrivateRoute exact path="/Home" component={Home} />
						<Route path="/SignIn" exact component={signin} />
						<Route path="/SignUp" exact component={signup} />
						<PrivateRoute exact path="/Home/Support" component={Agent} />
						<PrivateRoute exact path="/Home/Admin" component={Admin} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
