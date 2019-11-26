import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    styledHeader: {
        '& h2': {
          color: '#5a5560',
        }
	},
	buttons: {
		color: '#5a5560'
	}
})

class AddAccount extends React.Component {
	constructor(props) {
		super(props);

		this.options = [ 'Efectivo', 'Débito', 'Ahorro', 'Crédito', 'Corriente', 'De valor' ];

		this.state = {
			user: '',
			name: '',
			type: this.options[0],
			amount: '',
			open: false,
		};

		this.amountRegex = new RegExp('^d{1,3}(,d{3})*(.dd)?$');
	}

	handleClickOpen = () => {
		this.setState({
			open: true
		});
	};

	handleClose = () => {
		this.setState({
			user: '',
			name: '',
			type: this.options[0],
			amount: '',
			open: false
		});
	};

	handleChange = (e) => {
		let returnValue = {
			[e.target.name]: e.target.value
		};
		this.setState(returnValue);
	};

	render() {
		return (
			<div>
				<Box display="flex" paddingRight="4%" paddingTop="1%" justifyContent="flex-end">
					<Fab
						color="inherit"
						aria-label="add"
						style={{ width: '80', height: '80' }}
						onClick={this.handleClickOpen}
					>
						<AddIcon style={{ width: '30', height: '30' }} />
					</Fab>
				</Box>
				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title" className={this.props.classes.styledHeader} >Agregar Cuenta</DialogTitle>
				<DialogContent>	
					<TextField
							autoFocus
							margin="dense"
							name="name"
							label="Nombre cuenta"
							type="text"
							onChange={this.handleChange}
							fullWidth
						/>
						<FormControl style={{ marginTop: '5%', marginBottom: '5%' }} fullWidth>
							<InputLabel>Tipo de Cuenta</InputLabel>
							<Select value={this.state.type} onChange={this.handleChange} name="type">
								{this.options.map((a) => (
									<MenuItem key={a} value={a}>
										{a}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							autoFocus
							margin="dense"
							name="amount"
							value={this.state.amount}
							label="Cantidad de monto"
							type="number"
							onChange={this.handleChange}
							fullWidth
						/>
						
					</DialogContent>
					<DialogActions>
						<Button 
							onClick={this.handleClose}
							className= {this.props.classes.buttons}>
							Cancelar
						</Button>
						<Button
							onClick={() => {
								this.props.onSubmit({
									user: JSON.parse(localStorage.getItem("user"))._id,
									name: this.state.name,
									type: this.state.type,
									amount: this.state.amount
								});
								this.handleClose();
							}}
							className= {this.props.classes.buttons}
						>
							Agregar
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(AddAccount);
