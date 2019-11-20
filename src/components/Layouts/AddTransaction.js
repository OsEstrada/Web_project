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
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';

class AddTransaction extends React.Component {
	constructor(props) {
		super(props);

		this.options = [ 'Abono', 'Egreso' ];

		this.state = {
			date: '',
			account: '',
			type: this.options[0],
			amount: '',
			category: '',
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
					<DialogTitle id="form-dialog-title">Agregar Transaccion</DialogTitle>
					<DialogContent>
						<TextField
							name="date"
							label="Transaction date"
							type="date"
							defaultValue={new Date()}
							InputLabelProps={{
								shrink: true
							}}
							fullWidth
						/>
						<TextField
							autoFocus
							margin="dense"
							name="account"
							label="Nombre cuenta"
							type="text"
							onChange={this.handleChange}
							fullWidth
						/>
						<FormControl style={{ marginTop: '5%' }} fullWidth>
							<InputLabel>Tipo de transaccion</InputLabel>
							<Select value={this.state.type} onChange={this.handleChange} name="type">
								{this.options.map((a) => (
									<MenuItem key={a} value={a}>
										{a}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl style={{ marginTop: '5%' }} fullWidth>
							<InputLabel> Amount</InputLabel>
							<OutlinedInput
								name="amount"
								value={this.state.amount}
								onChange={this.handleChange}
								startAdornment={<InputAdornment position="start">$</InputAdornment>}
							/>
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancelar
						</Button>
						<Button
							onClick={() => {
								this.props.onSubmit({
									date: this.state.date,
									account: this.state.account,
									type: this.state.type,
									amount: this.state.amount,
									category: this.state.category
								});
								this.handleClose();
							}}
							color="primary"
						>
							Agregar
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default AddTransaction;
