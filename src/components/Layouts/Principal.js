import React from 'react';
import Footer from './footer';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewAcounts from './viewAcounts';
import Transaction from './Transaction';
import { useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Chat from './Chat';
import Image from '../../utils/images/piggy.jpg';
import { withStyles, withTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
	Button,	Tab, Tabs, Box,	Avatar,
	Grid, AppBar, CssBaseline, Drawer,
    Hidden, IconButton, Toolbar}
 from '@material-ui/core';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex',
		height: '100vh',
		backgroundImage: `url(${Image})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		},
		backgroundColor: 'rgba(70, 52, 70, 0.3)'
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center'
	},
	avatar: {
		marginTop: '10px',
		width: 50,
		height: 50
	},
	icon: {
		fontSize: '2.3em',
		color: 'white',
		marginTop: '10px'
	},
	nav_item: {
		backgroundColor: 'rgba(70, 52, 70, 0.3)',
		color: 'white',
		height: '100vh',
		width: drawerWidth,
		flexDirection: 'column',
		justifyContent: 'center'
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
	barcontainer: {
		paddingRight: theme.spacing(6)
	},
	widget: {
		position: 'relative'
	},
	tab_list: {
		marginTop: '30%',
		marginBottom: '30%',
		alignSelf: 'center',
		width: '100%'
	}
});

class Principal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
	}

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};

	a11yProps = (index) => {
		return {
			id: `vertical-tab-${index}`,
			'aria-controls': `vertical-tabpanel-${index}`
		};
	};

	TabPanel = (props) => {
		const { children, value, index } = props;

		return (
			<div hidden={value !== index}>
				<Box>{children}</Box>
			</div>
		);
	};

	render() {
		const { classes, theme} = this.props;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={this.handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
							<div className={classes.logocontainer}>
								<img src="GW.png" alt="logo" className={classes.logo} />
							</div>
						</IconButton>

						<Grid container justify="flex-end" alignItems="center" className={classes.barcontainer}>
							<Avatar alt="user" src="user-512.jpg" className={classes.avatar} />
							<Link to="./SignIn">
								<Button>
									<ExitToAppIcon className={classes.icon} />
								</Button>
							</Link>
						</Grid>
					</Toolbar>
				</AppBar>

				<nav className={classes.drawer} aria-label="mailbox folders">
					<Hidden smUp implementation="css">
						<Drawer
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={this.state.mobileOpen}
							onClose={this.handleDrawerToggle}
							className={classes.drawer}
							classes={{
								paper: classes.nav_item
							}}
							ModalProps={{
								keepMounted: true // Better open performance on mobile.
							}}
						>
							<div className={classes.tab_list}>
								<Tabs
									orientation="vertical"
									variant="fullWidth"
									value={this.state.value}
									onChange={this.handleChange}
									aria-label="Vertical tabs example"
								>
									<Tab label="Cuentas" {...this.a11yProps(0)} style={{ fontSize: '1em' }} />
									<Tab label="Transacciones" {...this.a11yProps(1)} style={{ fontSize: '1em' }} />
									<Tab label="Categorias" {...this.a11yProps(2)} style={{ fontSize: '1em' }} />
								</Tabs>
							</div>
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper
							}}
							variant="permanent"
							open
						>
							<div className={classes.tab_list}>
								<Tabs
									orientation="vertical"
									variant="fullWidth"
									value={this.state.value}
									onChange={this.handleChange}
									aria-label="Vertical tabs example"
								>
									<Tab label="Cuentas" {...this.a11yProps(0)} style={{ fontSize: '1em' }} />
									<Tab label="Transacciones" {...this.a11yProps(1)} style={{ fontSize: '1em' }} />
									<Tab label="Categorias" {...this.a11yProps(2)} style={{ fontSize: '1em' }} />
								</Tabs>
							</div>
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div style={{ width: '100%' }} height={100}>
						<Box display="flex" alignItems="center" p={1} m={1}>
							<div className={classes.bodycontainer}>
								<this.TabPanel value={this.state.value} index={0}>
									<ViewAcounts />
								</this.TabPanel>
								<this.TabPanel value={this.state.value} index={1}>
									Aqui van las transacciones
								</this.TabPanel>
								<this.TabPanel value={this.state.value} index={2}>
									Aqui iran las categorias
								</this.TabPanel>
							</div>

							<div className={classes.widget}>
								<Chat />
							</div>
							<Footer />
						</Box>
					</div>
				</main>
				<div />
			</div>
		);
	}
}

Principal.propTypes = {
	container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element)
};

export default withStyles(styles) (withTheme(Principal));
