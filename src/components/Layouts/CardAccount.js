import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class CardAccount extends React.Component {
	render() {
		let account = this.props.account;
		return (
			<Card style={{ minWidth: '350px', backgroundColor: 'inherit ', margin: '1%'}}>
				<CardActionArea>
					<CardContent>
						<h2 style={{ color: '#faed26', fontSize: '30px', margin:'5px'}}>
							{account.name}
						</h2>
						<Divider style={{marginBottom:'10px'}}/>
						<Typography variant="h6" component="p" >
							Tipo de cuenta: {account.type}
						</Typography>
						<Typography variant="h6" component="p">
							Monto: ${account.amount}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						size="small"
						color="secondary"
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
