import React, { Fragment } from 'react';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Layouts/footer';
import NavBar from './Layouts/navbar';

const useStyles = makeStyles(theme => ({
    container: {
        height:'100vh',
        flexWrap:'nowrap'
    },
    nav_item: {
      backgroundColor:'#5e2288',
      color: 'white',
      height: '100vh',
      paddingTop:'8%',
      paddingBottom:'8%'
    },
    body_container:{
        height: '100vh',
        overflowY:'auto'
    }
  }));

export default props =>{
    const styles = useStyles();
    return(
        <Fragment>
                <Grid container className={styles.container}>
                    <Grid item className={styles.nav_item} xs={3}>
                        <NavBar/>
                    </Grid>
                    <Grid item  className={styles.body_container} xs={9}>
                        <Grid item xs={12} style={{backgroundColor:'#6951d4', height:'90%'}}>

                        </Grid>
                        <Grid item xs={12} style={{backgroundColor:'#450970', height:'10%',padding:'3%'}}>
                            <Footer/>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
    )
}
            