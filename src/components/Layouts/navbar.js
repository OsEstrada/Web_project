import React from 'react';
import {Tabs, Tab} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    tab_list: {
        marginTop:'30%',
        marginBottom:'30%',
        alignSelf:'center',
        width:'100%'
    }
  }));

function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`
    };
  }
  
  export default function VerticalTabs() {
    const styles = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={styles.tab_list}>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <Tab label="Cuentas" {...a11yProps(0)}  style={{fontSize:'1em'}} />
          <Tab label="Transacciones" {...a11yProps(1)} style={{fontSize:'1em'}} />
          <Tab label="Categorias" {...a11yProps(2)} style={{fontSize:'1em'}} />
     
        </Tabs>
      </div>
    );
  }