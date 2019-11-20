import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import classes from './styles.module.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Container from '@material-ui/core/Container';
import API from '../../utils/apiUrlBase';

export default class signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		};
	}

  reset = () => {
    this.setState({
      firstName: '',
			lastName: '',
			email: '',
			password: ''
    });
  }

	handleSubmit = () => {
		let options = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Accept: 'application/json'
			},

			body: JSON.stringify(this.state)
		};

		fetch(`${API.baseURL}/users/create`, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);

				this.setState({
					firstName: this.state.concat(data.firstName),
					lastName: this.state.concat(data.lastName),
					email: this.state.concat(data.email),
					password: this.state.concat(data.password)
				});
			})
			.catch((err) => console.log('Ocurrio un error en la conexion'));
	};

	handleChange = (e) => {
		let returnValue = {
			[e.target.name]: e.target.value
		};
		this.setState(returnValue);
	};

	render() {
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper_signup}>
					<Avatar>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5" className={classes.typography}>
						Sign up
					</Typography>
					<hr />
					<ValidatorForm className={classes.form} onSubmit={this.reset} >
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextValidator
									autoComplete="fname"
									name="firstName"
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="Nombres"
									value={this.state.firstName}
									onChange={this.handleChange}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextValidator
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Apellidos"
									name="lastName"
									autoComplete="lname"
									value={this.state.lastName}
									onChange={this.handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextValidator
									variant="outlined"
									fullWidth
									label="Correo Electrónico"
									name="email"
                  value={this.state.email}
									onChange={this.handleChange}
									validators={[ 'required', 'isEmail' ]}
									errorMessages={[ 'this field is required', 'email is not valid' ]}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextValidator
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Contraseña"
									type="password"
									id="password"
									value={this.state.password}
									onChange={this.handleChange}
									autoComplete="current-password"
								/>
							</Grid>
						</Grid>
						<div className={classes.submit}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className="submit_btn"
                onClick={this.handleSubmit}
							>
								Sign Up
							</Button>
						</div>
						<Grid container justify="flex-end">
							<Grid item>
								<Link to="/Sign-In" variant="body2" className={classes.links}>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</ValidatorForm>
				</div>
			</Container>
		);
	}
}
