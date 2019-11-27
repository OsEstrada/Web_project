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
import {withStyles} from '@material-ui/core';

const styles = theme => ({
    styledHeader: {
        '& h2': {
          color: '#5a5560',
        }
	},
	buttons: {
		color: '#5a5560'
	},
	fab: {
		width: 60,
		height: 60,
		[theme.breakpoints.only('xs')]: {
			width: 40,
			height: 40,
			margin: 10
		}
	},
	icon: {
		width: 30,
		height: 30,
		[theme.breakpoints.only('xs')]: {
			width: 20,
            height: 20,
		}
	}
	
})

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
				<Box display="flex" paddingRight="2%" paddingTop="1%" justifyContent="flex-end">
					<Fab
						color="inherit"
						aria-label="add"
						className={this.props.classes.fab}
						onClick={this.handleClickOpen}
					>
						<AddIcon className={this.props.classes.icon} />
					</Fab>
				</Box>
				<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Agregar Transaccion</DialogTitle>
					<DialogContent>
						<TextField
							name="date"
							label="Transaction date"
							type="date"
							defaultValue={this.state.date}
							onChange={this.handleChange}
							InputLabelProps={{
								shrink: true
							}}
							fullWidth
						/>
						<FormControl style={{ marginTop: '5%' }} fullWidth>
							<InputLabel>Seleccione el nombre de la cuenta</InputLabel>
							<Select value={this.state.account} onChange={this.handleChange} name="account">
								{this.props.account_list.map((a) => (
									<MenuItem key={a._id} value={a._id}>
										{a.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl style={{ marginTop: '5%' }} fullWidth>
							<InputLabel>Tipo de transaccion</InputLabel>
							<Select value={this.state.type} onChange={this.handleChange} name="type">
								{this.options.map((a,index) => (
									<MenuItem key={index} value={a}>
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
								console.log(this.state.date)
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

export default withStyles(styles)(AddTransaction);
