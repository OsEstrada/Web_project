import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import classes from './styles.module.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import userActions from '../../actions/user.actions';

class signup extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
	}
	
	reset() {
        this.setState({
            user: {
                firstname: '',
                lastname: '',
                email: '',
                password: ''
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.state;
        if (user.firstname && user.lastname && user.email && user.password) {
            this.props.register(user);
        }
    }

	render() {
		const { registering  } = this.props;
		const { user} = this.state;
		
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper_signup}>
					<Avatar>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5" className={classes.typography}>
						Registrate
					</Typography>
					<hr />
					<ValidatorForm className={classes.form} onSubmit={this.reset}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextValidator
									autoComplete="fname"
									name="firstname"
									variant="outlined"
									required
									fullWidth
									label="Nombre"
									value={user.firstname}
									onChange={this.handleChange}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextValidator
									variant="outlined"
									required
									fullWidth
									label="Apellido"
									name="lastname"
									autoComplete="lname"
									value={user.lastname}
									onChange={this.handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextValidator
									variant="outlined"
									fullWidth
									label="Correo Electrónico"
									name="email"
									value={user.email}
									onChange={this.handleChange}
									validators={['required', 'isEmail']}
									errorMessages={['this field is required', 'email is not valid']}
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
									value={user.password}
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
								Registrarse
							</Button>
							{registering}
						</div>
						<Grid container justify="flex-end">
							<Grid item>
								<Link to="/SignIn" variant="body2" className={classes.links}>
									¿Ya tienes una cuenta? Inicia sesión
								</Link>
							</Grid>
						</Grid>
					</ValidatorForm>
				</div>
			</Container>
		);
	}
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(signup);
export { connectedRegisterPage as signup };