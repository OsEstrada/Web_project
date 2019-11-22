import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Footer from '../Layouts/footer';
import NavBar from '../Layouts/navbar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewAcounts from '../Layouts/viewAcounts';
import Button from '@material-ui/core/Button';
import Transaction from '../Layouts/Transaction';
import Chat from '../Layouts/Chat';
import Image from '../../utils/images/piggy.jpg';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex',
		backgroundImage: `url(${Image})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		backgroundAttachment: 'fixed',
		height: '100vh'
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		height: '8vh',
		backgroundColor: 'rgba(70, 52, 70, 0.3)'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	toolbar: theme.mixins.toolbar,
	nav_item: {
		backgroundColor: 'rgba(70, 52, 70, 0.3)',
		color: 'white',
		height: '100vh',
		width: drawerWidth,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	content: {
		flexGrow: 1
	},
	bodycontainer: {
		marginTop: '10vh',
		minHeight: '80vh',
		overflowY: 'auto'
	},
	logocontainer: {
		position: 'fixed',
		width: drawerWidth,
		minHeight: '10vh'
	},
	logo: {
		marginLeft: '35px',
		width: '70%'
	},
	avatar: {
		marginTop: '10px',
		width: 50,
		height: 50
	},
	barcontainer: {
		paddingRight: theme.spacing(6)
	},
	icon: {
		fontSize: '2.3em',
		color: 'white',
		marginTop: '10px'
	},
	widget: {
		position: 'relative'
	}
});

class Main extends React.Component {
	render() {
		return (
			<div className={this.props.classes.root}>
				<CssBaseline />
				<AppBar position="fixed" className={this.props.classes.appBar}>
					<Grid container justify="flex-end" alignItems="center" className={this.props.classes.barcontainer}>
						<Avatar alt="user" src="user-512.jpg" className={this.props.classes.avatar} />
						<Button>
							<ExitToAppIcon className={this.props.classes.icon} />
						</Button>
					</Grid>
				</AppBar>
				<div className={this.props.classes.logocontainer}>
					<img src="GW.png" alt="logo" className={this.props.classes.logo} />
				</div>

				<Drawer
					className={this.props.classes.drawer}
					variant="permanent"
					classes={{
						paper: this.props.classes.nav_item
					}}
					anchor="left"
				>
					<NavBar />
				</Drawer>
				<main className={this.props.classes.content}>
					<div className={this.props.classes.bodycontainer}>
						<ViewAcounts />
					</div>
					<div className={this.props.classes.widget}>
						<Chat />
					</div>
					<Footer />
				</main>
			</div>
		);
	}
}

export default withStyles(styles)(Main);
