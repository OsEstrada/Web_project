import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CardAccount extends React.Component {
	render() {
		let account = this.props.account;
		return (
			<Card style={{ minWidth: '400px', backgroundColor: '#7cffcb', margin: '1%', backgroundImage:'linear-gradient(315deg, #7cffcb 0%, #74f2ce 74%)'}}>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{account.name}
						</Typography>
						<Typography variant="body1" color="textSecondary" component="p">
							Tipo de cuenta: {account.type}
						</Typography>
						<Typography variant="body1" color="textSecondary" component="p">
							Monto: ${account.amount}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						size="small"
						color="primary"
						onClick={() => {
							this.props.onDelete();
						}}
					> Eliminar
					</Button>
				</CardActions>
			</Card>
		);
	}
}

export default CardAccount;
