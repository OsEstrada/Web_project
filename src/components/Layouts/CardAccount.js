import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
	card: {
		backgroundColor: 'rgba(255,250,250,0.2)',
		[theme.breakpoints.up('xs')]: {
			minWidth: '350px',
			margin: '1%'
		},
		[theme.breakpoints.only('xs')]: {
			maxWidth: '180px',
			minWidth: '170px'
		}
	},
	title: {
		color: '#6b0303',
		[theme.breakpoints.up('xs')]: {
			fontSize: '30px',
			margin: '5px'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '20px'
		}
	},
	content: {
		[theme.breakpoints.up('xs')]: {
			fontSize: '20px',
			margin: '3px'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '15px'
		}
	}
});

class CardAccount extends React.Component {
	render() {
		let account = this.props.account;
		return (
			<Card className={this.props.classes.card}>
				<CardActionArea>
					<CardContent>
						<h2 className={this.props.classes.title}>{account.name}</h2>
						<Divider style={{ marginBottom: '10px' }} />
						<Typography className={this.props.classes.content}>
							Tipo de cuenta: <b>{account.type}</b>
						</Typography>
						<Typography className={this.props.classes.content}>
						Monto: $ <b>{account.amount} </b></Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						size="small"
						color="secondary"
						onClick={() => {
							this.props.onDelete();
						}}
					>
						{' '}
						Eliminar
					</Button>
				</CardActions>
			</Card>
		);
	}
}

export default withStyles(styles)(CardAccount);
