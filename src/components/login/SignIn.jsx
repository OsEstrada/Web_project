import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import alertActions from '../../actions/alert.actions';
import { history } from '../../utils/userStorage/history';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import classes from './styles.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import userActions from '../../actions/user.actions';

class signin extends React.Component {
	constructor(props) {
		super(props);

		history.listen((location, action) => {
			// clear alert on location change
			this.props.clearAlerts();
		});

		// reset login status
		this.props.logout();

		this.state = {
			email: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		const { email, password } = this.state;
		if (email && password) {
			this.props.login(email, password);
		}
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleChange = (e) => {
		let returnValue = {
			[e.target.name]: e.target.value
		};
		this.setState(returnValue);
	};

	render() {
		const { loggingIn, alert } = this.props;
		const { email, password } = this.state;

		return (
			<Grid container component="main" className={classes.body}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<div className={classes.paper_signin}>
						<Avatar>
							<FontAwesomeIcon icon={faUserLock} />
						</Avatar>
						<Typography component="h1" variant="h5" className={classes.Typography}>
							Sign in
						</Typography>

						<div className="col-sm-8 col-sm-offset-2">
							{alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
							<ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
								<TextValidator
									variant="outlined"
									autoFocus
									fullWidth
									label="Correo Electrónico"
									name="email"
									value={email}
									onChange={this.handleChange}
									validators={[ 'required', 'isEmail' ]}
									errorMessages={[ 'this field is required', 'email is not valid' ]}
								/>
								<TextValidator
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Contraseña"
									type="password"
									id="password"
									value={password}
									onChange={this.handleChange}
									autoComplete="current-password"
								/>
								<FormControlLabel
									control={<Checkbox value="remember" color="primary" />}
									label="Remember me"
								/>
								<div className={classes.submit}>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className="submit_btn"
									>
										Sign In
									</Button>
									{loggingIn}
								</div>
								<Grid container justify="flex-end">
									<Grid item>
										<Link to="/SignUp" variant="body2" className={classes.links}>
											Don't have an account? Sign Up
										</Link>
									</Grid>
								</Grid>
							</ValidatorForm>
						</div>
					</div>
				</Grid>
			</Grid>
		);
	}
}

function mapState(state) {
	const { alert } = state;
	const { loggingIn } = state.authentication;
	return { loggingIn, alert };
}

const actionCreators = {
	clearAlerts: alertActions.clear,
	login: userActions.login,
	logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(signin);
export { connectedLoginPage as signin };
