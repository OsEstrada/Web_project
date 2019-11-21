import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CardAccount extends React.Component {
	render() {
		let user = this.props.user;
		return (
			<Card style={{ minWidth: '400px', backgroundColor: '#fff9f2', margin: '1%'}}>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{user.firstname} {user.lastname}
						</Typography>
						<Typography variant="body1" color="textSecondary" component="p">
							{user.email}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions style={{backgroundColor: 'white', borderTopColor:'#c4c4c4',borderTopStyle: 'solid', borderTopWidth:'0.5px'}}>
					<Button
						size="small"
						color="primary"
						onClick={() => {
							this.props.onDelete();
						}}
					> Eliminar
					</Button>
					<Button
						size="small"
						color="primary"
						onClick={() => {
							//hay que programar algo
						}}
					> Ver Cuentas
					</Button>
				</CardActions>
			</Card>
		);
	}
}

export default CardAccount;
