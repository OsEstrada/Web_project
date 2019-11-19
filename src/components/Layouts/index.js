import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Footer from '../Layouts/footer';
import NavBar from '../Layouts/navbar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Menu from '../Layouts/Menu';
import ViewAcounts from '../Layouts/viewAcounts';
import Transaction from '../Layouts/Transaction';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		backgroundColor: '#2a2a72',
		backgroundImage: 'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)',
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		height: '10vh'
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
		backgroundColor: '#2a2a72',
		backgroundImage: 'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)',
		marginTop: '10vh',
		color: 'white',
		height: '90vh',
		width: drawerWidth,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3)
	},
	bodycontainer: {
		marginTop: '10vh',
		minHeight: '80vh',
		overflowY: 'auto'
	},
	logocontainer: {
		backgroundColor: '#2a2a72',
		backgroundImage: 'linear-gradient(315deg, #2a2a72 0%, #009ffd 0%)',
		position: 'fixed',
		width: drawerWidth,
		minHeight: '10vh'
	},
	logo: {
		Top: '0',
		marginLeft: '80px',
		width: '80px'
	},
	avatar: {
		marginTop: '15px',
		width: 60,
		height: 60,
	},
	barcontainer: {
		paddingRight: theme.spacing(6),
	}
}));

export default (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Grid container justify="flex-end" alignItems="center" className={classes.barcontainer}>
					<Avatar alt="user" src="user-512.jpg" className={classes.avatar} />
					<Menu/>
				</Grid>
			</AppBar>
			<div className={classes.logocontainer}>
				<img src="logoA.png" alt="logo" className={classes.logo} />
			</div>

			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.nav_item
				}}
				anchor="left"
			>
				<NavBar />
			</Drawer>
			<main className={classes.content}>
				<div className={classes.bodycontainer}>
					<Transaction />
				</div>
				<Footer />
			</main>
		</div>
	);
};
