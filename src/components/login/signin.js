import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import API from '../../utils/apiUrlBase';
import classes from './styles.module.css';
import {Redirect, Route} from 'react-router-dom'

export default class signin extends React.Component{
  constructor(props) {
		super(props);
		this.state = {
			email: '',
      password: '',
      islogged: false
    };
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

		fetch(`${API.baseURL}/users/signin`, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
        console.log(data.success);
        if(data.success===true) {this.setState({islogged:!this.islogged})}
        else{
          this.setState({
					email: '',
					password: ''
        })}
			})
			.catch((err) => console.log(err));
	};
  
  handleChange = (e) => {
		let returnValue = {
			[e.target.name]: e.target.value
		};
		this.setState(returnValue);
  };
  
    render(){
        return(
          <Grid container component="main" className={classes.body}>
          <Route>
              {(this.state.islogged===true) ? <Redirect to="/" /> : <Sign-In/>}
          </Route>
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
              <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
              <TextValidator
									variant="outlined"
                  autoFocus
									fullWidth
									label="Correo Electrónico"
									name="email"
                  value={this.state.email}
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
									value={this.state.password}
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
                </div>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/Sign-Up" variant="body2" className={classes.links}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </div>
          </Grid>
        </Grid>
        );
    }
}