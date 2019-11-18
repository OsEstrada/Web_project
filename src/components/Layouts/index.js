import React, { Fragment } from 'react';
import {Grid, Drawer} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../Layouts/footer';
import NavBar from '../Layouts/navbar';
import ViewAcounts from '../Layouts/viewAcounts'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    container: {
        height:'100vh'
    },
    nav_item: {
      backgroundColor:'#5e2288',
      color: 'white',
      height: '100vh',
      width: drawerWidth,
      flexDirection:'column',
      justifyContent:'center'
    },
    main_container:{
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    body_container:{
        minHeight:'89vh' ,
        overflowY:'auto'
    }
  }));

export default props =>{
    const styles = useStyles();
    return(
        <Fragment>
            <Drawer 
                    variant="permanent"
                    classes={{
                        paper: styles.nav_item
                    }}
                    anchor="left">
                <NavBar/>
            </Drawer>
            <div className={styles.main_container}>
            <Grid container className={styles.body_container}>
                <ViewAcounts/>
            </Grid>
            <Footer/>
            </div>
        </Fragment>
    )
}
            