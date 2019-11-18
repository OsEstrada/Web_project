import React from 'react';
import API from '../../utils/apiUrlBase';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  fab: {
    height:80,
    width: 80,
  },
  icon: {
    width:30,
    height:30
  },
  hidden:{
    display: "none"
  }
}));

function Add() {
  const classes = useStyles();
  return (
    <Fab color="primary" aria-label="add" className={classes.fab}>
      <AddIcon className={classes.icon}/>
    </Fab>
  );
}

function MediaCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.accounts.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
            all continents except Antarctica
						</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
					</Button>
        <Button size="small" color="primary">
          Learn More
					</Button>
      </CardActions>
    </Card>
  );
}

export default class Views extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account_list: []
    };
  }

  componentDidMount() {
    let options = {
      headers: {
        Accept: 'application/json'
      }
    };
    fetch(`${API.baseURL}/accounts`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        data.map((element) => this.state.account_list.push(element));
      })
      .then(console.log(this.state.account_list))
      .catch((err) => console.log('Ocurrio un error en la conexion'));
  }

  render() {
    return (
      <div style={{ width: '100%'}}>
        {this.state.account_list.length === 0 ? (
          <Box display="flex" padding="3%" justifyContent="flex-end">
            <Add position= "absolute" alignSelf="flex-end"/>
          </Box>
        ) : (
          this.state.account_list.map((w, i) => {
              return <MediaCard nameAccount={this.state.account_list[i]} />
            })
          )}
      </div>

    );
  }
}
