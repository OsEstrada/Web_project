import React from 'react';
import Footer from '../Layouts/footer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewAcounts from '../Layouts/viewAcounts';
import Transaction from '../Layouts/Transaction';
import Chat from '../Layouts/Chat';
import Image from '../../utils/images/piggy.jpg';
import {Button, Tab, Tabs, Box, Avatar, Grid, AppBar, CssBaseline, Drawer, withStyles} from '@material-ui/core'

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
	},
	tab_list: {
		marginTop: '30%',
		marginBottom: '30%',
		alignSelf: 'center',
		width: '100%'
	}
});

class Main extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			value: 0
		}
	}

	handleChange = (event, newValue) => {
		this.setState({value:newValue});
	};

	a11yProps=(index)=>{
		return {
			id: `vertical-tab-${index}`,
			'aria-controls': `vertical-tabpanel-${index}`
		};
	}

	TabPanel=(props)=> {
		const { children, value, index} = props;
	  
		return (
		  <div
			hidden={value !== index}
		  >
			<Box>{children}</Box>
		  </div>
		);
	  }

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
					<div className={this.props.classes.tab_list}>
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
				<main className={this.props.classes.content}>
					<div className={this.props.classes.bodycontainer}>
						<this.TabPanel value={this.state.value} index={0}>
							<ViewAcounts/>
						</this.TabPanel>
						<this.TabPanel value={this.state.value} index={1}>
							Aqui van las transacciones
						</this.TabPanel>
						<this.TabPanel value={this.state.value} index={2}>
							Aqui iran las categorias
						</this.TabPanel>
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
