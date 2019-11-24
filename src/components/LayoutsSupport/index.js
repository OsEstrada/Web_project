import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import config from '../../utils/config';
import Input from '@material-ui/core/Input';
import { inherits } from 'util';

const drawerWidth = 240;
const agentUID = config.agentUID;

const styles = (theme) => ({
	root: {
		display: 'flex',
		height: '100vh',
		backgroundColor: '#CBDCEA'
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
		backgroundColor: 'rgb(70, 52, 70)'
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
		width: 40,
		height: 40
	},
	icon: {
		fontSize: '2.3em',
		color: 'white'
	}
});

class ResponsiveDrawer extends React.Component {
	constructor(props) {
		super(props);

		this.state = { mobileOpen: false, message: '' };
		this.handleChange = this.handleChange.bind(this);
	}

	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen });
	};

	handleClose = () => {
		this.setState({ message: '' });
	};

	handleChange(event) {
		this.setState({ message: event.target.value });
	}

	render() {
		const { classes, theme } = this.props;

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
						</IconButton>
						<Typography variant="h6" noWrap>
							Messages
						</Typography>

						<Grid container justify="flex-end" alignItems="center" className={classes.barcontainer}>
							<Avatar alt="user" src="user-512.jpg" className={classes.avatar} />
							<Button>
								<ExitToAppIcon className={classes.icon} />
							</Button>
						</Grid>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label="mailbox folders">
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation="css">
						<Drawer
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={this.state.mobileOpen}
							onClose={this.handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper
							}}
							ModalProps={{
								keepMounted: true // Better open performance on mobile.
							}}
						>
							<CustomerList {...this.props} selectCustomer={this.props.selectCustomer} />
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
							<CustomerList {...this.props} selectCustomer={this.props.selectCustomer} />
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div style={{ width: '100%' }} height={100}>
						<Box display="flex" alignItems="center" p={1} m={1} height="80%">
							<Box bgcolor="white" flexGrow={1} height="100%" borderRadius="20px">
								<ChatBox {...this.props} />
							</Box>
						</Box>
						<Box display="flex" alignItems="center" p={1} m={2} bgcolor="white" borderRadius="20px">
							<Box flexGrow={1}>
								<Input
									placeholder="Escribe tu mensaje"
									className={classes.input}
									inputProps={{
										'aria-label': 'description'
									}}
									value={this.state.message}
									onChange={this.handleChange}
									fullWidth
								/>
							</Box>
							<Box p={1}>
								<Fab
									color="secondary"
									style={{ width: '10', height: '10' }}
									onClick={() => {
										this.props.onSubmit(this.state.message);
										this.handleClose();
									}}
								>
									<SendRoundedIcon />
								</Fab>
							</Box>
						</Box>
					</div>
				</main>
				<div />
			</div>
		);
	}
}

ResponsiveDrawer.propTypes = {
	container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element)
};

class ChatBox extends React.Component {
	render() {
		const { chat, chatIsLoading } = this.props;
		if (chatIsLoading) {
			return (<div className='container col-xl-12'>>
				<CircularProgress color="secondary" />;
			</div>);
		} else {
			return (
				<div className='container col-xl-12'>>
					{chat.map((chat) => (
						<div key={chat.id} className="message">
							<div className={`${chat.receiver !== agentUID ? 'balon1' : 'balon2'} p-3 mt-1 mb-1`}>
								{chat.text}
							</div>
						</div>
					))}
				</div>
			);
		}
	}
}

class CustomerList extends React.Component {
	render() {
		const { customers, customerIsLoading, selectedCustomer } = this.props;
		if (customerIsLoading) {
			return (
				<div className="col-xl-12 my-auto text-center">
					<CircularProgress color="secondary" />
				</div>
			);
		} else {
			return (
				<ul className="list-group list-group-flush w-100">
					{customers.map((customer) => (
						<li
							key={customer.uid}
							className={`list-group-item ${customer.uid === selectedCustomer ? 'active' : ''}`}
							onClick={() => this.props.selectCustomer(customer.uid)}
						>
							{customer.name}
						</li>
					))}
				</ul>
			);
		}
	}
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
