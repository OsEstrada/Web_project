import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NumberFormat from 'react-number-format';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class AddAccount extends React.Component {
	constructor(props) {
		super(props);

		this.options = [ 'Efectivo', 'Débito', 'Ahorro', 'Crédito', 'Corriente', 'De valor' ];

		this.state = {
			nameAccount: "",
			typeAccount: this.options[0],
			money: true,
			dueDate: '',
			open: false
		};
	}

	handleClickOpen = () => {
		this.setState({
			open: true
		});
	};

	handleClose = () => {
		this.setState({
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
				<Box display="flex" padding="3%" justifyContent="flex-end">
					<Fab
						color="primary"
						aria-label="add"
						style={{ width: '80', height: '80' }}
						onClick={this.handleClickOpen}
					>
						<AddIcon style={{ width: '30', height: '30' }} />
					</Fab>
				</Box>
				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Agregar Cuenta</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							name="nameAccount"
							label="Nombre cuenta"
							type="text"
							onChange={this.handleChange}
							fullWidth
						/>
						<FormControl style={{ marginTop: '5%' }}>
							<InputLabel>typeAccount</InputLabel>
							<Select
								value={this.state.typeAccount}
								onChange={this.handleChange}
								name="typeAccount"
								fullWidth
							>
								{this.options.map((a) => (
									<MenuItem key={a} value={a}>
										{a}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							id="date"
							label="Fecha de caducidad"
							type="date"
							name="dueDate"
							InputLabelProps={{
								shrink: true
							}}
							style={{ marginTop: '5%' }}
							fullWidth
						/>

						<InputLabel>
							Monto:
							<NumberFormat
								style={{ marginTop: '5%', marginLeft: '5%' }}
								thousandSeparator={true}
								prefix={'$'}
								onChange={this.handleChange}
							/>
						</InputLabel>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancelar
						</Button>
						<Button
							onClick={() => {
								this.props.onSubmit({
									nameAccount: this.state.nameAccount,
									typeAccount: this.state.typeAccount,
									dueDate: this.state.dueDate,
									money: this.state.money
								});
							}}
							color="primary"
						>
							Agregar
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	};
}

export default AddAccount;
