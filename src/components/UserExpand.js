import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

/**
  Material UI Expansion Code
*/

const ExpansionPanel = withStyles({
  root: {
    marginTop: 10,
    boxShadow: "1px 5px 10px #888888",
    borderRadius: 10,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: 10,
    minHeight: 40,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "5px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiExpansionPanelDetails);

export default function UserExpand(props) {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  /**
    Render all the Player name which suits the emailId
  */
  function renderPlayerList(emailId) {
    if (props.playerList) {
      return Object.keys(props.playerList).map((key) => {
        if (JSON.parse(props.playerList[key])["highestBidder"] === emailId) {
          return (
            <ListItem>
              <ListItemIcon>
                <img
                  src={JSON.parse(props.playerList[key])["imgsrc"]}
                  alt="Player"
                  style={{ height: 30, width: 30, borderRadius: 50 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={JSON.parse(props.playerList[key])["player"]}
              />
            </ListItem>
          );
        } else {
          return <div></div>;
        }
      });
    }
  }

  function renderUser() {
    if (props.users) {
      return Object.keys(props.users).map((key) => {
        return (
          <ExpansionPanel
            square
            expanded={expanded === `${JSON.parse(props.users[key])["name"]}`}
            onChange={handleChange(`${JSON.parse(props.users[key])["name"]}`)}
          >
            <ExpansionPanelSummary
              aria-cont
              rols="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{JSON.parse(props.users[key])["name"]} </Typography>
              <AccountBalanceWalletIcon
                style={{ marginLeft: "20%", color: "green" }}
              />
              <Typography>{JSON.parse(props.users[key])["wallet"]} </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{renderPlayerList(key)}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      });
    }
  }

  return (
    <div style={{ marginTop: 10 }}>
      <Typography variant="body1">
        <b>Users</b>
      </Typography>
      {renderUser()}
    </div>
  );
}
