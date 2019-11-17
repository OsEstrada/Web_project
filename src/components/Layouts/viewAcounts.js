import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Typography } from "@material-ui/core";
import API from '../../utils/apiUrlBase';


const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

function CustomizedExpansionPanels({accounts}) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  let counter = 0;

  return (
    <div>
      {accounts.map((account)=>
         <ExpansionPanel square expanded ={expanded ===`panel ${counter}`} onChange={handleChange(`panel${counter}`)} >
          <ExpansionPanelSummary aria-controls={`panel${counter}d-content`}  id={`panel${counter}d-header`}>
            <Typography>{account.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          </Typography>
        </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </div>
  )
}

export default class Views extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      account_list: []
    };
  }

  componentDidMount() {
    let options = {
      headers: {
        Accept: "application/json"
      }
    };
    fetch(`${API.baseURL}/accounts`, options)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        data.map((element)=>
          this.state.account_list.push(element)
        )
      })
      .then(console.log(this.state.account_list))
      .catch(err => console.log("Ocurrio un error en la conexion"));
      
  }
  render() {
    return <CustomizedExpansionPanels accounts ={this.state.account_list}/>;
  }
}
